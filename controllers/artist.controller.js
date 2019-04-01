const Artist = require('../models/artist.model');
const spotifyService = require('../services/spotify.service');

const createError = require('http-errors');

module.exports.list = (req, res, next) => {
  // Artist.find()
  //   .then(artists => res.json(artists))
  //   .catch(next);
}

module.exports.get = (req, res, next) => {
  Artist.findOne({name: req.params.name})
    .then(artist => {
      console.info('ARTIST => ', artist)
      if (!artist) {
        throw createError(404, 'Artist not found');
      }
      return spotifyService.getArtistReatedInfo(artist)
        .then(([traks, related]) => {
          return Artist.findOneAndUpdate(
            { name: artist.name }, 
            { $set: { related: related, songs: traks }},
            { new: true }
          ).then(artist => res.status(200).json(artist))
        })
  }).catch(next);
}