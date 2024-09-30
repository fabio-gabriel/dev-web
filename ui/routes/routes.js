const express = require("express");
const multer = require("multer");
const HomeController = require("../controllers/homeController.js");
const LeiloesController = require("../controllers/leiloesController.js");
const AdminController = require('../controllers/adminController.js');

/*
const AuctionController = require('../controllers/auctionController')

const UserController = require('../controllers/userController') */

const axios = require("axios").default;

const router = express.Router();

const upload = multer({ 
  // Armazena arquivos na memória temporariamente
  storage: multer.memoryStorage(), 
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
}).array('file', 3);

async function authenticate(req, res, next) {
  const session_token = req.cookies["session_token"];
  
  if (!session_token) {
    // Se não houver token de sessão, o usuário não está logado
    res.locals.user = null;
    return next();
  }

  try {
    const response = await axios.get('http://localhost:8084/validate-token', {
      headers: {
        'Cookie': `session_token=${session_token}`
      }
    });
    const user = response.data.user;
    res.locals.user = user; // Usuário autenticado
  } catch (error) {
    // Em caso de erro na requisição, considere o usuário como não logado
    res.locals.user = null;
  }

  next(); // Continua para o próximo middleware ou controlador
}
  
  async function verify_user_logged(req, res, next){
    const session_token = req.cookies["session_token"]
    let request_error = null
  
    if(!session_token){
      return next()
    }
  
    const response = await axios.get('http://localhost:8084/validate-token',{
      headers:{
        'Cookie': `session_token=${session_token}`
      }
    }).catch((error) => {
      request_error = error
    }) 
    if(request_error){
      return next()
    }
    
    return res.end() 
  }

router.use(authenticate);

// Home routes
router.get("/", HomeController.index);

router.get("/seusLeiloes", LeiloesController.yourAuctionsJSON);
router.get("/leiloes", LeiloesController.index);
router.get("/leilao/:id", LeiloesController.show);
router.get("/leiloes/new", LeiloesController.index_criaoleilao);
router.post("/leiloes/new", upload, LeiloesController.create);

router.get("/leilao/:id/editar", LeiloesController.edit);
router.post("/leiloes/:id", upload, LeiloesController.update)
router.post("/leilao/:id/deletar", LeiloesController.delete);

router.get('/login', verify_user_logged, HomeController.login_page)
router.post("/login", HomeController.login);
router.post('/logout', HomeController.logout)
router.get('/register', HomeController.register_page)
router.post('/register', HomeController.register)

router.get('/admin', AdminController.index)
router.get('/admin/users', AdminController.users)
router.get('/admin/auctions', AdminController.auctions)
router.post('/admin/users/:id', AdminController.edit_user)
router.get('/admin/users/:id', AdminController.edit_user_page)
router.post('/admin/users/delete/:id', AdminController.delete_user)

router.post('/bid/:id', LeiloesController.bid)

module.exports = router;
