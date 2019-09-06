var express = require('express');
var router = express.Router();
var web3 = require('web3')


var w3 = new web3(new web3.providers.HttpProvider("http://localhost:7545"))
var ws3 = new web3(new web3.providers.WebsocketProvider("ws://localhost:7545"))


   
    // for(var i = 0; i<3;i++){
    //     w3.eth.getAccounts(function(err,result){
    //         w3.eth.personal.newAccount('p', (err, createdAddress)=>{
    //             if(!err){
    //                 console.log('newAccount',createdAddress)
    //                 w3.eth.sendTransaction({from:result[0], to:result[result.length], value:10000}, (err,txHash)=>{
    //                     console.log(txHash)
    //                 })
    //             }
                
    //         })
            
    //     })
    // }




module.exports = router;