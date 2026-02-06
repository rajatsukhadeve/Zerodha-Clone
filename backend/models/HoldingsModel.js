const mongoose = require('mongoose');
const {HoldingSchema} = require('../schemas/HoldingsSchema');

const HoldingsModel =  mongoose.model('holding' ,HoldingSchema);

module.exports ={HoldingsModel};