var express = require('express');
var router = express.Router();

//npm install web3 --save
var web3 = require('web3')

var w3 = new web3(new web3.providers.HttpProvider("http://localhost:7545"))

const Tx = require('ethereumjs-tx').Transaction

var ABI =[
	{
		"constant": false,
		"inputs": [
			{
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "set_num",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "get_num",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

var CA = '0xbb1bf2ecb0b5036f3c0502e7b8356f226206c6eb'

const Contract = new w3.eth.Contract(ABI, CA)

var EOA1 = '0x0A0eEBC8CbF1087D5a4962a6bD8E677585045a39'
var PRIVATE_KEY = '2dd58b58a1871b980357dab4f604266b2fe6efbd2407c8a509e9ae50b739ef9b'

var setStringExec = Contract.methods.set_num(30)
var setStringByteCode = setStringExec.encodeABI()

const Gwei = 9;
const unit = 10 ** Gwei;
const gasLimit = 221000;
const gasPrice = 21* unit;

w3.eth.getTransactionCount(EOA1, "pending", (err, nonce) => {
  var rawTx = {
	nonce : nonce,
	
    gasPrice : gasPrice,
    gasLimit : gasLimit,
    data : setStringByteCode,
    from : EOA1,
    to : CA
  }
  let privateKey = new Buffer.from(PRIVATE_KEY, "hex");
  let tx = new Tx(rawTx);
  tx.sign(privateKey);
  let serializedTx = tx.serialize();
  w3.eth.sendSignedTransaction('0x' + serializedTx.toString("hex"), 
    (err, txHash) => {
      console.log('txHash', txHash);
  })
});

module.exports = router;
