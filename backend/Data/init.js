require('dotenv').config({ path: '../.env' });

const mongoose = require('mongoose');
let { holdings,positions } = require('./data');
const {HoldingsModel} = require("../models/HoldingsModel");
const {PositionsModel} = require("../models/PositionsModel");


const MONGO_URI = process.env.MONGO_URL;
async function initDB() {

    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected");

       

        // Insert new data
        await PositionsModel.insertMany(positions);
        console.log("Holdings inserted successfully");

        process.exit(0);
    } catch (err) {
        console.error("Init failed:", err);
        process.exit(1);
    }
}


initDB();