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
  
module.exports = spotifyApi;  