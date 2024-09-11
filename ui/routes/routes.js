const express = require('express')
const HomeController = require('../controllers/homeController.js')
/*
const AdministrativeController = require('../controllers/administrativeController.js')
const UserController = require('../controllers/userController')
const AuctionController = require('../controllers/auctionController')
*/
const axios = require('axios').default

const router = express.Router()

// Home routes
router.get('/', HomeController.index)
/*
router.get('/login', verify_user_logged, HomeController.login)
router.post('/login', HomeController.authenticate)
router.post('/logout', HomeController.logout)
router.get('/forgotpassword', HomeController.forgotPassword)
*/

/*
// Administrative routes (requires authentication)
router.use('/administrative', authenticate)
router.get('/administrative', AdministrativeController.administrative)

// User routes in Administrative section
router.post('/users', UserController.usersJson)
router.get('/administrative/users', UserController.index)
router.get('/administrative/user/new', UserController.new)
router.post('/administrative/user/edit', UserController.update)
router.get('/administrative/user/edit/:id', UserController.edit)
router.get('/administrative/user/:id', UserController.show)
router.post('/administrative/user', UserController.create)
router.post('/administrative/delete/user/:id', UserController.delete)

// Auction routes in Administrative section
router.get('/auctions', BookController.books)
router.post('/auctions', BookController.booksJson)
router.get('/administrative/auctions', AuctionController.index)
router.get('/administrative/auction/new', AuctionController.new)
router.post('/administrative/auction/edit', AuctionController.update)
router.get('/administrative/auction/edit/:id', AuctionController.edit)
router.get('/administrative/auction/:id', AuctionController.show)
router.post('/administrative/auction', AuctionController.create)
router.post('/administrative/delete/auction/:id', AuctionController.delete)

// Authentication middleware
async function authenticate(req, res, next) {
  const session_token = req.cookies["session_token"]

  if (!session_token) {
    return res.redirect('/login')
  }

  let request_error = null
  const response = await axios.post('http://localhost:5000/auth', {}, {
    headers: {
      'Cookie': `session_token=${session_token}`
    }
  }).catch((error) => {
    request_error = error
  })

  if (request_error) {
    return res.redirect('/login')
  }

  const user = response.data.user
  res.locals.user = user
  res.locals.session_token = session_token
  next()
}

// Verify if user is logged in
async function verify_user_logged(req, res, next) {
  const session_token = req.cookies["session_token"]
  let request_error = null

  if (!session_token) {
    return next()
  }

  const response = await axios.post('http://localhost:5000/auth', {}, {
    headers: {
      'Cookie': `session_token=${session_token}`
    }
  }).catch((error) => {
    request_error = error
  })

  if (request_error) {
    return next()
  }

  return res.redirect('/administrative')
  
}
  */

module.exports = router
