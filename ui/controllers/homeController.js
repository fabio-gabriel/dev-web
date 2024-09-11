const axios = require('axios').default
const http = require('http');
const user1 = { id: 1, username: 'pimenta', role: 'admin' } 
const user2 = { id: 2, username: 'fabio', role: 'user' }
const userV = undefined


class HomeController{

  async index(req, res){
    try {
      let response = await axios.get('http://localhost:8084/')
      let jsonRes = response.data
      res.render('index', {
        title: "Home",
        auctions: jsonRes.auctions,
        user: userV
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  /*
  async function index(req, res) {
    try {
      const url = 'http://localhost:8084/';
      
      const fetchData = () => {
        return new Promise((resolve, reject) => {
          http.get(url, (response) => {
            let data = '';
  
            response.on('data', (chunk) => {
              data += chunk;
            });
  
            response.on('end', () => {
              try {
                const jsonRes = JSON.parse(data);
                resolve(jsonRes);
              } catch (error) {
                reject(error);
              }
            });
          }).on('error', (error) => {
            reject(error);
          });
        });
      };
  
      const jsonRes = await fetchData();
      res.render('index', {
        title: "Home",
        auctions: jsonRes.auctions,
        user: userV
      });
    } catch (error) {
      console.log(error.message);
    }
  } */
}

module.exports = new HomeController