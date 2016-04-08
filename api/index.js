var express = require('express');
var path = require('path')
var multer = require('multer');
var imageCtr = require('./image/image_controller');
var db = require('./db/db');


var app = express();

var upload = multer({ dest: 'uploads' }).single('image');


app.post('/image', function(req, res, next) {
    upload(req, res, function(err) {
        next();
    });
}, function(req, res, next) {
    imageCtr.covert(req.file, function() {
        next();
    });
}, function(req, res) {
    res.json({
        result: 'success'
    });
});


// Connect to Mongo on start
db.connect('mongodb://localhost:27017/msepin', function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    app.listen(3000, function() {
      console.log('Listening on port 3000...')
    })
  }
})