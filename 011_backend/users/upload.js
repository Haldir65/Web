var express = require('express')
var fs = require('fs')
var multiparty = require('multiparty')
var path = require('path');
var http = require('http')
var router = express.Router()
var uuid = require('node-uuid').v4


var config = {
    uploadDir : path.join(__dirname,"../..",upload),
    Authorization: {
        api: 'http://localhost:9679/user/',
        headerName: 'Authorization'
      },
  downDomain: 'http://localhost:9679/file/',
}

router.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers['origin'])
  res.header("Access-Control-Allow-Credentials", true)
  res.header("Access-Control-Allow-Headers", req.headers['access-control-request-headers'])
  res.header("Access-Control-Allow-Methods",req.headers['access-control-request-method'])
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8")
  next()
})

router.get('/file/:file', function(req, res) {
  var filename = req.params.file
  var filepath = config.uploadDir + filename
  res.header("Content-Type", "image/png")
  res.sendFile(config.uploadDir + filename)
})

function validToken(req) {
  if (config.Authorization) {
    return new Promise(function(resolve, reject) {
      var api = config.Authorization.api + req.header(config.Authorization.headerName)
      http.get(api, response => {
        if (response.statusCode === 200) {
          resolve()
        }
      }).on('error', (e) => {
        reject(e)
      })
    });
  }
  return Promise.resolve()
}

router.post('/upload', function (req, res){
    validToken(req).then(() => {
      var form = new multiparty.Form({uploadDir: config.uploadDir});
      form.on('error', function(err) {
        console.log('Error parsing form: ' + err.stack)
        res.send({success: false, msg: err.toString()})
      });
      form.parse(req, function (err, fields, files){
        if (err){
          res.send({success: false, msg: err.toString()})
        } else {
          var fileDataArr = files['file']
          console.log('file-upload-request', fileDataArr)
          if (fileDataArr) {
            var fileData = fileDataArr[0]
            var oldName = fileData.path
            var suffix = oldName.substr(oldName.lastIndexOf('.')) || '.png'
            var newName = uuid() + suffix
            fs.rename(oldName, config.uploadDir + newName)
            res.send(config.downDomain + newName)
          } else {
            console.log('file-upload-faild')
            res.sendStatus(500, fileDataArr)
          }
        }
      })
    }).catch(() => {
      res.sendStatus(403)
    })
})

module.exports = router;