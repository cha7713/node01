var express = require('express');
var router = express.Router();

//npm install web3 --save   <= rpc서버 접속
var Web3 = require('web3');

//npm install solc --save   <= 솔리디티 코드 컴파일
const solc = require('solc');

const path = require('path'); //파일 경로 설정
const fs = require('fs');     //파일의 내용 읽기
const Tx = require('ethereumjs-tx').Transaction


const CONTRACT_FILE = "helloworld.sol";
const filepath = path.join(__dirname, '../sol', CONTRACT_FILE);
console.log(filepath);
const content = fs.readFileSync(filepath, 'UTF-8').toString();

var input = {
  language : 'Solidity',
  sources:{
    [CONTRACT_FILE]:{
      content :  content
    }
  },
  settings:{
    outputSelection:{
      '*':{
        '*':['*']
      }
    }
  }
}

var complied = solc.compile(JSON.stringify(input));
var output = JSON.parse(complied);

var abi = output.contracts[CONTRACT_FILE]['helloworld'].abi;
var bytecode = output.contracts[CONTRACT_FILE]['helloworld'].evm.bytecode.object;

var w3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

var contract =new w3.eth.Contract(abi)

contract.deploy({
  data:'0x'+bytecode,
  arguments:['constructor hello world']
}).send({
  from : '0xcF2dcf94FA89E85eD4dfB83F4FFD7b767160bd65',
  gas : 1500000,
  gasPrice : '3000000000'
  }, function(err, txHash){
    console.log(txHash)
  }).on('receipt',function(receipt){
    console.log('ca:', receipt.contractAddress)
    var ABI =  abi;
    var CA = receipt.contractAddress;
  
    get_contract = new w3.eth.Contract(ABI, CA);
      
    get_contract.methods.getString().call().then(data => {
      console.log('getString : ', data);
    });
    var EOA1 = '0x1818f8c8d5FD8F77cf3Aa2F18057C500A56F5758'
    var PRIVATE_KEY = 'e5f3869e01fbd05fbb8ec51b8d68c285d7e7f12967ab637096b3156f85914e8c'
    
    var setStringExec = get_contract.methods.setString("change helloworld")
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
      get_contract.methods.getString().call().then(data => {
        console.log('getString : ', data);
      });
    });

    

  });

  
module.exports = router;
