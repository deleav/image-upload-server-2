var express = require('express');
var router = express.Router();
var multer = require('multer');
var request = require('request');
var fs = require('fs');
var streamifier = require('streamifier');
var FormData = require('form-data');
var multiparty = require('multiparty');

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public/uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '.jpg');
//   }
// })

var storage = multer.memoryStorage();

var upload = multer({ storage: storage });
// var upload = multer();

router.get('/', function( req, res, next ) {
  res.render('upload', { title: 'Pictures' });
});

router.post('/upload', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,authorization');
  // console.log( req.file, req.body );
  // console.log( fs.createReadStream('/Users/deleav/Downloads/7654767.jpeg') );
  var imgStream = fs.createReadStream( '/Users/deleav/Downloads/7654767.jpeg' );
  var form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {
    console.log( fields );
    console.log( files.avatar[0].path );
    request.post({url: 'http://localhost:7000/pictures/upload', formData: {
      name: fields.name[0],
      avatar: fs.createReadStream( files.avatar[0].path )
    }}, function( error, response, body ) {
      // console.log(error);
      // console.log(response);
      // console.log(body);
    });
    // console.log( req.body );
    res.send({
      fields,
      files
    });
  });

  // for (var pair of req.body.entries()) {
  //     console.log(pair[0]+ ', ' + pair[1]);
  // }
  // console.log( req.body );
  // res.render('upload', { title: 'Pictures' });
})


module.exports = router;