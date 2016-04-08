var im = require('imagemagick');

exports.covert = function(file, cb) {
    im.resize({
        srcPath: file.path,
        dstPath: './pics/' + file.filename + '.jpg',
        width: 1000
    }, function(err, stdout, stderr) {
        if (err) throw err;
        cb && cb();
    });
}