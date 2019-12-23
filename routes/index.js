var express = require('express');
var router = express.Router();

const Web3 = require('web3');

const web3 = new Web3('http://localhost:8545');

const contract = require('../contract/Fish.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home')
});

module.exports = router;
