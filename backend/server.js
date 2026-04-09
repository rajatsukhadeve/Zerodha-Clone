require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const YahooFinance = require("yahoo-finance2").default;

const yahooFinance = new YahooFinance();

const { HoldingsModel } = require('./models/HoldingsModel');
const { PositionsModel } = require('./models/PositionsModel');
const { OrdersModel } = require('./models/OrdersModel');
const { WatchlistModel } = require('./models/WatchListModel');
const User = require("./models/UserModel");

const { holdings, positions, watchlist } = require('./Data/data');

const PORT = process.env.PORT || 8080;
const app = express();
const URL = process.env.MONGO_URL;

// 🔥 STOCK MAP
const stockMap = {
  HUL: "HINDUNILVR",
  SBIN: "SBIN",
  INFY: "INFY",
  RELIANCE: "RELIANCE",
  TCS: "TCS",
};

// --- CONFIG ---
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect(URL)
    .then(() => console.log("Connected to DB"))
    .catch(err => console.log(err));

// --- AUTH ---
const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "You must be logged in" });
    }
    next();
};

// --- SIGNUP ---
app.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const user = new User({ 
            email, 
            username,
            balance: 10000 
        });

        const registeredUser = await User.register(user, password);

        req.login(registeredUser, (err) => {
            if (err) {
                return res.status(500).json({ error: "Login after signup failed" });
            }

            res.json({
                success: true,
                user: {
                    username: registeredUser.username,
                    email: registeredUser.email,
                    balance: registeredUser.balance
                }
            });
        });

    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});
// --- LOGIN ---
app.post("/login", passport.authenticate("local"), (req, res) => {
    res.json({ success: true });
});

// --- LOGOUT ---
app.get("/logout", (req, res) => {
    req.logout(() => res.send("Logged out"));
});

// --- HOLDINGS ---
app.get('/allHoldings', isLoggedIn, async (req, res) => {
    try {
        const holdings = await HoldingsModel.find({ user: req.user._id });

        const updated = await Promise.all(
            holdings.map(async (stock) => {
                const base = stockMap[stock.name.toUpperCase()] || stock.name.toUpperCase();
                const symbol = base + ".NS";

                try {
                    const quote = await yahooFinance.quote(symbol);

                    if (!quote || !quote.regularMarketPrice) return stock;

                    const current = quote.regularMarketPrice;
                    const prevClose = quote.regularMarketPreviousClose;

                    const net = (((current - stock.avg) / stock.avg) * 100).toFixed(2);
                    const day = (((current - prevClose) / prevClose) * 100).toFixed(2);

                    return {
                        ...stock._doc,
                        price: current,
                        net: net + "%",
                        day: day + "%"
                    };

                } catch {
                    return stock;
                }
            })
        );

        res.json(updated);

    } catch {
        res.status(500).send("Error fetching holdings");
    }
});

// --- POSITIONS ---
app.get('/allPositions', isLoggedIn, async (req, res) => {
    const data = await PositionsModel.find({ user: req.user._id });
    res.json(data);
});
// --- ADD TO WATCHLIST ---
app.post("/addToWatchlist", isLoggedIn, async (req, res) => {
    try {
        const { name } = req.body;

        const normalizedName = name.toUpperCase().trim();

        const exists = await WatchlistModel.findOne({
            name: normalizedName,
            user: req.user._id
        });

        if (exists) {
            return res.status(400).json({ error: "Already in watchlist" });
        }

        await WatchlistModel.create({
            name: normalizedName,
            user: req.user._id
        });

        res.json({ success: true });

    } catch (err) {
        res.status(500).json({ error: "Failed to add" });
    }
});
// --- WATCHLIST ---
app.get('/allwatchlist', isLoggedIn, async (req, res) => {
    try {
        const list = await WatchlistModel.find({ user: req.user._id });

        const updated = await Promise.all(
            list.map(async (stock) => {
                const base = stockMap[stock.name.toUpperCase()] || stock.name.toUpperCase();
                const symbol = base + ".NS";

                try {
                    const q = await yahooFinance.quote(symbol);

                    if (!q || !q.regularMarketPrice) return stock;

                    const change = q.regularMarketPrice - q.regularMarketPreviousClose;
                    const percent = ((change / q.regularMarketPreviousClose) * 100).toFixed(2);

                    return {
                        ...stock._doc,
                        price: q.regularMarketPrice,
                        percent: percent + "%",
                        isDown: change < 0
                    };

                } catch {
                    return stock;
                }
            })
        );

        res.json(updated);

    } catch {
        res.status(500).send("Error fetching watchlist");
    }
});

