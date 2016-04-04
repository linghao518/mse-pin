var express = require('express');
var path = require('path')
var multer  = require('multer');
var upload = multer({ storage: storage });

var app = express();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
  }
});

app.use('/', function() {
    var file = upload.single('avatar');
});

app.post('/', function(req, res){
    
  res.send('ok');
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
