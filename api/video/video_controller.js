var ffmpeg = require('fluent-ffmpeg');

exports.covert = function(file, cb) {
    var dstPath = 'videos/' + file.filename + '.mp4';
    var dstPathThumbnail = 'videos/' + file.filename + '_thumbnail.jpg';
    ffmpeg(file.path)
        .output('../' + dstPath);

    return {
        path: dstPath
    };
}