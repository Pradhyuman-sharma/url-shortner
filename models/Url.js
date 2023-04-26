const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  urlCode: String,
  longUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  createdOn: { type: Date, default: Date.now, expires: '30d' },
});

module.exports = mongoose.model('Url', urlSchema);
