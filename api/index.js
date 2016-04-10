var express = require('express');
var path = require('path')
var multer = require('multer');
var imageCtr = require('./image/image_controller');
var db = require('./db/db');


var app = express();

var upload = multer({ dest: 'uploads' }).single('image');

// 上传图片
app.post('/image', function(req, res, next) {
    upload(req, res, function(err) {
        next();
    });
}, function(req, res, next) {
    var image = imageCtr.covert(req.file);
    var collection = db.get().collection('media');
    collection.insert({
        thumbnail: image.thumbnail,
        path: image.path
    });
    next();
}, function(req, res) {
    res.json({
        result: 'success'
    });
});


// 获取资源
app.get('/media', function(req, res) {
    var collection = db.get().collection('media');
    collection.find().sort({"_id": -1}).toArray(function(err, docs) {
        res.json(docs);
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
