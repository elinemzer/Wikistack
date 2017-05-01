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

router.get('/search', function(req, res, next) {
  console.log('hello');
  console.log(req.query.tag);
  Page.findByTag(req.query.tag)
  .then(function(pagesWithTag) {
    res.render('tags', {pages: pagesWithTag});
  });
});

router.get('/:url', function(req, res, next){
  Page.findOne({
    where: {
      urlTitle: req.params.url
    },
    include: [ {model: User, as: 'author'} ]
  })
  .then(function(foundPage){
    if (foundPage === null) {
      res.status(404).send();
    } else {
      const pageTags = foundPage.tags.join(", ");
      res.render('wikipage', {page: foundPage, tags: pageTags});
    }
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
      content: req.body.content,
      tags: req.body.tags.split(" ")
    });
    return page.save()
    .then(function(page){
      return page.setAuthor(user);
    });
  })
  .then(function(savedPage){
    res.redirect(savedPage.route);
  })
  .catch(next);
});
