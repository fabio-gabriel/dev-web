const axios = require("axios").default;
const http = require("http");
const ApplicationController = require('./applicationController');
const user1 = { id: 1, username: "pimenta", role: "admin" };
const user2 = { id: 2, username: "fabio", role: "user" };

class HomeController extends ApplicationController {

  async index(req, res) {
    try {
      let response = await axios.get("http://localhost:8084/");
      const current_user = super.define_user(res)
      let jsonRes = response.data;
      res.render("index", {
        title: "Home",
        auctions: jsonRes.auctions,
        user: current_user,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async login_page(req, res) {
    try {
      const current_user = super.define_user(res)
      res.render("login", {
        title: "Login",
        user: current_user,
      });
      }
      catch (error) {
        console.log(error.message)
    }
  }

  async login(req, res) {
    try {
        let user = req.body.email; // Obter o email corretamente
        let password = req.body.password; // Obter a senha corretamente
        let vars = { email: user, password: password }; // Use um objeto para enviar dados

        let response = await axios.post("http://localhost:8084/login", vars);
        let jsonRes = response.data;

        if(response.status == 200){
          res.cookie("session_token", response.data.session_token)
          return res.redirect('/');
        }
        return res.redirect('/login')
        
    } catch (error) {
        console.log(error.message);
    }
}

async logout(req, res){
  const session_token = req.cookies["session_token"]

  const response = await axios.post('http://localhost:8084/logout',{},{
    headers:{
      'Cookie': `session_token=${session_token}`
    }
  }).catch((error) => {
    console.log(error.message)
  }) 

  res.redirect('/login')
  return res.end() 
}

}

module.exports = new HomeController();
