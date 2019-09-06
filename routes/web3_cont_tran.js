var express = require('express');
var router = express.Router();

//npm install web3 --save
var web3 = require('web3')

var w3 = new web3(new web3.providers.HttpProvider("http://localhost:7545"))

//npm install ethereumjs-tx --save
const Tx = require('ethereumjs-tx').Transaction

var w3 = new web3(new web3.providers.HttpProvider('http://127.0.0.1:7545'))

//보내는 계정
var EOA1 = '0xeDa9741c454182b69A5F540bd2578f50d182C7Eb'
const EO1_PRIVATE_KEY = 'bc353c8109ddf4e6e9dc72d5cb68c6ca35ed28d167d518010fca30e56226caef'
//받는 계정
var EOA2 = '0xEEf706b40e744FBC6A86845B638D17ADcFd64170'

const Gwei = 9;
const unit = 10 ** Gwei;
const gasLimit = 221000;
const gasPrice = 21 * unit;

w3.eth.getTransactionCount(EOA1, 'pending', (err, nonce) => {
	let allEth = 50000000000000000;

	let rawTx = {
		nonce: nonce,//채굴 난이도
		gasPrice: gasPrice,
		gasLimit: gasLimit,
		value: allEth,
		from: EOA1,
		to: EOA2
	}
	var privatekey = new Buffer.from(EO1_PRIVATE_KEY, 'hex');
	var tx = new Tx(rawTx) // 트랜잭션 객체 생성
	tx.sign(privatekey) // 개인키로 서명

	let serializedTx = tx.serialize();

	w3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), (err, txHash) => {
		if (!err) {
			console.log(txHash)
			w3.eth.getBalance(EOA1, (err, balanceOfEOA1) => {
				console.log("EOA1 balance : ", balanceOfEOA1)
				w3.eth.getBalance(EOA2, (err, balanceOfEOA2) => {
					console.log("EOA2 balance : ", balanceOfEOA2)
				})
			})
		} else {
			console.log(err)
		}
	})

})

module.exports = router;

