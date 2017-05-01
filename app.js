const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const morgan = require('morgan');

const models = require('./models')


app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache: true});


app.use(morgan);
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res, next){
  res.sendFile('index.html');
  next()
})

// models.user.sync()
// .then(function(){
  //return models.page.sync()
// })
models.db.sync({force: true})
.then(function(){
  app.listen(1337, function(){
    console.log('Im listening')
  })
})
.catch(console.error);
