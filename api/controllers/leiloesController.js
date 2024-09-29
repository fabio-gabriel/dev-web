const Auction = require("../model/auction");
const ApplicationController = require("./applicationController");
const fs = require("fs");
//const Authentication = require('../services/authentication')

class LeiloesController extends ApplicationController {
  async index(req, res) {
    const auction = Auction.where({ deleted: false });

    let data = {
      auctions: auction,
    };
    res.status(200);
    res.send(JSON.stringify(data));
  }

  async yourAuctionsJSON(req, res) {
    const username = req.query.username;
    const auctions = Auction.where({ seller: username });

    let data = {
      auctions: auctions,
    };
    res.status(200);
    res.send(JSON.stringify(data));
  }

  async show(req, res) {
    const auctionId = parseInt(req.params.id);
    const auction = Auction.find(auctionId);

    let data = {
      auction: auction,
    };
    res.status(200);
    res.send(JSON.stringify(data));
  }

  async create(req, res) {
    const params = req.body;

    let images = req.body.images || [];

    try {
      let auctionDetails = {
        startDate: new Date(Date.now()),
        endDate: params.endDate,
        reservedPrice: params.reservedPrice,
      };
      //let seller = getCurrentUserId(); //Implementar função para pegar id do vendedor
      //TODO
      // let seller = getCurrentUserId(); Implementar função para pegar id do vendedor
      let highestBid = null; //Fazer função
      let auction = Auction.create({
        //TODO seller, images and should be auto populated by the server. Tags need to be parsed to become an array
        name: params.name,
        conservation: params.conservation,
        description: params.description,
        category: params.category,
        location: params.location,
        tags: params.tags,
        highestBid: highestBid,
        auctionDetails: auctionDetails,
        //seller: seller,
        images: images,
        seller: null,
      });

      let data = {
        auction: auction,
      };

      res.status(201);
      return res.send(JSON.stringify(data));
    } catch (error) {
      console.log(error.message);

      res.status(500);
      //TODO send an HTML modal back or something
      return res.send();
    }
  }

  async update(req, res) {
    const params = req.body.params
    let auction = Auction.find(req.params.id);
    let images = params.images || [];

    try {
      let auctionDetails = {
        endDate: params.endDate,
        reservedPrice: params.reservedPrice,
      };
      let highestBid = null;
      auction.update({
        name: params.name,
        conservation: params.conservation,
        description: params.description,
        category: params.category,
        location: params.location,
        tags: params.tags,
        highestBid: highestBid,
        auctionDetails: auctionDetails,
        images: images,
      });

      let data = {
        auction: auction,
      };

      res.status(200);
      return res.send(JSON.stringify(data));
    } catch (error) {
      console.log(error.message);

      res.status(500);
      //TODO send an HTML modal back or something
      return res.send();
    }
  }

  async delete(req, res) {
    try {
      Auction.delete(req.params.id);

      res.status(200);
      return res.send();
    } catch (error) {
      console.log(error.message);

      res.status(500);
      //TODO send an HTML modal back or something
      return res.send();
    }
  }
}

module.exports = new LeiloesController();
