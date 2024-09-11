const express = require('express')
const HomeController = require('../controllers/homeController.js')
const seusLeiloesController = require('../controllers/seusLeiloesController.js')
/*
const AdministrativeController = require('../controllers/administrativeController.js')
const AuctionController = require("../controllers/auctionController")
const UserController = require('../controllers/userController')
const Authentication = require('../services/authentication')
*/
const router = express.Router()

// Home
router.get('/', HomeController.index)
router.get('/seusLeiloes', seusLeiloesController.yourActionsJSON)
/*router.post('/authenticate', HomeController.authenticate)
router.post('/auth', authenticate, HomeController.validateTokenAuth)
router.post('/logout', HomeController.logout)
router.get('/forgotpassword', HomeController.forgotPassword)
*/

// Administrative - authentication middleware
/*router.use('/administrative', authenticate)
router.get('/administrative', AdministrativeController.administrative)

// Users
router.post('/users', UserController.usersJson)
router.get('/administrative/users', UserController.index)
router.get('/administrative/user/new', UserController.new)
router.put('/administrative/user/edit', UserController.update)
router.get('/administrative/user/edit/:id', UserController.edit)
router.get('/administrative/user/:id', UserController.show)
router.post('/administrative/user', UserController.create)
router.delete('/administrative/user/:id', UserController.delete)

// Auctions
router.post('/auctions', AuctionController.auctionsJson)
router.get('/administrative/auctions', AuctionController.index)
router.get('/administrative/auction/new', AuctionController.new)
router.put('/administrative/auction/edit', AuctionController.update)
router.get('/administrative/auction/edit/:id', AuctionController.edit)
router.get('/administrative/auction/:id', AuctionController.show)
router.post('/administrative/auction', AuctionController.create)
router.delete('/administrative/auction/:id', AuctionController.delete)

// Authentication middleware
function authenticate(req, res, next) {
  const session_token = req.cookies["session_token"]

  if (!session_token) {
    res.status(401)
    return res.end()
  }

  const user = Authentication.validate_token(session_token)
  
  if (!user) {
    res.status(401)
    return res.end()
  }

  res.locals.user = user
  next()
}
  */

module.exports = router
