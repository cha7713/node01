var express = require('express');
var router = express.Router();
var web3 = require('web3')


var w3 = new web3(new web3.providers.HttpProvider("http://localhost:7545"))
var ws3 = new web3(new web3.providers.WebsocketProvider("ws://localhost:7545"))

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/account_list', function (req, res, next) {
  w3.eth.getAccounts((err, result) => {

    res.render('account_list', { title: 'account_list', account_list: result });
  })

});

//
router.get('/balance_one.ajax', function (req, res, next) {
  var ac =req.query.acad;
  w3.eth.getBalance(ac, (err,balanceOf)=>{
    res.json({ret:balanceOf})
    res.end()
})
});

router.post('/send_tran', function (req, res, next) {
var a1 = req.body.addr1;
var a2 = req.body.addr2;
var et = req.body.eath;

w3.eth.sendTransaction({from:a1, to:a2, value:et}, (err, txHash)=>{
  console.log(txHash)
  res.redirect('/account_list')
})
});

module.exports = router;
