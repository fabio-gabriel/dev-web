const axios = require("axios").default;
const ApplicationController = require('./applicationController');

class AdminController extends ApplicationController {
    async index(req, res) {
        const current_user = super.define_user(res);
        
        // Verificar se o usuário está autenticado e se é um administrador
        if (!current_user || current_user.role !== 'admin') {
            return res.status(403).send("Acesso negado. Você não tem permissão para acessar esta página.");
        }
        try {
            let response = await axios.get("http://localhost:8084/");
            let jsonRes = response.data;
            res.render("admin", {
                title: "Admin",
                user: current_user,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Erro ao carregar a página de administração.");
        }
    }

    async users(req, res) {
        try {
            const session_token = req.cookies["session_token"];
            const current_user = super.define_user(res);
            let response = await axios.get("http://localhost:8084/users", {
                headers: { 'Cookie': `session_token=${session_token}` }
            });
            let jsonRes = response.data;
            res.render("adminUsers", {
                title: "Admin - Usuários",
                users: jsonRes.users,
                user: current_user
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Erro ao carregar a página de administração.");
        }
        
    }

    async auctions(req, res) {
        try {
            const session_token = req.cookies["session_token"];
            const current_user = super.define_user(res);
            let response = await axios.get("http://localhost:8084/Leiloes", {
                headers: { 'Cookie': `session_token=${session_token}` }
            });
            let jsonRes = response.data;
            res.render("adminLeiloes", {
                title: "Admin - Leilões",
                auctions: jsonRes.auctions,
                user: current_user
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Erro ao carregar a página de administração.");
        }
        
    }

    async edit_user(req, res) {
        try {
            const session_token = req.cookies["session_token"];
            const userId = req.params.id;
            let params = req.body;
            let response = await axios.put(`http://localhost:8084/users/${userId}`, params, {
                headers: { 'Cookie': `session_token=${session_token}` 
            }});
            res.send('usuario editado')
        } catch (error) {
            console.log(error.message)
        }
    }

    async edit_user_page(req, res) {
        try {
            const session_token = req.cookies["session_token"];
            const userId = req.params.id
            const current_user = super.define_user(res)
            let response = await axios.get(
                `http://localhost:8084/users/${userId}`,
                {headers: { 'Cookie': `session_token=${session_token}` }}
              );
              let jsonRes = response.data;
          res.render("editarUsuario", {
            title: "Editar Usuário",
            user: jsonRes.user,
          });
          }
          catch (error) {
            console.log(error.message)
        }
      }

      async delete_user(req, res) {
        try {
          const userId = req.params.id;
          const session_token = req.cookies["session_token"];
          let response = await axios.delete(
            `http://localhost:8084/users/${userId}`,
            {headers: { 'Cookie': `session_token=${session_token}` }}
          );
          let jsonRes = response.data;
          res.send("Usuário deletado");
        } catch (error) {
          console.log(error.message);
        }
      }

}

module.exports = new AdminController();
