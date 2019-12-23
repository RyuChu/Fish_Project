var express = require('express');
var router = express.Router();

const Web3 = require('web3');

const web3 = new Web3('http://localhost:8545');

const contract = require('../contract/Fish.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index')
});

//register
router.post('/register', function (req, res, next) {
  	let fish = new web3.eth.Contract(contract.abi);
  	fish.options.address = req.body.address;
  	fish.methods.newUser(req.body.userName, req.body.userPwd).send({
    	from: req.body.account,
    	gas: 3400000,
  	})
    .on('receipt', function (receipt) {
      res.send(receipt);
    })
    .on('error', function (error) {
      res.send(error.toString());
    })
});

//login
router.post('/login', function (req, res, next) {
   let fish = new web3.eth.Contract(contract.abi);
  	fish.options.address = req.body.address;
  	fish.methods.isUser(req.body.account).send({
    	from: req.body.account,
    	gas: 3400000,
  	})
    .on('receipt', function (receipt) {
      res.send(receipt);
    })
    .on('error', function (error) {
      res.send(error.toString());
    })
});

module.exports = router;
