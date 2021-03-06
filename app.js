var express = require('express');
var db = require('./models');
var bodyParser = require('body-parser');
var methodOverride = require("method-override");
var app = express();

//Create ability to make API/http calls:
    request = require('request'),
//In order to track sessions, express-session is required (command-line:npm install --save express-session):
    session = require("express-session"),
    app = express();


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');



// Set the view engine to be "EJS"
app.set('view engine', 'ejs');

// Set up body parser
app.use(bodyParser.urlencoded({extended: true}));

// Set up method override to work with POST requests that have the parameter "_method=DELETE"
app.use(methodOverride('_method'));

//GET REQUESTS//
app.get('/', function(req,res) {
  res.render('index');
});

app.get('/users', function(req,res) {
  db.User.all().then(function(mates){
  	console.log("mates is: ", mates);
    res.render('users', {peers: mates});
  })
});

app.get('/notes', function(req,res) {
  db.Note.all().then(function(nts){
  	console.log("nts is: ",nts);
    res.render('notes', {n: nts});
  })
});

app.get('/users/new', function(req,res) {

  res.render('new');
});

app.post('/users', function(req,res) {
  var name = req.body.first_name;
  var phone = req.body.phone;
  db.User.create({first_name: name, phone: phone})
  	.then(function(mate) {
	res.redirect('/users');
  });
});

// app.listen(process.env.PORT || 3000)

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

