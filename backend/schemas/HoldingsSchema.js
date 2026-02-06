const mongoose = require('mongoose');
const { Schema } = mongoose; // Import Schema

const HoldingSchema = new Schema({
    name: String,
    qty: Number,
    avg: Number,
    price: Number,
    net: String,
    day: String,
    user: { type: Schema.Types.ObjectId, ref: "User" } // <--- ADD THIS
});

module.exports = { HoldingSchema };