const SpotifyWebApi = require('spotify-web-api-node');
const APIKEY_SPOTIFY = process.env.APIKEY_SPOTIFY
const SECRET_SPOTIFY = process.env.SECRET_SPOTIFY

/* Spotify API Client config */

const spotifyApi = new SpotifyWebApi({
  clientId : APIKEY_SPOTIFY,
  clientSecret : SECRET_SPOTIFY
});
  
spotifyApi.clientCredentialsGrant()
  .then((data) => {
    spotifyApi.setAccessToken(data.body.access_token);
  }, (err) => {
    console.log('Something went wrong when retrieving an access token', err);
});

module.exports.getArtistRelatedInfo = (artist) => {
  return spotifyApi.searchArtists(artist.name)
    .then(res => {
      const { id } = res.body.artists.items.find(
        item => item.name.toLowerCase() === artist.name.toLowerCase() && item.genres.includes('hip hop'))
        return Promise.all([
          spotifyApi.getArtistTopTracks(id, 'GB'),
          spotifyApi.getArtistRelatedArtists(id)
        ])
    }).then(([traksRes, relatedRes]) => {
      // console.log('related',relatedRes.body)
      // const { name, href, images } = traksRes.body.tracks[0].album
      return Promise.resolve([
        traksRes.body.tracks,
        relatedRes.body.artists
      ])
    })
  
}
  
module.exports.api = spotifyApi;  