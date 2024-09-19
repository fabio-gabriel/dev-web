const express = require('express')
const HomeController = require('../controllers/homeController.js')
const LeiloesController = require('../controllers/leiloesController.js')

/*
const AdministrativeController = require('../controllers/administrativeController.js')
const AuctionController = require("../controllers/auctionController")
const UserController = require('../controllers/userController')
const Authentication = require('../services/authentication')
*/
const router = express.Router()

router.get('/', HomeController.index)
router.get('/Leiloes', LeiloesController.index)
router.get('/leiloes/:id', LeiloesController.show)
router.get('/seusLeiloes', LeiloesController.yourAuctionsJSON)

module.exports = router
