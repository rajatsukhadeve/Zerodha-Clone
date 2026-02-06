const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrdersSchema = new Schema({
    name: String,
    qty: Number,
    price: Number,
    mode: String,
    user: { type: Schema.Types.ObjectId, ref: "User" } // <--- ADD THIS
});

module.exports = { OrdersSchema };