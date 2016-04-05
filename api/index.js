var express = require('express');
var path = require('path')
var multer = require('multer');
var imageCtr = require('./image/image_controller');


var app = express();

var upload = multer({ dest: 'uploads' }).single('avatar');


app.post('/image', function(req, res, next) {
    upload(req, res, function(err) {
        next();
    });
  }, function(req, res, next) {
        imageCtr.covert(req.file.path, function() {
            next();
        });
  }, function(req, res) {
        res.json({
            result: 'success'
        });
});

/* istanbul ignore next */
if (!module.parent) {
    app.listen(3000);
    console.log('Express started on port 3000');
}
