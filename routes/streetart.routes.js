
const express = require('express');
const router  = express.Router();
const Streetart = require('../models/Streetart.model');
const User = require('../models/User.model')
const fileUploader = require('../configs/cloudinary.config');
const checkLogin = require('../middleware/checkLogin');
const app = require('../app');
const { urlencoded } = require('body-parser');


///////////MAP CITY///////////
router.get('/:cityName', (req, res, next) => {
  const { cityName } = req.params
  const loginRedirect  = req.originalUrl
  const loginRedirectEncoded = encodeURI(loginRedirect)
  // console.log(loginRedirect)
  // console.log(loginRedirectEncoded)

  if(req.session.currentUser){    
    const streetArtByUser = Streetart.find( {user: req.session.currentUser._id, city: cityName}).limit(3).populate('user').sort( { createdAt : -1} )
    const posts = Streetart.find({ city: cityName, user: { $ne:req.session.currentUser._id }}).limit(3).populate('user').sort( { createdAt : -1} )

    Promise.all([streetArtByUser, posts])
    .then(result => {
      res.render('streetart/citymap', {streetArtByUser: result[0], posts: result[1], user: req.session.currentUser,  city: cityName})
    })
    .catch(err => console.log(err)) 
  } else {
    Streetart.find({city: cityName}).limit(3).sort( { createdAt : -1} )
    .populate('user')
    .then(allStreetArt => {
      res.render('streetart/citymap', { posts: allStreetArt, city: cityName, loginRedirect: loginRedirectEncoded} )
    }
      )
    .catch(err => console.log(err))
  }
});

///////////ADD///////////
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

 ///////////DETAILS///////////
 router.get('/artwork/details-:id', (req, res) => {
  const urlId = req.params.id
  const streetArtId = Streetart.findById(urlId).populate('user')

  if(req.session.currentUser){
    streetArtId 
    .then(streetart => {

      const streetartUploader = String(streetart.user._id)
      const currentUser = String(req.session.currentUser._id)

      if(streetartUploader === currentUser){
        res.render('streetart/details', {streetart, user: req.session.currentUser, sameUser: req.session.currentUser})
      } else{
         res.render('streetart/details', {streetart, user: req.session.currentUser})
      }
     
    })
    .catch(err => console.log(err))
  } else{
    streetArtId 
    .then(streetart => {
         res.render('streetart/details', {streetart, user: req.session.currentUser})
    })
    .catch(err => console.log(err))
  }


  
})

///////////EDIT///////////
router.get('/artwork/edit-:id', (req, res) => {
  const { id } = req.params

  Streetart.findById(id)
    .then(streetartEdit => {
      res.render('streetart/edit', streetartEdit)
    })
    .catch(err => console.log(err))
})

router.post('/artwork/edit-:id', fileUploader.single('streetArt-picture'), (req, res) => {
  const { id } = req.params
  const { name, artist } = req.body

  if(req.file){
    const streetArtImgUrl = req.file.path

    Streetart.findByIdAndUpdate(id, {$set: {name, artist, streetArtImgUrl}}, {new: true})
    .then(updatedStreetart => {
      res.redirect(`/streetart/artwork/details-${updatedStreetart._id}`)
    })
    .catch(err => console.log(err))
  } else{
    Streetart.findByIdAndUpdate(id, {$set: {name, artist}}, {new: true})
    .then(updatedStreetart => {
      res.redirect(`/streetart/artwork/details-${updatedStreetart._id}`)
    })
    .catch(err => console.log(err))
  }
})

///////////DELETE///////////
router.post('/artwork/details/delete-:id', (req, res) => {
  const { id } = req.params

  Streetart.findByIdAndDelete(id)
    .then((check)=> {
      res.redirect('/userProfile')}
      )
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