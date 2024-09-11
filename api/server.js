const express = require('express');
const path = require('path');
const app = express();
const port = 8084

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, '/public')));

// what
// const defaultGET = require('./src/defaultGET')
// const defaultPOST = require('./src/defaultPOST')

const routes = require('./routes/routes')
app.use("/", routes)

app.listen(port, function () {
	console.log('Server listening on port ' + port)
})