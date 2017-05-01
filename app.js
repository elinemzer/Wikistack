const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const morgan = require('morgan');
const routes = require('./routes')

const models = require('./models')


app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache: true});


app.use(morgan('combined'));
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', routes);


// models.user.sync()
// .then(function(){
  //return models.page.sync()
// })
models.db.sync()
.then(function(){
  app.listen(1337, function(){
    console.log('Im listening')
  })
})
.catch(console.error);
