
const express = require('express');
const router  = express.Router();
const Streetart = require('../models/Streetart.model');
const User = require('../models/User.model')
const fileUploader = require('../configs/cloudinary.config');
const checkLogin = require('../middleware/checkLogin');
const app = require('../app');
const { urlencoded } = require('body-parser');

router.get('/add', (req, res) => {
  res.render('streetart/add')
})

router.get('/:cityName', (req, res, next) => {
  const { cityName } = req.params

  if(req.session.currentUser){    
    const streetArtByUser = Streetart.find( {user: req.session.currentUser._id, city: cityName}).populate('user')
    const posts = Streetart.find().populate('user')

    Promise.all([streetArtByUser, posts])
    .then(result => {
      res.render('streetart/citymap', {streetArtByUser: result[0], posts: result[1], user: req.session.currentUser, city: cityName})
    })
    .catch(err => console.log(err)) 
  } else {
    Streetart.find()
    .populate('user')
    .then(allStreetArt => res.render('streetart/citymap', { posts: allStreetArt, city: cityName}))
    .catch(err => console.log(err))
  }
});



router.post('/add', fileUploader.single('streetArt-picture'), (req, res, next) => {
  const { name, artist, details, address, city} = req.body
  const streetArtImgUrl = req.file.path

  const newStreetArt = new Streetart({
    name, 
    artist, 
    details,
    city,
    address,
    streetArtImgUrl,
    location: {
      type: 'Point',
      coordinates: [longitude, latitude]
    },
    user: req.session.currentUser._id
  })


  newStreetArt.save()
    .then(streetart => {
      console.log(streetart)
      return User.findByIdAndUpdate({ _id: req.session.currentUser._id }, {$push: { posts: streetart._id}})
    })
    .then(()=> res.redirect('/streetart'))
    .catch(err => console.log(err))
 })


router.get('/details-:id', (req, res) => {
   const urlId = req.params.id
   const streetArtId = Streetart.findById(urlId).populate('user')
  //  let currentUser 
   
  //  streetArtId  
  //   .then(streetart => {
  //     if(req.session.currentUser){
  //       console.log(req.session.currentUser)
  //       currentUser = req.session.currentUser._id
  //       if(streetart.user._id === currentUser) {
  //         User.findByIdAndUpdate({ _id: req.session.currentUser._id }, {$push: {currentUser: yes}})
  //         res.render('streetart/details', streetart)
  //       } 
  //     } else {
  //       res.render('streetart/details', streetart )
  //     }
      
    // })
    // .catch(err => console.log(err))
  
  streetArtId 
    .then(streetart => {
      res.render('streetart/details', streetart)
    })
    .catch(err => console.log(err))

})




module.exports = router; 