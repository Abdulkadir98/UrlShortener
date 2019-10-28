const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    date: {type: String, default: Date.now}
});

module.exports = new mongoose.model('Url', urlSchema);