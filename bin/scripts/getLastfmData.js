require('dotenv').config()
require('../../configs/db.configs');

const Artist = require('../../models/artist.model');
const axios = require('axios')
const rp = require('request-promise');
const $ = require('cheerio');

const APIKEY_LASTFM = process.env.APIKEY_LASTFM

const BASE_URL_LASTFM = 'http://ws.audioscrobbler.com/2.0/'
const BASE_URL_WIKI  = 'https://es.wikipedia.org/wiki/';


const createArtist = (artistData) => {
  const artist = new Artist({
    name: artistData.name
  })

  let url = "https://en.wikipedia.org/w/index.php?search=" + escape(artistData.name)
  console.log( url )
  rp( url )
  .then(html =>{
    //success!
    const trs = $('.infobox tr', html)
    console.log(trs.length);
    console.log(trs);
  })
  .catch(error => console.log(error))

  return artist.save()
}

const getRapArtist = (page = 1) => {
  axios.get(`${BASE_URL_LASTFM}`, {
    params: {
      method: 'tag.gettopartists',
      tag: 'hiphop',
      api_key: APIKEY_LASTFM,
      format: 'json',
      page
    }
  })
  .then(response => {
    const artistArray = response.data.topartists.artist.map(elem => {
      return parseResponse(elem);
    })
    
    Promise.all(artistArray.map((artist) => createArtist(artist)))
      .then(artists => {
        console.log(`done page ${page}`)
      })
      .catch(console.log)
  })
  .catch(error => console.log(error))
}

const parseResponse = artist => {
  const artistObj = {
    name: artist.name,
    url: artist.url,
    image: [...artist.image]
  };
  return artistObj;
}

getRapArtist(1)

// for(let i = 1; i < 3; i++) {
//   getRapArtist(i)
// }
