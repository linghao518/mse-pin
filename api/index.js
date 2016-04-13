var express = require('express');
var path = require('path')
var multer = require('multer');
var imageCtr = require('./image/image_controller');
var videoCtr = require('./image/image_controller');
var db = require('./db/db');
var process = require('child_process');

var app = express();

var uploadImage = multer({ dest: 'uploads' }).single('image');
var uploadVideo = multer({ dest: 'uploads' }).single('video');

// 上传图片
app.post('/image', function(req, res, next) {
    uploadImage(req, res, function(err) {
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

// 上传视频
app.post('/video', function(req, res, next) {
    uploadVideo(req, res, function(err) {
        next();
    });
}, function(req, res, next) {
    var input = req.file.path;
    var output = 'videos/' + req.file.filename + '.mp4';
    var cmd = "ffmpeg -i " + input + " -vcodec copy -acodec copy ../" + output;
    process.exec(cmd, function(err,stdout,stderr) {
        next();
    });
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
