var im = require('imagemagick');

exports.covert = function(src, cb) {
    console.log(src);
    im.resize({
        srcPath: src,
        dstPath: './pics/1.jpg',
        width: 1000
    }, function(err, stdout, stderr){
        if (err) throw err;
        cb && cb();
    });
}