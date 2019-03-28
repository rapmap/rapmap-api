const rappersList = require('../../data/rapers.json');

require('../../configs/db.configs');

const Artist = require('../../models/artist.model');

rappersList.map(rapper => {
  Artist.where({ name: rapper.name }).findOne( (err,res) => {
    if (!err && !res) {
      let ciudad = rapper.birthPlace || rapper.bornPlace || rapper.originPlace || 'n/a';
      // if (rapper.birthPlace)  ciudad = rapper.birthPlace;
      // if (rapper.originPlace) ciudad = rapper.originPlace;
      // if (rapper.bornPlace)   ciudad = rapper.bornPlace;
      const artist = new Artist({
        name: rapper.name,
        artistWikiHref: rapper.name,
        location: ciudad,
        bio: rapper.bio,
        imageURL: rapper.imgURL,
        genre: rapper.genres
      })
      artist.save()
    }
  })
})
console.log('artists save DONE!!!')
