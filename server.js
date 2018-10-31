const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear',() => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (error) => {
    if (err)
      console.log(err);
  });
  next();
});


app.use(express.static(__dirname + '/public'));

app.get('/',(req, res) => {
  res.render('home.hbs', {
    welcomeMessage: 'hello world from the server',
    pageTitle: 'Home page',
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page',
  });
});

app.get('/bed',(req, res) => {
  res.send({
    errorMessage: 'Unable to hundle request'
  })
})

app.listen(3000,() => {
  console.log('server is up in port 3000');
});
