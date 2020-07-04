const express = require('express')
const app = express()
const port = 3000;
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const httpProxy = require('http-proxy')
const apiProxy = httpProxy.createProxyServer({changeOrigin: true})

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static(path.join(__dirname, '/client/dist')))

//Matt's port
const matt = 'http://trulia-matthew.herokuapp.com/';

app.all('/reviews', (req, res) => {
  apiProxy.web(req, res, { target: matt, changeOrigin: true });
})
app.all('/features', (req, res) => {
  apiProxy.web(req, res, { target: matt, changeOrigin: true });
})

app.all('/reviews/vote/:id/:up', (req, res) => {
  apiProxy.web(req, res, { target: matt, changeOrigin: true });
})

//Justin's port
const justin = "http://13.57.228.197/"
app.all('/api/similarListings', (req, res) => {
  apiProxy.web(req, res, { target: justin, changeOrigin: true  });
})

app.all('/api/nearbyListings', (req, res) => {
  apiProxy.web(req, res, { target: justin, changeOrigin: true  });
})
//Kim's port
const kim = 'http://13.56.248.150/'
app.all('/api/home1', (req, res) => {
  apiProxy.web(req, res, { target: kim, changeOrigin: true });
})

// Sam's port
const sam = 'http://13.52.76.182/'
app.all('/api/listings', (req, res) => {
  apiProxy.web(req, res, { target: sam, changeOrigin: true });
})

app.listen(port, () => console.log(`\nlistening at http://localhost:${port}`));