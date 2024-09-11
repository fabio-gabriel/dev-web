const axios = require('axios').default
const user1 = { id: 1, username: 'pimenta', role: 'admin' } 
const user2 = { id: 2, username: 'fabio', role: 'user' }
const userV = undefined

class LeilaoController{

  async show(req, res){
    try {
      const auctionId = req.params.id;
      let response = await axios.get(`http://localhost:8084/leilao/${auctionId}`)
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
}

module.exports = new LeilaoController