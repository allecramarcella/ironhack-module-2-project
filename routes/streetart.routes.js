
const express = require('express');
const router  = express.Router();
const Streetart = require('../models/Streetart.model');
const User = require('../models/User.model')
const fileUploader = require('../configs/cloudinary.config');
const checkLogin = require('../middleware/checkLogin');
const app = require('../app');
const { urlencoded } = require('body-parser');


router.get('/', (req, res, next) => {
  // if(req.session.currentUser) {
  //   const userInSession = await User.findById({_id: req.session.currentUser._id}).populate('posts')
  //   console.log(userInSession)
  
  //   res.render('streetart/citymap', userInSession)
  // } else {
  //   res.render('streetart/citymap')
  // }

  if(req.session.currentUser){    
    const streetArtByUser = Streetart.find( {user: req.session.currentUser._id}).populate('user')
    const posts = Streetart.find().populate('user')

    Promise.all([streetArtByUser, posts])
    .then(result => {
      res.render('streetart/citymap', {streetArtByUser: result[0], posts: result[1], user: req.session.currentUser})
    })
    .catch(err => console.log(err)) 
  } else {
    Streetart.find()
    .populate('user')
    .then(allStreetArt => res.render('streetart/citymap', { posts: allStreetArt}))
    .catch(err => console.log(err))
  }
});

router.get('/add', (req, res) => {
  res.render('streetart/add')
})

// router.post('/add', fileUploader.single('streetArt-picture'), async (req, res, next) => {
//   const { name, artist, details, longitude, latitude } = req.body
//   // console.log(req.body)
//   const streetArtImgUrl = req.file.path
//   // console.log(streetArtImgUrl)

   
//   const newStreetArt = new Streetart({
//     name, 
//     artist, 
//     details,
//     streetArtImgUrl,
//     location: {
//       type: 'Point',
//       coordinates: [longitude, latitude]
//     },
//     uploader: req.session.currentUser._id
//   })

//   try{
//     const newPost = await newStreetArt.save()
//     console.log('test:',  newPost)
//     await User.findByIdAndUpdate({_id: req.session.currentUser._id}, {$addToSet:{posts:newPost._id} })
//   }
//   catch(error){
//     console.log(error)
//   }
// })


router.post('/add', fileUploader.single('streetArt-picture'), (req, res, next) => {
  const { name, artist, details, longitude, latitude} = req.body
  const streetArtImgUrl = req.file.path

  const newStreetArt = new Streetart({
    name, 
    artist, 
    details,
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
    .then(()=> res.redirect('/streetart'))
    .catch(err => console.log(err))
 })


router.get('/details-:id', (req, res) => {
   const urlId = req.params.id
   const streetArtId = Streetart.findById(urlId).populate('user')
   let currentUser 
   
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