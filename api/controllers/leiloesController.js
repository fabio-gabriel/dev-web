const Auction = require('../model/auction')
//const Authentication = require('../services/authentication')

class HomeController{

  async index(req, res){
    const auction = Auction.where({deleted: "false"})
    console.log(auction)

    let data = {
      auctions: auction
    }
    res.status(200)
    res.send(JSON.stringify(data))
  }

}

module.exports = new HomeController