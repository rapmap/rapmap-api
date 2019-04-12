require('dotenv').config();
const rappersList = require('../../data/rapers.json');
require('../../configs/db.configs');
const Artist = require('../../models/artist.model');
const mapsService = require('../../services/maps.service');
const mongoose = require('mongoose');
const cities = {};


const findCoordinates = (city) => {
  if (city instanceof Array || !city) {
    return Promise.resolve(undefined);
  } else if (cities[city]) {
    return Promise.resolve(cities[city]);
  } else {
    return mapsService.getCityCoordinates(city)
      .then(({lat, lng }) => {
        if (lat && lng) {
          cities[city] = [lng, lat]
          return cities[city];
        } else {
          return undefined;
        }
      });
  }
} 
 
const rapersSaves = rappersList.map(rapper => {
  return Artist.findOne({ name: rapper.name })
    .then(artist => {
      if (!artist) {
        const city = rapper.birthPlace || rapper.bornPlace || rapper.originPlace;
        // if (rapper.birthPlace)  ciudad = rapper.birthPlace;
        // if (rapper.originPlace) ciudad = rapper.originPlace;
        // if (rapper.bornPlace)   ciudad = rapper.bornPlace;

        return findCoordinates(city)
          .then(coordinates => {

            const artist = new Artist({
              name: rapper.artist,
              artistWikiHref: rapper.name,
              bio: rapper.bio,
              imageURL: rapper.imageUrl, //revisar siempre en el rapper.json el campo imageUrl
              genre: rapper.genres
            })
            if (coordinates) {
              artist.location = {
                type: 'Point',
                coordinates: coordinates
              }
              return artist.save()
            } else {
              return Promise.resolve();
            }
          })
        
      }
    })
    .catch(error => console.error(error));
})

Promise.all(rapersSaves)
  .then((actions) =>  {
    console.info(`${actions.length} rapers added`);
    mongoose.connection.close()
  });
