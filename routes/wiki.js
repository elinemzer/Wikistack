var express = require('express');
var router = express.Router();
module.exports = router;

var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function(req, res, next){
  res.redirect('/');
});

router.get('/add', function(req, res, next){
  res.render('addpage')
});

router.get('/:url', function(req, res, next){
  Page.findOne({
    where: {
      urlTitle: req.params.url
    }
  })
  .then(function(foundPage){
    res.render('wikipage', {page: foundPage});
  })
  .catch(next);
});

router.post('/', function(req, res, next){
  User.findOrCreate({
    where: {
      name: req.body.authorName,
      email: req.body.authorEmail
    }
  })
  .then(function(values){
    var user = values[0];
    var page = Page.build({
      title: req.body.title,
      content: req.body.content
    });
    return page.save()
    .then(function(page){
      return page.setAuthor(user)
    });
  })
  .then(function(savedPage){
    res.redirect(savedPage.route);
  })
  .catch(next);
});
