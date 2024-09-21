const express = require('express')
const multer = require('multer')
const HomeController = require('../controllers/homeController.js')
const LeiloesController = require('../controllers/leiloesController.js')

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
router.get('/seusLeiloes', LeiloesController.yourAuctionsJSON)
router.get('/leiloes', LeiloesController.index)
router.get('/leilao/:id', LeiloesController.show)
router.get('/leiloes/new', LeiloesController.index)
router.post('/leiloes/new', upload.array('file', 3) , LeiloesController.create)
router.get('/leilao/:id/editar', LeiloesController.edit)
router.get('/leiloes/:id', upload.array('file', 3), LeiloesController.update) //TODO Verificar por que não tá upando imagem
router.post('/leilao/:id/deletar', LeiloesController.delete)

module.exports = router
