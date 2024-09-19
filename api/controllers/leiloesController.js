const Auction = require('../model/auction')
//const Authentication = require('../services/authentication')

class HomeController{

  async index(req, res){
    const auction = Auction.where({deleted: false})

    let data = {
      auctions: auction
    }
    res.status(200)
    res.send(JSON.stringify(data))
  }

  async yourAuctionsJSON(req, res){
    const username = req.query.username;
    const auctions = Auction.where({seller: username});

    let data = {
      auctions: auctions
    }
    res.status(200)
    res.send(JSON.stringify(data))
  }

  async show(req, res){
    const auctionId = parseInt(req.params.id);
    const auction = Auction.find({id: auctionId});

    let data = {
      auction: auction
    }
    res.status(200)
    res.send(JSON.stringify(data))
  }
}

module.exports = new HomeController