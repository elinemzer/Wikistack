var express = require('express');
var router = express.Router();
module.exports = router;

var wikiRoutes = require('./wiki');
var userRoutes = require('./user');

router.use('/wiki', wikiRoutes);
router.use('/user', userRoutes);

router.get('/', function (req, res, next){
  res.render('index');
});
