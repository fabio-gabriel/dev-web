const axios = require('axios').default
const user1 = { id: 1, username: 'pimenta', role: 'admin' } 
const user2 = { id: 2, username: 'fabio', role: 'user' }
const userV = user1
const activeUser = userV

class LeiloesController{

  async index(req, res){
    try {
      let response = await axios.get('http://localhost:8084/')
      let jsonRes = response.data
      res.render('leiloes', {
        title: "Leilões",
        auctions: jsonRes.auctions,
        user: userV
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  async index_criaoleilao(req, res){
    try {
      let response = await axios.get('http://localhost:8084/')
      let jsonRes = response.data
      res.render('criarLeilao', {
        title: "Criar Leilão",
        auctions: jsonRes.auctions,
        user: userV
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  async create(req, res) {
    let params = req.body;
    let files = req.files;
    console.log(req)
  
    console.log('Dados do formulário:', params);
    console.log('Arquivos recebidos:', files);
  
    try {
      let images = files.map(file => file.originalname);

      console.log(images)
  
      let response = await axios.post('http://localhost:8084/leiloes/new', {
        ...params,
        images
      });
  
      let jsonRes = response.data;
      console.log('Dados enviados');
      res.send('Leilão criado');
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Erro ao criar leilão');
    }
  }

  async update(req, res){
    console.log("oi")
    let params = req.query
    console.log(params)
    try {
      const auctionId = req.params.id;
      let response = await axios.put(`http://localhost:8084/leiloes/${auctionId}`, params)
      let jsonRes = response.data
      res.send('leilao editado')
    } catch (error) {
      console.log(error.message)
    }
  }

  async show(req, res){
    try {
      const auctionId = req.params.id;
      let response = await axios.get(`http://localhost:8084/leiloes/${auctionId}`)
      let jsonRes = response.data
      res.render('produto', {
        title: "Leilao",
        auction: jsonRes.auction,
        user: userV
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  async delete(req, res){
    console.log('oi')
    try {
      const auctionId = req.params.id;
      let response = await axios.delete(`http://localhost:8084/leiloes/${auctionId}`)
      let jsonRes = response.data
      res.send('Leilão deletado')
    } catch (error) {
      console.log(error.message)
    }
  }

  async yourAuctionsJSON(req, res){
    try {
      let jsonRes = {auctions: undefined}
      if (activeUser) {
        let response = await axios.get('http://localhost:8084/seusLeiloes', {params: {username: activeUser.username}})
        jsonRes = response.data
      }
      res.render('seusLeiloes', {
        title: "Seus Leiloes",
        user: activeUser,
        auctions: jsonRes.auctions
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  async edit(req, res){
    try {
      const auctionId = req.params.id;
      let response = await axios.get(`http://localhost:8084/leiloes/${auctionId}`)
      let jsonRes = response.data
      res.render('editarLeilao', {
        title: "Editar Leilão",
        auction: jsonRes.auction,
        user: userV
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  /*
  async login(req, res){
    res.render('pages/login', {
      title: "Login"
    })
  }

  async authenticate(req, res){
    const email = req.body["email"]
    const password = req.body["password"]

    const response = await axios.post('http://localhost:5000/authenticate', {
      email: email,
      password: password
    }).catch((error) => {
      res.redirect('/login')
    })  

    if(response.status == 200){
      res.cookie("session_token", response.data.session_token)
      return res.redirect('/administrative');
    }
    return res.redirect('/login')
  }

  async logout(req, res){
    const session_token = req.cookies["session_token"]

    const response = await axios.post('http://localhost:5000/logout',{},{
      headers:{
        'Cookie': `session_token=${session_token}`
      }
    }).catch((error) => {
      console.log(error.message)
    }) 

    res.redirect('/login')
    return res.end() 
  }

  async forgotPassword(req, res){
    res.render('pages/forgotPassword', {
      title: "Recuperar senha",
      baseUrl: req.baseUrl
    })
  }
    */


}

module.exports = new LeiloesController