const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: String,
  artistWikiHref: String,
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number]
    }
  },
  city: String,
  bio: String,
  imageURL: String,
  genre: String,
  songs: 
    { name: String,
      imageURL: String,
      songURL: String,
     }
  ,
  related: [
    { name: String,
      imageURL: String,
    }
  ]
}, { timestamps: true, });

artistSchema.index({ 'location': '2dsphere' });


const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;