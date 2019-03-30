const Artist = require('../models/artist.model');
const spotifyApi = require('../services/spotify.service');

const createError = require('http-errors');

module.exports.list = (req, res, next) => {
  // Artist.find()
  //   .then(artists => res.json(artists))
  //   .catch(next);
}

module.exports.get = (req, res, next) => {
  Artist.findOne({name: req.params.name})
    .then(async artist => {
      console.info('ARTIST => ', artist)
      if (!artist) {
        throw createError(404, 'Artist not found');
      }
      // if (!artist.related && !artist.songs) {
      try {
        const { body } = await spotifyApi.searchArtists(artist.name, 'GB')
        const { id } = 
          body.artists.items.find(
            item => item.name.toLowerCase() === artist.name.toLowerCase() && item.genres.includes('hip hop'))
        console.info('UNIQUE => ', id)
        const related = await spotifyApi.getArtistRelatedArtists(id)
        console.info('RELATED => ', related)
      } catch(error) {
        console.info('CATCH ERROR => ', error)
      }
      // Promise.all([
      //   spotifyApi.getArtistTopTracks(artist.name, 'GB'),
      //   spotifyApi.getArtistRelatedArtists(artist.name)
      // ]).then(([
      //   topTracks,
      //   relatedArtists
      //   ]) => {
      //     console.log('topTracks =>' + topTracks, 'relatedArtist' + relatedArtists)

      //   })
        // .catch(next)


        // spotifyApi.searchArtists(artist.name)
        // .then((data) => {
        //   console.log(data.body.artists.items[0])
        //   // Artist.findByIdAndUpdate(artist.id, 
        //   //   { related: data.related,
        //   //     songs: data.songs
        //   //    }, {new: true}
        //   // ).then(res.status(200).json(artist))
        // })
      }
    )
    .catch(next);
}