const express = require('express')
const HomeController = require('../controllers/homeController.js')
const SeusLeiloesController = require('../controllers/seusLeiloesController.js')
const LeiloesController = require('../controllers/leiloesController.js')
const leilaoController = require('../controllers/leilaoController.js')

/*
const AdministrativeController = require('../controllers/administrativeController.js')
const AuctionController = require("../controllers/auctionController")
const UserController = require('../controllers/userController')
const Authentication = require('../services/authentication')
*/
const router = express.Router()

router.get('/', HomeController.index)
router.get('/seusLeiloes', SeusLeiloesController.yourActionsJSON)
router.get('/Leiloes', LeiloesController.index)
router.get('/leilao/:id', leilaoController.show)

module.exports = router
