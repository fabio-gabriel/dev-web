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

  async update(req, res){
    console.log("oi")
    try {
      const auctionId = req.params.id;
      let response = await axios.put(`http://localhost:8084/leiloes/${auctionId}`)
      let jsonRes = response.data
      res.send('leilao editado')
    } catch (error) {
      console.log(error.message)
    }
  }
}

module.exports = new LeiloesController