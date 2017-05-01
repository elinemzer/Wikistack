var express = require('express');
var router = express.Router();
module.exports = router;

router.get('/', function(req, res, next){
  res.send(200, 'get wiki success!!')
});

router.get('/add', function(req, res, next){
  res.render('addpage')
});

router.post('/', function(req, res, next){
  res.send(200, 'post wiki success!!')
});
