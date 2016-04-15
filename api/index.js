var express = require('express');
var path = require('path')
var multer = require('multer');
var convert = require('./convert/convert_controller');
var db = require('./db/db');
var app = express();
var upload = multer({ dest: 'uploads' }).single('file');

app.post('/upload', function(req, res, next) {
    upload(req, res, function(err) {
        next();
    });
}, function(req, res, next) {
    var mimetype = req.file.mimetype.split('/');
    switch(mimetype[0]) {
        case 'image':
            insert.image(req, next);
            break;
        case 'video':
            insert.video(req, next);
            break;
    }
}, function(req, res) {
    res.json({
        result: 'success'
    });
});


var insert = {
    image: function(req, next) {
        convert.covertImage(req.file, function(image) {
            var collection = db.get().collection('media');
            image.type = 'image';
            collection.insert(image);
            next();
        });
    },
    video: function(req, next) {
        convert.covertVideo(req.file, function(video) {
            var collection = db.get().collection('media');
            video.type = 'video';
            collection.insert(video);
            next();
        });
    }
}



// 上传视频
app.post('/video', function(req, res, next) {
    uploadVideo(req, res, function(err) {
        next();
    });
}, function(req, res, next) {
    var input = req.file.path;
    var output = 'videos/' + req.file.filename + '.mp4';
    var cmd = "ffmpeg -i " + input + " -vcodec copy -acodec copy ../" + output;
    process.exec(cmd, function(err, stdout, stderr) {
        req.videoPath = output;
        next();
    });
}, function(req, res, next) {
    var input = req.file.path;
    var output = 'videos/' + req.file.filename + '_thumbnail.jpg';
    var cmd = "ffmpeg -i " + input + " -vframes 1 ../" + output;
    process.exec(cmd, function(err, stdout, stderr) {
        var collection = db.get().collection('media');
        collection.insert({
            type: 'video',
            thumbnail: output,
            path: req.videoPath
        });
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
