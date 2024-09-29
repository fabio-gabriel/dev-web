const express = require("express");
const HomeController = require("../controllers/homeController.js");
const LeiloesController = require("../controllers/leiloesController.js");
const UserController = require("../controllers/userController.js");
const Authenticate = require("../services/authentication.js");
const upload = require("../services/uploadService.js");

const router = express.Router();

const middleware = {
  authenticate: function authenticate(req, res, next) {
    const session_token = req.cookies.session_token;

    if (!session_token) {
      res.status(401);
      return res.end();
    }

    const user = Authenticate.validate_token(session_token);

    if (!user) {
      res.status(401);
      return res.end();
    }

    res.locals.user = user;
    next();
  },

  fileUpload: upload.array("file", 3),
};

router.get("/", HomeController.index);
router.get("/Leiloes", LeiloesController.index);
router.get("/leiloes/:id", middleware.fileUpload, LeiloesController.show);
router.put(
  "/leiloes/:id",
  [middleware.authenticate, middleware.fileUpload],
  LeiloesController.update
);
router.delete(
  "/leiloes/:id",
  [middleware.authenticate, middleware.fileUpload],
  LeiloesController.delete
);
router.post(
  "/leiloes/new",
  [middleware.authenticate, middleware.fileUpload],
  LeiloesController.create
);
router.get("/seusLeiloes", LeiloesController.yourAuctionsJSON);

router.post("/login", HomeController.login);
router.post("/logout", HomeController.logout);

router.get("/users", middleware.authenticate, UserController.index);
router.get("/users/:id", middleware.authenticate, UserController.show);
router.post("/users", UserController.create);
router.put("/users/:id", middleware.authenticate, UserController.update);
router.delete("/users/:id", middleware.authenticate, UserController.delete);

router.get('/validate-token', middleware.authenticate, (req, res) => {
  const user = res.locals.user; // O usuário já foi autenticado pelo middleware
  return res.json({ user });
});

module.exports = router;