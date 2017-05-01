var express = require('express');
var router = express.Router();
module.exports = router;

var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function(req, res, next) {
  User.findAll()
  .then(function(foundUsers) {
    res.render('users', {users: foundUsers});
  })
  .catch(next);
});

router.get('/:id', function(req, res, next) {

  var user = User.findById(req.params.id);
  var page = Page.findAll({ where: { authorId: req.params.id }});

  Promise.all([user, page])
  .then(function(userAndPage) {
    res.render('users', {users: [userAndPage[0]], pages: userAndPage[1]});
  })
  .catch(next);
});
