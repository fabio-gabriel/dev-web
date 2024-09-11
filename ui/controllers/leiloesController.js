const axios = require('axios').default
const user1 = { id: 1, username: 'pimenta', role: 'admin' } 
const user2 = { id: 2, username: 'fabio', role: 'user' }
const userV = undefined

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
}

module.exports = new LeiloesController