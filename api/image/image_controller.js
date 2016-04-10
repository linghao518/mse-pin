var im = require('imagemagick');

exports.covert = function(file, cb) {
    var dstPath = 'pics/' + file.filename + '.jpg';
    var dstPathThumbnail = 'pics/' + file.filename + '_thumbnail.jpg';
    im.resize({
        srcPath: file.path,
        dstPath: '../' + dstPath,
        width: 1000
    });
    im.resize({
        srcPath: file.path,
        dstPath: '../' + dstPathThumbnail,
        width: 200
    });

    return {
        path: dstPath,
        thumbnail: dstPathThumbnail
    };
}