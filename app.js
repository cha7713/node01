var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//var web3_connRouter = require('./routes/web3_conn');
//var web3_accountRouter = require('./routes/web3_account');
//var web3_ex = require('./routes/web3_ex');
//var web3_contgetRouter = require('./routes/web3_cont_get.js');
//var web3_contgetRouter2 = require('./routes/web3_cont_set.js');

//var web3_contgetRouter3 = require('./routes/web3_cont_get2.js');
//var web3_contgetRouter4 = require('./routes/web3_cont_set2.js');

//var mongo_insert = require('./routes/mongo_insert.js');
var mongo_insert_member = require('./routes/mongo_insert_member.js');
//var web3_contdeployRouter = require('./routes/web3_cont_deploy.js');
//var web3_conteventRouter = require('./routes/web3_cont_event.js');
//var web3_conteventRouter = require('./routes/web3_customer_deploy.js');
var web3_conteventRouter = require('./routes/web3_cont_tran.js');




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//app.use('/mongo', mongo_insert);
app.use('/member', mongo_insert_member);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
