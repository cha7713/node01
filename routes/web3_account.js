var express = require('express');
var router = express.Router();
var web3 = require('web3')


var w3 = new web3(new web3.providers.HttpProvider("http://localhost:7545"))
var ws3 = new web3(new web3.providers.WebsocketProvider("ws://localhost:7545"))

w3.eth.getAccounts(function(err,result){
    console.log("account list:", result)
    for(var i = 0; i<result.length; i++){
        console.log(result[i])
        w3.eth.getBalance(result[i], (err,balaceOF)=>{
            console.log("balance :", balaceOF)

        })
    }
    //0번에서 5번으로 10000전송
    w3.eth.sendTransaction({from:result[0], to:result[5], value:10000}, (err,txHash)=>{
        console.log(txHash)
    })

    w3.eth.personal.newAccount('p', (err, createdAddress)=>{
        if(!err){
            console.log('newAccount',createdAddress)
        }
    })


})



module.exports = router;