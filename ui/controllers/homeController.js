const axios = require("axios").default;
const http = require("http");
const user1 = { id: 1, username: "pimenta", role: "admin" };
const user2 = { id: 2, username: "fabio", role: "user" };
const userV = undefined;

class HomeController {
  async index(req, res) {
    try {
      let response = await axios.get("http://localhost:8084/");
      let jsonRes = response.data;
      res.render("index", {
        title: "Home",
        auctions: jsonRes.auctions,
        user: userV,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async login(req, res)

}

module.exports = new HomeController();
