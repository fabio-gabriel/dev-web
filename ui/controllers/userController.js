const axios = require("axios").default;
const ApplicationController = require('./applicationController');

class UserController extends ApplicationController {


  async index(req, res) {
    try {
      let response = await axios.get("http://localhost:8084/");
      let jsonRes = response.data;
      res.render("login", {
        title: "Login",
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async create(req, res) {
    let params = req.body;
    let files = req.files;

    try {
      let images = files.map((file) => file.originalname);

      let response = await axios.post("http://localhost:8084/leiloes/new", {
        ...params,
        images,
      });

      let jsonRes = response.data;
      console.log("Dados enviados");
      res.send("Leilão criado");
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Erro ao criar leilão");
    }
  }

  async update(req, res) {
    let params = req.query;
    try {
      const auctionId = req.params.id;
      let response = await axios.put(
        `http://localhost:8084/leiloes/${auctionId}`,
        params,
      );
      let jsonRes = response.data;
      res.send("leilao editado");
    } catch (error) {
      console.log(error.message);
    }
  }

  async show(req, res) {
    
    try {
      const current_user = super.define_user(res)
      const auctionId = req.params.id;
      let response = await axios.get(
        `http://localhost:8084/leiloes/${auctionId}`,
      );
      let jsonRes = response.data;
      res.render("produto", {
        title: "Leilao",
        auction: jsonRes.auction,
        user: current_user,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async delete(req, res) {
    try {
      const auctionId = req.params.id;
      let response = await axios.delete(
        `http://localhost:8084/leiloes/${auctionId}`,
      );
      let jsonRes = response.data;
      res.send("Leilão deletado");
    } catch (error) {
      console.log(error.message);
    }
  }

  async yourAuctionsJSON(req, res) {
    try {
      const current_user = super.define_user(res)
      let jsonRes = { auctions: undefined };
      if (current_user) {
        let response = await axios.get("http://localhost:8084/seusLeiloes", {
          params: { username: activeUser.username },
        });
        jsonRes = response.data;
      }
      res.render("seusLeiloes", {
        title: "Seus Leiloes",
        user: current_user,
        auctions: jsonRes.auctions,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async edit(req, res) {
    try {
      const auctionId = req.params.id;
      const current_user = super.define_user(res)
      let response = await axios.get(
        `http://localhost:8084/leiloes/${auctionId}`,
      );
      let jsonRes = response.data;
      res.render("editarLeilao", {
        title: "Editar Leilão",
        auction: jsonRes.auction,
        user: current_user,
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = new LeiloesController();