// --- ORDERS ---
app.get("/orders", isLoggedIn, async (req, res) => {
    const orders = await OrdersModel.find({ user: req.user._id });
    res.json(orders);
});

// --- SEARCH (FIXED) ---
app.get("/search/:stockName", async (req, res) => {
    try {
        const input = req.params.stockName.toUpperCase();
        const base = stockMap[input] || input;
        const symbol = base + ".NS";

        const today = new Date();
        const past = new Date();
        past.setMonth(today.getMonth() - 6);

        const result = await yahooFinance.chart(symbol, {
            interval: "1d",
            period1: past,
            period2: today
        });

        const q = result.meta;

        const history = result.quotes.map(i => ({
            date: i.date.toISOString().split("T")[0],
            price: i.close
        }));

        res.json({
            currentPrice: q.regularMarketPrice,
            todayOpen: q.chartPreviousClose,
            todayHigh: q.regularMarketDayHigh,
            todayLow: q.regularMarketDayLow,
            previousClose: q.previousClose,
            history
        });

    } catch {
        res.status(500).json({ error: "Stock not found" });
    }
});

app.post("/buy", isLoggedIn, async (req, res) => {
    try {
        const { name, qty, price } = req.body;

        if (!name || qty <= 0 || price <= 0) {
            return res.status(400).json({ error: "Invalid input" });
        }

        const user = await User.findById(req.user._id);

        const totalCost = price * qty;

        // ❌ Check balance FIRST
        if (user.balance < totalCost) {
            return res.status(400).json({ error: "Insufficient balance" });
        }

        // ✅ Deduct balance
        user.balance -= totalCost;
        await user.save();

        // ✅ Save order
        await OrdersModel.create({
            name,
            qty,
            price,
            total: totalCost,
            mode: "BUY",
            user: req.user._id
        });

        // ✅ Update holdings
        let holding = await HoldingsModel.findOne({ name, user: req.user._id });

        if (holding) {
            const totalInvestment = (holding.avg * holding.qty) + totalCost;
            const totalQty = holding.qty + qty;

            holding.avg = totalInvestment / totalQty;
            holding.qty = totalQty;
            holding.price = price;

            await holding.save();
        } else {
            await HoldingsModel.create({
                name,
                qty,
                avg: price,
                price,
                net: "0%",
                day: "0%",
                user: req.user._id
            });
        }

        res.json({ success: true, balance: user.balance });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Buy failed" });
    }
});

app.post("/sell", isLoggedIn, async (req, res) => {
    try {
        const { name, qty, price } = req.body;

        if (!name || qty <= 0 || price <= 0) {
            return res.status(400).json({ error: "Invalid input" });
        }

        const holding = await HoldingsModel.findOne({
            name,
            user: req.user._id
        });

        // ❌ Check stock availability
        if (!holding || holding.qty < qty) {
            return res.status(400).json({ error: "Not enough stock" });
        }

        const totalValue = price * qty;

        // ✅ Add balance
        const user = await User.findById(req.user._id);
        user.balance += totalValue;
        await user.save();

        // ✅ Save order
        await OrdersModel.create({
            name,
            qty,
            price,
            total: totalValue,
            mode: "SELL",
            user: req.user._id
        });

        // ✅ Update holding
        holding.qty -= qty;
        holding.price = price;

        if (holding.qty === 0) {
            await HoldingsModel.deleteOne({ _id: holding._id });
        } else {
            await holding.save();
        }

        res.json({ success: true, balance: user.balance });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Sell failed" });
    }
});

// --- GET BALANCE ---
app.get("/balance", isLoggedIn, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.json({ balance: user.balance });
    } catch {
        res.status(500).json({ error: "Failed to fetch balance" });
    }
});


// --- ADD FUNDS ---
app.post("/addFunds", isLoggedIn, async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({ error: "Invalid amount" });
        }

        const user = await User.findById(req.user._id);

        user.balance += amount;
        await user.save();

        res.json({
            success: true,
            balance: user.balance
        });

    } catch (err) {
        res.status(500).json({ error: "Failed to add funds" });
    }
});


// --- WITHDRAW FUNDS ---
app.post("/withdrawFunds", isLoggedIn, async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({ error: "Invalid amount" });
        }

        const user = await User.findById(req.user._id);

        if (user.balance < amount) {
            return res.status(400).json({ error: "Insufficient balance" });
        }

        user.balance -= amount;
        await user.save();

        res.json({
            success: true,
            balance: user.balance
        });

    } catch (err) {
        res.status(500).json({ error: "Failed to withdraw funds" });
    }
});

// --- SERVER ---
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});