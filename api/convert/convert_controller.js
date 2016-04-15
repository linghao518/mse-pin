var im = require('imagemagick');
var process = require('child_process');

exports.covertImage = function(file, cb) {
    var dstPath = 'pics/' + file.filename + '.jpg';
    var dstPathThumbnail = 'pics/' + file.filename + '_thumbnail.jpg';
    var thumbnailInfo;

    im.resize({
        srcPath: file.path,
        dstPath: '../' + dstPath,
        width: 1000
    });

    im.resize({
        srcPath: file.path,
        dstPath: '../' + dstPathThumbnail,
        width: 200
    }, function() {
        im.identify('../' + dstPathThumbnail, function(err, features) {
            if(err) {
                console.log(err);
            }

            cb && cb({
                path: dstPath,
                thumbnail: {
                    path: dstPathThumbnail,
                    width: features.width,
                    height: features.height
                }
            });
        });
    });
};


exports.covertVideo = function(file, cb) {
    var input = file.path;
    var videoOutput = 'videos/' + file.filename + '.mp4';
    var thumbnailOutput = 'videos/' + file.filename + '_thumbnail.jpg';

    var cmdVideo = "ffmpeg -i " + input + " -vcodec copy -acodec copy ../" + videoOutput;
    process.exec(cmdVideo, function(err, stdout, stderr) {
        
    });

    var cmdThumbnail = "ffmpeg -i " + input + " -vframes 1 -filter:v scale=\"200:-1\" ../" + thumbnailOutput;
    process.exec(cmdThumbnail, function(err, stdout, stderr) {
        im.identify('../' + thumbnailOutput, function(err, features) {
            if(err) {
                console.log(err);
            }
            console.log(features);
            cb && cb({
                path: videoOutput,
                thumbnail: {
                    path: thumbnailOutput,
                    width: features.width,
                    height: features.height
                }
            });
        });
    });
}