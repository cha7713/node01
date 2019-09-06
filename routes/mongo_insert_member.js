var express = require('express');
var router = express.Router();
var Web3 = require('web3');

//npm install mongodb --save
var MongoClient = require("mongodb").MongoClient;
const Tx = require('ethereumjs-tx').Transaction

var w3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));


//127.0.0.1:3000/mongo/insert
router.get('/insert', function (req, res, next) {
  MongoClient.connect('mongodb://localhost:27017/item', function (err, dbconn) {
    if (err) {
      console.log('error', err);
    }
    else {
      var collection = dbconn.db("item").collection('abi');
      collection.find({}).toArray(function (err, docs) {
        res.render("member", { 'CA': docs[0].CA });
      })
    }
  })
    ;
});

router.post('/insert', function (req, res, next) {
  var a = req.body.id;
  var b = req.body.pw;
  var c = req.body.name;
  var d = req.body.addr;
  var e = req.body.age;

  var newAc =''
  MongoClient.connect('mongodb://localhost:27017/item', function (err, dbconn) {
    if (err) {
      console.log('error', err);
    }
    else {
      var collection = dbconn.db("item").collection('abi');
      //
      collection.find({}).toArray(function (err, docs) {

        console.log(docs[0].CA)
        console.log(docs[0].ABI)

        abi = docs[0].ABI

        ca = docs[0].CA

        //let {address, privatekey} = w3.eth.accounts.create();
        w3.eth.personal.newAccount('p', (err, createdAddress) => {
          if (!err) {
            console.log('newAccount', createdAddress)
           newAc = createdAddress
            arr = { "id": a, "pw": b, "name": c, "addr": d, "age": e, "acount": newAc, 'abi':abi, 'ca':ca };
            var collection = dbconn.db("item").collection('member1');
        collection.insertOne(arr).then(function (result) {
          console.log(result);
          
        })
          }
        })
        



        const Contract = new w3.eth.Contract(abi, ca)

        var EOA1 = '0xcF2dcf94FA89E85eD4dfB83F4FFD7b767160bd65'
        var PRIVATE_KEY = 'e8abe2052bec43ea2c49f89f83b43039d7e5aa9e7393d11bf491c0471ffa0070'

        var setStringExec = Contract.methods.setJoin(e, a, c)
        var setStringByteCode = setStringExec.encodeABI()

        const Gwei = 9;
        const unit = 10 ** Gwei;
        const gasLimit = 221000;
        const gasPrice = 21 * unit;

        w3.eth.getTransactionCount(EOA1, "pending", (err, nonce) => {
          var rawTx = {
            nonce: nonce,

            gasPrice: gasPrice,
            gasLimit: gasLimit,
            data: setStringByteCode,
            from: EOA1,
            to: ca
          }
          let privateKey = new Buffer.from(PRIVATE_KEY, "hex");
          let tx = new Tx(rawTx);
          tx.sign(privateKey);
          let serializedTx = tx.serialize();

          w3.eth.sendSignedTransaction('0x' + serializedTx.toString("hex"),
            (err, txHash) => {
              if (!err) {
                console.log('txHash', txHash);
                
                  w3.eth.getTransactionCount(EOA1, 'pending', (err, nonce) => {
                    let allEth = 50000000000000000;

                    let rawTx = {
                      nonce: nonce,//채굴 난이도
                      gasPrice: gasPrice,
                      gasLimit: gasLimit,
                      value: allEth,
                      from: EOA1,
                      to: newAc
                    }
                    var privatekey = new Buffer.from(PRIVATE_KEY, 'hex');
                    var tx = new Tx(rawTx) // 트랜잭션 객체 생성
                    tx.sign(privatekey) // 개인키로 서명

                    let serializedTx = tx.serialize();

                    w3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), (err, txHash) => {
                      if (!err) {
                        console.log(txHash)
                        w3.eth.getBalance(EOA1, (err, balanceOfEOA1) => {
                          console.log("EOA1 balance : ", balanceOfEOA1)
                          w3.eth.getBalance(newAc, (err, balanceOfEOA2) => {
                            console.log("newAc balance : ", balanceOfEOA2)
                          })
                        })
                      } else {
                        console.log(err)
                      }
                    })

                  })

              } else {
                console.log('err', err);
              }
            })
        });
        res.redirect("/member/list");

      })


    }
  });

});

router.get('/list', function (req, res, next) {
  MongoClient.connect('mongodb://localhost:27017/item', function (err, dbconn) {
    if (err) {
      console('err', err)
      res.render("list");

    } else {
      var collection = dbconn.db("item").collection('member1');
      //
      collection.find({}).toArray(function (err, docs) {
        res.render('list', { list: docs })
      })

    }
  })
});

router.get('/remove', function (req, res, next) {
  MongoClient.connect('mongodb://localhost:27017/item', function (err, dbconn) {
    var arr = { id: req.query.id }
    if (err) {
      console('err', err)
      res.render("list");

    } else {
      var collection = dbconn.db("item").collection('member1');
      //
      collection.remove(arr).then(function (err) {
        res.redirect('/member/list')
      })

    }
  })
});

router.get('/update', function (req, res, next) {
  MongoClient.connect('mongodb://localhost:27017/item', function (err, dbconn) {
    var arr = { id: req.query.id }
    if (err) {
      console('err', err)
      res.render("list");

    } else {
      var collection = dbconn.db("item").collection('member1');
      //
      collection.find(arr).toArray(function (err, docs) {
        res.render('member_update', { list: docs })
      })

    }
  })
});

router.post('/update', function (req, res, next) {
  MongoClient.connect('mongodb://localhost:27017/item', function (err, dbconn) {
    var arr = { id: req.body.id }
    var arr2 = { name: req.body.name, pw: req.body.pw, addr: req.body.addr, age: req.body.age }
    if (err) {
      console('err', err)
      res.render("list");

    } else {
      var collection = dbconn.db("item").collection('member1');
      //
      collection.update(arr, { $set: arr2 }).then(function (err, docs) {
        res.redirect('/member/list')
      })

    }
  })
});



module.exports = router;

