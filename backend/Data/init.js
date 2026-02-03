require('dotenv').config({ path: '../.env' });

const mongoose = require('mongoose');
let { holdings,positions,watchlist } = require('./data');
const {HoldingsModel} = require("../models/HoldingsModel");
const {PositionsModel} = require("../models/PositionsModel");
const {WatchlistModel} = require('../models/WatchListModel');



const MONGO_URI = process.env.MONGO_URL;
async function initDB() {

    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected");

       

        // Insert new data
        await WatchlistModel.insertMany(watchlist);
        console.log("Holdings inserted successfully");

        process.exit(0);
    } catch (err) {
        console.error("Init failed:", err);
        process.exit(1);
    }
}


initDB();