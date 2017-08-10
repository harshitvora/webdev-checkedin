var app = require('./express');
var express = app.express;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// var passport = require('passport');
// var cookieParser = require('cookie-parser');
// var session = require('express-session');
//
// app.use(cookieParser());
// app.use(session({
//     secret: '',
//     resave: true,
//     saveUninitialized: true
// }));
app.use(express.static(__dirname + '/public'));

require("./project/app");

app.listen(process.env.PORT || 3000);