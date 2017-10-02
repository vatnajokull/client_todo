'use strict';
require('dotenv').config();

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');

var morgan = require('morgan');
var express = require('express')
var app = express()

var util = require('util');

var proxyMiddleware = require('http-proxy-middleware');

function expressInit(baseDir) {
  console.log('baseDir is ' + baseDir);
  app.use(morgan('dev'));
  app.use(express.static(__dirname + '/src'));

  app.get('/', function (req, res) {
    res.send('home')
  })

  app.middleware = proxyMiddleware('/api', {target: process.env.API_URL, changeOrigin: true});

  app.listen(process.env.PORT, function () {
    console.log('Example app listening on port ' + process.env.PORT)
  })
}

function browserSyncInit(baseDir, browser) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;
  if(baseDir === conf.paths.src || (util.isArray(baseDir) && baseDir.indexOf(conf.paths.src) !== -1)) {
    routes = {
      '/bower_components': 'bower_components'
    };
  }

  var server = {
    baseDir: baseDir,
    routes: routes
  };

  server.middleware = proxyMiddleware('/api', {target: process.env.API_URL, changeOrigin: true});

  browserSync.instance = browserSync.init({
    startPath: '/',
    server: server,
    port: process.env.PORT,
    browser: browser
  });
}

browserSync.use(browserSyncSpa({
  selector: '[ng-app]'// Only needed for angular apps
}));

gulp.task('production', ['watch'], function () {
  expressInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src]);
});

gulp.task('serve', ['watch'], function () {
  browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src]);
});

gulp.task('serve:dist', ['build'], function () {
  browserSyncInit(conf.paths.dist);
});

gulp.task('serve:e2e', ['inject'], function () {
  browserSyncInit([conf.paths.tmp + '/serve', conf.paths.src], []);
});

gulp.task('serve:e2e-dist', ['build'], function () {
  browserSyncInit(conf.paths.dist, []);
});
