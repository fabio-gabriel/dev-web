const axios = require('axios').default
const user1 = { id: 1, username: 'pimenta', role: 'admin' } 
const user2 = { id: 2, username: 'fabio', role: 'user' }
const userV = undefined

class CriarLeilaoController{

  async index(req, res){
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

  async create(req, res){
    let params = req.body
    console.log(req)
    console.log(params)
    try {
      let response = await axios.post('http://localhost:8084/leiloes/new', params)
      let jsonRes = response.data
      console.log('Dados enviados')
      res.send('Leilao criado')
    } catch (error) {
      console.log(error.message)
    }
  }
}

module.exports = new CriarLeilaoController