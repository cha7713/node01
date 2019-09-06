var express = require('express');
var router = express.Router();

//npm install mongodb --save
var MongoClient = require("mongodb").MongoClient;
var w3 = new web3(new web3.providers.HttpProvider("http://localhost:7545"))
const Tx = require('ethereumjs-tx').Transaction



//127.0.0.1:3000/mongo/insert
router.get('/insert', function (req, res, next) {
  res.render("insert");
});

router.post('/insert', function (req, res, next) {
  var a = req.body.no;
  var b = req.body.na;
  var c = req.body.pr;
  var d = req.body.cn;

  var arr = { "no": a, "name": b, "price": c, "cnt": d };
  console.log(arr);

  MongoClient.connect('mongodb://localhost:27017/item', function (err, dbconn) {
    var abi;
    var ca;
    if (err) {
      console.log('error', err);
    }
    else {
          var collection = dbconn.db("item").collection('table1');
      collection.insertOne(arr).then(function (result) {
        console.log(result);
        res.redirect("/mongo/select");
      })
    }
  });

});

router.get('/select', function (req, res, next) {
  MongoClient.connect('mongodb://localhost:27017/item', function (err, dbconn) {
    if (err) {
      console('err', err)
      res.render("select");

    } else {
      var collection = dbconn.db("item").collection('table1');
      //
      collection.find({}).toArray(function (err, docs) {
        res.render('select', { list: docs })
      })

    }
  })
});

//SELECT * FROM table1;
//collection.find({}).toArr~~

//SELECT id, pw FROM table1;  
//collection.find({}, {'projection':{id:1, pw:1}}).toArr~~

//SELECT * FROM table1 LIMIT 5;
//collection.find({}).limit(5).toArr~~

//SELECT * FROM table1 ORDER BY id DESC LIMIT 3
//collection.find({}).sort({id:-1}).limit(3).toArr~~

//SELECT * FROM table1 WHERE age > 10
//collection.find({ age : {$gt : 10} }).toArr~~

router.get('/delete', function (req, res, next) {
  var arr = { no: req.query.no }

  MongoClient.connect('mongodb://localhost:27017/item', function (err, dbconn) {
    if (err) {
      console('err', err)

    } else {
      var collection = dbconn.db("item").collection('table1');
      //
      collection.remove(arr).then(function (err) {
        res.redirect('/mongo/select')

      })


    }
  })
});

router.get('/update', function (req, res, next) {
  var arr = { no: req.query.no }
  //var arr = { no: req.query.no, name: req.query.name, price: req.query.price, cnt: req.query.cnt }

  MongoClient.connect('mongodb://localhost:27017/item', function (err, dbconn) {
    if (err) {
      console('err', err)

    } else {
      var collection = dbconn.db("item").collection('table1');
      //
      collection.find(arr).toArray(function (err, docs) {
        res.render('update', { list: docs })

      })


    }
  })
});
router.post('/update', function (req, res, next) {
  var arr = { no: req.body.no }
  var arr2 = { no: req.body.no, name: req.body.name, price: req.body.price, cnt: req.body.cnt }
  MongoClient.connect('mongodb://localhost:27017/item', function (err, dbconn) {
    if (err) {
      console('err', err)

    } else {
      var collection = dbconn.db("item").collection('table1');
      //
      collection.update(arr, { $set: arr2 }).then(function (err) {
        res.redirect('/mongo/select')

      })


    }
  })
});
module.exports = router;

