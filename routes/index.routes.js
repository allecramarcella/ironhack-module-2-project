const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  console.log(req.session)

  if(req.session.currentUser){
    res.render('index', {user: req.session.currentUser});
  } else {
    res.render('index');
  }

});

module.exports = router;
