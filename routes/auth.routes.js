const { Router } = require('express');
const router = new Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/User.model');
const mongoose = require('mongoose');

const fileUploader = require('../configs/cloudinary.config');
const Streetart = require('../models/Streetart.model');

////////////////////////////////////////////////////////////////////////
///////////////////////////// SIGNUP //////////////////////////////////
////////////////////////////////////////////////////////////////////////
router.get('/signup', (req, res) => {
  res.render('auth/signup');
})

router.post('/signup', fileUploader.single('profile-picture'), (req, res, next) => {
  const { username, email, password , currentUser} = req.body;
  // const profileImgUrl = req.file.path;
  // console.log(req.file.path)

  if (!username || !email || !password) {
    res.render('auth/signup', { errorMessage: 'All fields are mandatory. Please provide your username, email and password.' });
    return;
  }

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res
      .status(500)
      .render('auth/signup', { errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.' });
    return;
  }

  bcrypt
    .genSalt(saltRounds)
    .then(salt => bcrypt.hash(password, salt))
    .then(hashedPassword => {
      return User.create({
        username,
        email,
        passwordHash: hashedPassword,
        currentUser
      });
    })
    .then(userFromDB => {
      console.log('Newly created user is: ', userFromDB);
      req.session.currentUser = userFromDB;
      res.redirect('/userProfile');
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render('auth/signup', { errorMessage: error.message });
      } else if (error.code === 11000) {
        res.status(500).render('auth/signup', {
          errorMessage: 'Username and email need to be unique. Either username or email is already used.'
        });
      } else {
        next(error);
      }
    }); 
});

////////////////////////////////////////////////////////////////////////
///////////////////////////// LOGIN //////////////////////////////////
////////////////////////////////////////////////////////////////////////
router.get('/login', (req, res)=> {
  const { redirect } = req.query
  console.log(redirect)
  res.render('auth/login', {redirect})
});

router.post('/login', (req, res, next) => {
  const { redirect } = req.query
  console.log(redirect)

  const { email, password } = req.body;

  if (email === '' || password === '') {
    res.render('auth/login', {
      errorMessage: 'Please enter both email and password to login.'
    });
    return;
  }

  User.findOne({ email })
    .then(user => {
      if (!user) {
        res.render('auth/login', { errorMessage: 'Email is not registered. Try with other email.' });
        return;
      } else if (bcrypt.compareSync(password, user.passwordHash)) {
        req.session.currentUser = user;
        if(!redirect) {
          res.redirect('/userProfile');
        } else{
          res.redirect(redirect);
        }
       
      } else {
        res.render('auth/login', { errorMessage: 'Incorrect password.' });
      }
    })
    .catch(error => next(error));
});

////////////////////////////////////////////////////////////////////////
///////////////////////////// LOGOUT //////////////////////////////////
////////////////////////////////////////////////////////////////////////

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});


////////////////////////////////////////////////////////////////////////
///////////////////////////// USER PROFILE //////////////////////////////
////////////////////////////////////////////////////////////////////////

router.get('/userProfile', (req, res) => {
  Streetart.find( {user: req.session.currentUser._id}).populate('user')
    .then(streetarts => {
      console.log(streetarts)
      res.render('users/user-profile',  { posts: streetarts, user: req.session.currentUser})
    })
    .catch(err=> console.log(err))

});


module.exports = router;