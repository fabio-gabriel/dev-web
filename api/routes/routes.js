const express = require('express')
const HomeController = require('../controllers/homeController.js')
const LeiloesController = require('../controllers/leiloesController.js')
const upload = require('../services/uploadService.js')

const router = express.Router()

router.get('/', HomeController.index)
router.get('/Leiloes', LeiloesController.index)
router.get('/leiloes/:id', LeiloesController.show)
router.post('/leiloes/new', upload.single('file'), LeiloesController.create)
router.get('/seusLeiloes', LeiloesController.yourAuctionsJSON)

module.exports = router