const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: String,
  artistWikiHref: String,
  location: String,
  bio: String,
  imageURL: String,
  genre: String,

}, { timestamps: true, });

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;