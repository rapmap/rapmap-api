const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bio: String,
  imageURL: [String],
  lastFmurl: String,
  genre: String
}, { timestamps: true, });

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;