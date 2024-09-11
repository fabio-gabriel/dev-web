const Auction = require('../model/auction')
//const Authentication = require('../services/authentication')

class LeilaoController{

  async show(req, res){
    const auctionId = parseInt(req.params.id);
    console.log(auctionId)
    const auction = Auction.find({id: auctionId});
    console.log(auction)

    let data = {
      auction: auction
    }
    res.status(200)
    res.send(JSON.stringify(data))
  }
}

module.exports = new LeilaoController