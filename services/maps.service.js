const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_MAPS_KEY,
  Promise: Promise
});

module.exports.getCityCoordinates = (city) => {
  return googleMapsClient.geocode({ address: city })
    .asPromise()
    .then((response) => {
      if (response.json.results.length > 0) {
        return response.json.results[0].geometry.location;
      } else {
        return {}
      }
    })
}