var gulp = require('gulp'),
    del = require('del'),
    path = require('path'),
    url = require('url'),
    connect = require('gulp-connect'),
    open = require('gulp-open'),
    proxy = require('proxy-middleware');

var appConfig = {
    node: 'node_modules',
    app: 'app'
};

// 启动web服务器
// -------------------------------
var proxyOptions = url.parse('http://localhost:3000');
    proxyOptions.route = '/api';

gulp.task('connect:dev', function() {
    connect.server({
        root: [appConfig.app],
        port: 3002,
        livereload: true,
        middleware: function(connect, opt) {
            return [
                proxy(proxyOptions),
                connect().use(
                    '/pics',
                    connect.static('./pics')
                ),
                connect().use(
                    '/videos',
                    connect.static('./videos')
                )
            ]
        }
    });
});


// 打开浏览器
// -------------------------------
gulp.task('open', function() {
    return gulp.src(__filename).pipe(open({
        uri: 'http://localhost:3002'
    }));
});


// 运行开发环境
// -------------------------------
gulp.task('default', ['connect:dev', 'open'], function() {
    console.log('Started App!');
});