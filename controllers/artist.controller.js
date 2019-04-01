const Artist = require('../models/artist.model');
const spotifyService = require('../services/spotify.service');

const createError = require('http-errors');

// module.exports.list = (req, res, next) => {

// }

module.exports.get = (req, res, next) => {
  Artist.findOne({name: req.params.name})
    .then(artist => {
      console.info('ARTIST => ', artist)
      if (!artist) {
        throw createError(404, 'Artist not found');
      }
      return spotifyService.getArtistRelatedInfo(artist)
        .then(([traks, related]) => {
          /**
           * Este map debería ir aquí?, si es así, no merece la pena traer 'related' de getArtistRelatedInfo
           */
          const relatedList = artist.related.map(relatedArtist => relatedArtist.name)
          console.info('COSAS => ', relatedList)
          return Artist.findOneAndUpdate(
            { name: artist.name }, 
            { $set: { 
              related: relatedList, 
              songs: {
                name: traks.name,
                imageURL: traks.url,
                songURL: traks.href
                } 
              }
            },
            { new: true }
          ).then(artist => res.status(200).json(artist))
        })
  }).catch(next);
}