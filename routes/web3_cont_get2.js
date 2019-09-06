var express = require('express');
var router = express.Router();

//npm install web3 --save
var web3 = require('web3')

var w3 = new web3(new web3.providers.HttpProvider("http://localhost:7545"))

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

Contract.methods.get_num().call().then(data=>{
    console.log("var1의 값 :", data)
})

module.exports = router;
