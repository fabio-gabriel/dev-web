const axios = require('axios').default
const user1 = { id: 1, username: 'pimenta', role: 'admin' } 
const user2 = { id: 2, username: 'fabio', role: 'user' }
const userV = undefined
const activeUser = user1

class SeusLeiloesController{

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

module.exports = new SeusLeiloesController