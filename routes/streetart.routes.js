
const express = require('express');
const router  = express.Router();
const Streetart = require('../models/Streetart.model');
const fileUploader = require('../configs/cloudinary.config');


router.get('/', (req, res, next) => {
  res.render('streetart/citymap');
});

router.get('/add', (req, res) => {
  res.render('streetart/add')
})


router.post('/add', fileUploader.single('streetArt-picture'), (req, res, next) => {
  const { name, artist, details, longitude, latitude } = req.body
  console.log(req.body)
  const streetArtImgUrl = req.file.path
  console.log(streetArtImgUrl)

  const newStreetArt = new Streetart({
    name, 
    artist, 
    details,
    streetArtImgUrl,
    location: {
      type: 'Point',
      coordinates: [longitude, latitude]
    }
  })


  newStreetArt
    .save()
    .then((streetart) => res.redirect('/streetart'))
    .catch(err => console.log(err))
})

module.exports = router; 