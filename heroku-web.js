var gzippo = require('gzippo');
var express = require('express');
var request = require('request');
var app = express();
var morgan = require('morgan');
var logger = morgan('combined');
var fs = require('fs');
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});
app.use(morgan('combinedstream: accessLogStream'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));
app.use('/', function(req, res) {
  var url = process.env.API_URL + req.url;
  req.pipe(request(url)).pipe(res);
});
app.listen(process.env.PORT || 3000);
