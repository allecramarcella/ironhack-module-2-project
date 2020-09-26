
const checkLogin = (req, res, next) => {
  if(req.session.currentUser ) {
    console.log('test')
    next()
  } else {
    res.redirect('/login')
  }
}

module.exports = checkLogin