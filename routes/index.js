var express = require('express');
var router = express.Router();
module.exports = router;

var wikiRoutes = require('./wiki');
var userRoutes = require('./user');

var models = require('../models');
var Page = models.Page;
var User = models.User;

Page.belongsTo(User, { as: 'author' });

router.use('/wiki', wikiRoutes);
router.use('/users', userRoutes);

router.get('/', function (req, res, next){
  Page.findAll({})
  .then(function(foundPages){
    res.render('index', {pages: foundPages});
  })
  .catch(next);
});

router.get('/search', function(req, res, next){
  res.render('search', {});
});