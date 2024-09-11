const axios = require('axios').default

class LeiloesController{

  async index(req, res){
    try {
      let response = await axios.get('http://localhost:8084/')
      let jsonRes = response.data
      res.render('leiloes', {
        title: "Leiloes",
        auctions: jsonRes.auctions
      })
    } catch (error) {
      console.log(error.message)
    }
  }
}

module.exports = new LeiloesController