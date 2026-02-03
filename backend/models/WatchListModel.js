const mongoose = require('mongoose');
const {watchlistSchema} = require('../schemas/WatchlistSchema');

const WatchlistModel = mongoose.model('watchlist', watchlistSchema);

module.exports={WatchlistModel};
