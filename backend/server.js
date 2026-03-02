require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const YahooFinance = require("yahoo-finance2").default;

const yahooFinance = new YahooFinance();

// Models
const { HoldingsModel } = require('./models/HoldingsModel');
const { PositionsModel } = require('./models/PositionsModel');
const { OrdersModel } = require('./models/OrdersModel');
const { WatchlistModel } = require('./models/WatchListModel');
const User = require("./models/UserModel");

// Default Data (Ensure you have this file in backend/Data/data.js)
const { holdings, positions, watchlist } = require('./Data/data');

const PORT = process.env.PORT || 8080;
const app = express();
const URL = process.env.MONGO_URL;

// --- CONFIGURATION ---
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionOptions = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect(URL)
    .then(() => console.log("Connected to DB"))
    .catch(err => console.log(err));

// --- AUTH MIDDLEWARE ---
const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "You must be logged in" });
    }
    next();
};

// --- ROUTES ---

// 1. Signup Route (Seeds data for new user)
// ... imports

app.post("/signup", async (req, res) => {
    try {
        console.log("1. Signup route hit!"); // <--- DEBUG LOG

        let { username, email, password } = req.body;
        let newUser = new User({ email, username });
        let registeredUser = await User.register(newUser, password);

        console.log("2. User created:", registeredUser._id); // <--- DEBUG LOG

        // --- SEED DEFAULT DATA ---
        const mappedHoldings = holdings.map(item => ({ ...item, user: registeredUser._id }));
        const mappedPositions = positions.map(item => ({ ...item, user: registeredUser._id }));
        const mappedWatchlist = watchlist.map(item => ({ ...item, user: registeredUser._id }));

        console.log("3. Seeding data..."); // <--- DEBUG LOG

        await HoldingsModel.insertMany(mappedHoldings);
        await PositionsModel.insertMany(mappedPositions);
        await WatchlistModel.insertMany(mappedWatchlist);

        console.log("4. Data seeded successfully!"); // <--- DEBUG LOG
        // -------------------------

        req.login(registeredUser, (err) => {
            if (err) { return next(err); }
            res.json({ success: true, message: "User registered and data initialized!" });
        });
    } catch (e) {
        if (e.name === "UserExistsError") {
            return res.status(400).json({
                success: false,
                message: "Username already exists. Please choose another."
            });
        }

        console.log("ERROR in Signup:", e);
        res.status(400).json({ success: false, message: e.message });
    }
});

// ... rest of code

app.post("/login", passport.authenticate("local"), (req, res) => {
    res.json({ success: true, message: "Logged in successfully" });
});

app.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.send("Logged out");
    });
});

// 2. Data Routes (Filtered by User)
app.get('/allHoldings', isLoggedIn, async (req, res) => {
    let allHoldings = await HoldingsModel.find({ user: req.user._id });
    res.json(allHoldings);
});

app.get('/allPositions', isLoggedIn, async (req, res) => {
    let allPositions = await PositionsModel.find({ user: req.user._id });
    res.json(allPositions);
});

app.get('/allwatchlist', isLoggedIn, async (req, res) => {
    let allWatchlist = await WatchlistModel.find({ user: req.user._id });
    res.json(allWatchlist);
});

app.post("/newOrder", isLoggedIn, async (req, res) => {
    const newOrder = new OrdersModel({
        ...req.body,
        user: req.user._id
    });
    await newOrder.save();
    res.send("Order saved");
});

// for stock search 

app.get("/search/:stockName", async (req, res) => {
    try {
        const stockName = req.params.stockName.toUpperCase();
        const symbol = stockName + ".NS"; // For NSE stocks

        // 📅 6 months ago date
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        // 🔹 Get historical daily data
        const historicalData = await yahooFinance.historical(symbol, {
            period1: sixMonthsAgo,
            period2: new Date(),
            interval: "1d"
        });

        // 🔹 Get current/latest price
        const quote = await yahooFinance.quote(symbol);

        // Format historical data
        const formattedHistory = historicalData
            .filter(item => item.close !== null)
            .map(item => ({
                date: item.date.toISOString().split("T")[0],
                price: item.close
            }));

        // Final response
        res.json({
            currentPrice: quote.regularMarketPrice,
            todayOpen: quote.regularMarketOpen,
            todayHigh: quote.regularMarketHigh,
            todayLow: quote.regularMarketLow,
            previousClose: quote.regularMarketPreviousClose,
            history: formattedHistory
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
});