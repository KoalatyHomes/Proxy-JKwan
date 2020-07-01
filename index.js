const express = require('express')
const app = express()
const port = 3000;
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const httpProxy = require('http-proxy')
const apiProxy = httpProxy.createProxyServer()

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static(path.join(__dirname, '/client/dist')))

//Matt's port
const matt = 'http://localhost:7777';

app.all('/reviews', (req, res) => {
  console.log(`matt's review server is up`);
  apiProxy.web(req, res, { target: matt });
})
app.all('/features', (req, res) => {
  console.log(`matt's feature server is up`);
  apiProxy.web(req, res, { target: matt });
})

app.all('/reviews/vote/:id/:up', (req, res) => {
  console.log(`matt's feature server is up`);
  apiProxy.web(req, res, { target: matt });
})

//Justin's port
const justin = 'http://localhost:3003'
app.all('/api/similarListings', (req, res) => {
  console.log(`justin's similar server is up`);
  apiProxy.web(req, res, { target: justin });
})

app.all('/api/nearbyListings', (req, res) => {
  console.log(`justin's nearby server is up`);
  apiProxy.web(req, res, { target: justin });
})
//Kim's port
const kim = 'http://localhost:3333'
app.use('/api/home1', (req, res) => {
  console.log(`kim's server is up`)
  apiProxy.web(req, res, { target: kim });
})

// Sam's port
const sam = 'http://localhost:3001'
app.all('/api/listings', (req, res) => {
  console.log(`sam's server is up`);
  apiProxy.web(req, res, { target: sam });
})

app.listen(port, () => console.log(`\nlistening at http://localhost:${port}`));