const mongoose = require('mongoose');
const { Schema } = mongoose;

const watchlistSchema = new Schema({
    name: String,
    price: Number,
    percent: String,
    isDown: Boolean,
    user: { type: Schema.Types.ObjectId, ref: "User" } // <--- ADD THIS
});

module.exports = { watchlistSchema };