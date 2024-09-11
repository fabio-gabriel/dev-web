const Auction = require('../model/auction')
//const Authentication = require('../services/authentication')

class HomeController{

  async yourActionsJSON(req, res){
    const username = req.query.username;
    const auctions = Auction.where('seller.username', username);
    console.log(auctions)
    let data = {
      auctions: auctions
    }
    res.status(200)
    res.send(JSON.stringify(data))
  }
}

module.exports = new HomeController