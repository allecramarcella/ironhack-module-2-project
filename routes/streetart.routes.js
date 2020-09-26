
const express = require('express');
const router  = express.Router();
const Streetart = require('../models/Streetart.model');
const User = require('../models/User.model')
const fileUploader = require('../configs/cloudinary.config');
const checkLogin = require('../middleware/checkLogin');


router.get('/',  async (req, res, next) => {
  // Streetart.find({
  //   uploader: req.session.currentUser._id
  // })
  //   .then(streetart => {
  //     res.render('streetart/citymap',  { userInSession: req.session.currentUser });
  //   })
  //   .catch(err => {
  //     next(err)
  //   })
  if(req.session.currentUser) {
    const userInSession = await User.findById({_id: req.session.currentUser._id}).populate('posts')
    console.log(userInSession)
  
    res.render('streetart/citymap', userInSession)
  } else {
    res.render('streetart/citymap')
  }

 

});

router.get('/add', (req, res) => {
  // console.log(req.session.currentUser)
  res.render('streetart/add')
})


   


router.post('/add', fileUploader.single('streetArt-picture'), async (req, res, next) => {
  const { name, artist, details, longitude, latitude } = req.body
  // console.log(req.body)
  const streetArtImgUrl = req.file.path
  // console.log(streetArtImgUrl)

   
  const newStreetArt = new Streetart({
    name, 
    artist, 
    details,
    streetArtImgUrl,
    location: {
      type: 'Point',
      coordinates: [longitude, latitude]
    },
    uploader: req.session.currentUser._id
  })

  try{
    const newPost = await newStreetArt.save()
    console.log('test:',  newPost)
    await User.findByIdAndUpdate({_id: req.session.currentUser._id}, {$addToSet:{posts:newPost._id} })
  }
  catch(error){
    console.log(error)
  }

 
  
})


module.exports = router; 