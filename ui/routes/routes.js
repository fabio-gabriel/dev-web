const express = require('express')
const multer = require('multer')
const HomeController = require('../controllers/homeController.js')
const SeusLeiloesController = require('../controllers/seusLeiloesController.js')
const LeiloesController = require('../controllers/leiloesController.js')
const leilaoController = require('../controllers/leilaoController.js')
const CriarLeilaoController = require('../controllers/criarLeilao.js')

const upload = multer();

/*
const AuctionController = require('../controllers/auctionController')
const AdministrativeController = require('../controllers/administrativeController.js')
const UserController = require('../controllers/userController') */

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
router.get('/seusLeiloes', SeusLeiloesController.yourAuctionsJSON)
router.get('/leiloes', LeiloesController.index)
router.get('/leilao/:id', leilaoController.show)
router.get('/leiloes/new', CriarLeilaoController.index)
router.post('/leiloes/new', upload.array('file', 3) ,CriarLeilaoController.create)

module.exports = router
