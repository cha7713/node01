var express = require('express');
var router = express.Router();
var web3 = require('web3')

console.log('web3_conn start');

var w3 = new web3(new web3.providers.HttpProvider("http://localhost:7545"))
var ws3 = new web3(new web3.providers.WebsocketProvider("ws://localhost:7545"))


// w3.eth.getBlockNumber((err, blockCount)=>{
//     console.log('blockCout', blockCount)
// })

// w3.eth.getBlock(0,(err,blockInfo)=>{
//     console.log(blockInfo)
// })

ws3.eth.subscribe('newBlockHeaders',(err,result)=>{
    if(!err){
        console.log('newBlock:', result)
    }

})
module.exports = router;