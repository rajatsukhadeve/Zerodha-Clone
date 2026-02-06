const mongoose = require('mongoose');
const { Schema } = mongoose;

const PositionsSchema = new Schema({
    product: String,
    name: String,
    qty: Number,
    avg: Number,
    price: Number,
    net: String,
    day: String,
    isLoss: Boolean,
    user: { type: Schema.Types.ObjectId, ref: "User" } // <--- ADD THIS
});

module.exports = { PositionsSchema };