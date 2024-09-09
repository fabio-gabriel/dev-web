const express = require('express');
const path = require('path');
const app = express();
const port = 8085

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, '/public')));

// what
// const defaultGET = require('./src/defaultGET')
// const defaultPOST = require('./src/defaultPOST')

app.get('/', (req, res) => {
	res.render('index', { title: 'Leilões' });
});

app.listen(port, function () {
	console.log('Server listening on port ' + port)
})