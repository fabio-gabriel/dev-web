const Auction = require('../model/auction')
const fs = require('fs')
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

  async create(req, res){
    const params = req.body    

    try {
      let book = Auction.create({
        name: params.name,
        highestBid: params.highestBid,
        conservation: params.conservation,
        description: params.description,
        category: params.category,
        images: params.images,
        auctionDetails: params.auctionDetails,
        seller: params.seller,
        location: params.location,
        tags: params.tags
      })

      let data = {
        book: book
      }

      res.status(201)
      return res.send(JSON.stringify(data))
    } catch (error) {
      console.log(error.message)

      res.status(500)
      //TODO send an HTML modal back or something
      return res.send()
    }
  }

}

module.exports = new HomeController