var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './client/dist')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.post('/profile', function (req, res, next) {
  console.log(req.body)
  res.json(req.body)
})
app.listen(3000, () => {
    console.log('server start at 3000 port');
})
module.exports = app;
