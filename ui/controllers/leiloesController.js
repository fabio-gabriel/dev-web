const axios = require("axios").default;
const user1 = { id: 1, username: "pimenta", role: "admin" };
const user2 = { id: 2, username: "fabio", role: "user" };
const ApplicationController = require('./applicationController');
const userV = user1;
const activeUser = userV;
const FormData = require('form-data');
const multer = require('multer');

const upload = multer({ 
  // Armazena arquivos na memória temporariamente
  storage: multer.memoryStorage(), 
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
}).array('images', 3);


class LeiloesController extends ApplicationController {

  async index(req, res) {
    try {
      let response = await axios.get("http://localhost:8084/Leiloes");
      let jsonRes = response.data;
      const current_user = super.define_user(res)
      res.render("leiloes", {
        title: "Leilões",
        auctions: jsonRes.auctions,
        user: current_user,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async index_criaoleilao(req, res) {
    try {
      const current_user = super.define_user(res)
      let response = await axios.get("http://localhost:8084/");
      let jsonRes = response.data;
      res.render("criarLeilao", {
        title: "Criar Leilão",
        auctions: jsonRes.auctions,
        user: current_user,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async create(req, res) {
    let params = req.body;
    let files = req.files;

    console.log("Dados do formulário:", params);
    console.log("Arquivos recebidos:", files);

    try {
      let images = files.map((file) => file.originalname);

      let response = await axios.post("http://localhost:8084/leiloes/new", {
        ...params,
        images,
      });

      let jsonRes = response.data;
      res.send("Leilão criado");
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Erro ao criar leilão");
    }
  }

  async update(req, res) {
    let files = req.files
    const formData = new FormData();

    req.files.forEach((file) => {
      formData.append('images', file.buffer, file.originalname);
  });

  for (let key in req.body) {
    formData.append(key, req.body[key]);
  }

    try {
      const auctionId = req.params.id;
      const response = await axios.post(
        `http://localhost:8084/leiloes/${auctionId}`,
        formData,
        {
          headers: { 
            'Content-Type': 'multipart/form-data',
            ...formData.getHeaders(),
          },
          transformRequest: [
            (formData) => formData,
    ]
        }
      );
      let jsonRes = response.data;
      res.send("leilao editado");
    } catch (error) {
      console.log(error.message);
    }
  }

  async show(req, res) {
    try {
      const auctionId = req.params.id;
      const current_user = super.define_user(res)
      const session_token = req.cookies["session_token"];
      let response = await axios.get(`http://localhost:8084/leiloes/${auctionId}`, {
        headers: {
          'Cookie': `session_token=${session_token}`
        }
      });
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
      console.log('tentando deletar')
      const session_token = req.cookies["session_token"];
      const current_user = super.define_user(res)
      const auctionId = req.params.id;
      console.log(auctionId)
      let response = await axios.delete(
        `http://localhost:8084/leiloes/${auctionId}`,
        {headers: { 'Cookie': `session_token=${session_token}` }},
      );
      let jsonRes = response.data;
      res.send("Leilão deletado");
    } catch (error) {
      console.log(error.message);
    }
  }

  async yourAuctionsJSON(req, res) {
    try {
      let jsonRes = { auctions: undefined };
      const current_user = super.define_user(res)
      if (current_user) {
        let response = await axios.get("http://localhost:8084/seusLeiloes", {
          params: { username: current_user.username },
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
        user: current_user
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async bid (req, res) {
    try {
      console.log(req)
      const auctionId = req.params.id;
      const current_user = super.define_user(res)
      const session_token = req.cookies["session_token"];
      let params = req.body;
      if (current_user) {
        let response = await axios.put(`http://localhost:8084/bid/${auctionId}`, {
          ...params,
          user: current_user
        });
      }
      res.redirect(`/leilao/${auctionId}`)
    } catch (error) {
      console.log(error.message)
    }
  }
}

module.exports = new LeiloesController();
