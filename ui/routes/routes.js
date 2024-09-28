const express = require("express");
const multer = require("multer");
const HomeController = require("../controllers/homeController.js");
const LeiloesController = require("../controllers/leiloesController.js");
const AdministrativeController = require('../controllers/adminController.js');
const adminController = require("../controllers/adminController.js");

const upload = multer();

/*
const AuctionController = require('../controllers/auctionController')
const AdministrativeController = require('../controllers/administrativeController.js')
const UserController = require('../controllers/userController') */

const axios = require("axios").default;

const router = express.Router();

// Home routes
router.get("/", HomeController.index);

router.get("/seusLeiloes", LeiloesController.yourAuctionsJSON);
router.get("/leiloes", LeiloesController.index);
router.get("/leilao/:id", LeiloesController.show);
router.get("/leiloes/new", LeiloesController.index_criaoleilao);
router.post("/leiloes/new", upload.array("file", 3), LeiloesController.create);

router.get("/leilao/:id/editar", LeiloesController.edit);
router.get("/leiloes/:id", upload.array("file", 3), LeiloesController.update);
router.post("/leilao/:id/deletar", LeiloesController.delete);

router.get("/admin", adminController.index)
router.get("/admin/users", adminController.users)

async function authenticate (req, res, next) {
  const session_token = req.cookies["session_token"]
  
  if(!session_token){
    res.redirect('/login')
  }

  let request_error = null
  const response = await axios.post('http://localhost:5000/auth',{},{
    headers:{
      'Cookie': `session_token=${session_token}`
    }
  }).catch((error) => {
    request_error = error
  }) 
  if(request_error){
    res.redirect('/login')
    return res.end()
  }
  
  const user = response.data.user

  res.locals.user = user
  res.locals.session_token = session_token
  next()
}

async function verify_user_logged(req, res, next){
  const session_token = req.cookies["session_token"]
  let request_error = null

  if(!session_token){
    return next()
  }

  const response = await axios.post('http://localhost:5000/auth',{},{
    headers:{
      'Cookie': `session_token=${session_token}`
    }
  }).catch((error) => {
    request_error = error
  }) 
  if(request_error){
    return next()
  }
  
  res.redirect('/administrative')  
  return res.end() 
}

module.exports = router

module.exports = router;
