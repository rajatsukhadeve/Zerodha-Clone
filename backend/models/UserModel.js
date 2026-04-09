
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        default: 10000 // starting demo money
    }
});

// This plugin adds username and password fields automatically
UserSchema.plugin(passportLocalMongoose.default || passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);