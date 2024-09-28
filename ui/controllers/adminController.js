const axios = require("axios").default;
const http = require("http");
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
            const current_user = super.define_user(res);
            let response = await axios.get("http://localhost:8084/users");
            console.log('pegou essa porra')
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
}

module.exports = new AdminController();
