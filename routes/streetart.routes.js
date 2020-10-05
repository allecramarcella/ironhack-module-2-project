
const express = require('express');
const router  = express.Router();
const Streetart = require('../models/Streetart.model');
const User = require('../models/User.model')
const fileUploader = require('../configs/cloudinary.config');
const checkLogin = require('../middleware/checkLogin');
const app = require('../app');
const { urlencoded } = require('body-parser');




// router.get('/add', (req, res) => {
//   res.render('streetart/add')
// })


router.get('/:cityName', (req, res, next) => {
  const { cityName } = req.params
  const loginRedirect  = req.originalUrl

  if(req.session.currentUser){    
    const streetArtByUser = Streetart.find( {user: req.session.currentUser._id, city: cityName}).limit(5).populate('user')
    const posts = Streetart.find({ city: cityName, user: { $ne:req.session.currentUser._id }}).limit(5).populate('user')

    Promise.all([streetArtByUser, posts])
    .then(result => {
      res.render('streetart/citymap', {streetArtByUser: result[0], posts: result[1], user: req.session.currentUser,  city: cityName})
    })
    .catch(err => console.log(err)) 
  } else {
    Streetart.find({city: cityName}).limit(5)
    .populate('user')
    .then(allStreetArt => {
      res.render('streetart/citymap', { posts: allStreetArt, city: cityName, loginRedirect: loginRedirect} )
    }
      )
    .catch(err => console.log(err))
  }
});



router.post('/add', fileUploader.single('streetArt-picture'), (req, res, next) => {
  const { name, artist, fullAddress, street, streetNumber, postalCode, city, longitude, latitude} = req.body
  const streetArtImgUrl = req.file.path

  const newStreetArt = new Streetart({
    name, 
    artist, 
    fullAddress,
    street,
    streetNumber,
    postalCode,
    city,
    streetArtImgUrl,
    location: {
      type: 'Point',
      coordinates: [longitude, latitude]
    },
    user: req.session.currentUser._id
  })


  newStreetArt.save()
    .then(streetart => {

      return User.findByIdAndUpdate({ _id: req.session.currentUser._id }, {$push: { posts: streetart._id}})
    })
    .then(()=> res.redirect('back'))
    .catch(err => console.log(err))
 })

 router.get('/artwork/details-:id', (req, res) => {
  const urlId = req.params.id
  const streetArtId = Streetart.findById(urlId).populate('user')

 streetArtId 
   .then(streetart => {
     res.render('streetart/details', {streetart, user: req.session.currentUser})
   })
   .catch(err => console.log(err))

})

// to see raw data in browser / postman
router.get('/show/api', (req, res, next) => {
  
  Streetart.find()
    .then(streetarts => {
      res.status(200).json({streetarts})
    })
    .catch(err => console.log(err))
});


module.exports = router; 