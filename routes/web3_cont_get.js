var express = require('express');
var router = express.Router();

//npm install web3 --save
var web3 = require('web3')

var w3 = new web3(new web3.providers.HttpProvider("http://localhost:7545"))

var ABI =[
	{
		"constant": true,
		"inputs": [],
		"name": "var1",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_var1",
				"type": "string"
			}
		],
		"name": "setString",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "run",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

var CA = '0xb919ae1f02ff4603e3ac27696828f25cf24eaf9f'

const Contract = new w3.eth.Contract(ABI, CA)

Contract.methods.run().call().then(data=>{
    console.log("var1의 값 :", data)
})

module.exports = router;
