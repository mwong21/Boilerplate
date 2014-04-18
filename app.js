//dependencies for each module used
var express = require('express');
var http = require('http');
var path = require('path');
var graph = require('fbgraph');
var handlebars = require('express3-handlebars');
var app = express();


//route files to load
var index = require('./routes/index');
//var connect = require('./routes/connect');
var twitter = require('./routes/twitter');
var connected = require('./routes/connected');
var Twit = require('twit');

global.graph = graph;

//database setup - uncomment to set up your database
//var mongoose = require('mongoose');
//mongoose.connect(process.env.MONGOHQ_URL || 'mongodb://localhost/DATABASE1');

//Configures the Template engine
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());

var T = new Twit({
    consumer_key: 'zLCZBXwMQA4o3CwTigDnTr4Bj'
  , consumer_secret: 'QAv4ztXOLSZVkYOeq6m3cj4w933Af4BlbvLkabc0wKlTIovOWq' 
  , access_token: '65550821-hdhrNIaX1KDRpMMzVQvTo97wTpgsX5YRZTH3rgttG' 
  , access_token_secret: 'wLPzzLpJe6BWyFQDk9QDfOPancDr6GwCf7lGnmii8M7pZ' 
});

var conf = {
    client_id:      '227774884083477'
  , client_secret:  'ac125834434e415cbf1585e56a42e401'
  , scope:          'email, read_stream, user_status, friends_likes, user_interests, friends_interests, user_actions.video, user_likes'
  , redirect_uri:   'http://young-fjord-1191.herokuapp.com/connect'
};
console.log("this happened");

//routes
app.get('/', index.view);
app.get('/connect', function(req, res) {

  // we don't have a code yet
  // so we'll redirect to the oauth dialog
  if (!req.query.code) {
    var authUrl = graph.getOauthUrl({
        "client_id":     conf.client_id
      , "redirect_uri":  conf.redirect_uri
      , "scope":         conf.scope
    });

    if (!req.query.error) { //checks whether a user denied the app facebook login/permissions
        res.redirect(authUrl);
    } else {  //req.query.error == 'access_denied'
      res.send('access denied');
    }
    return;
  }
  // code is set
  // we'll send that and get the access token
  graph.authorize({
      "client_id":      conf.client_id
    , "redirect_uri":   conf.redirect_uri
    , "client_secret":  conf.client_secret
    , "code":           req.query.code
  }, function (err, facebookRes) {
      console.log("hi " + graph.getAccessToken() + "!!!");

    res.redirect('/connected');
  });


});
console.log(graph.getAccessToken());
app.get('/connected', function(req, res) {
    //res.render('connected');
    connected.view(res);
});

app.get('/twitter', function(req, res) {
    //twitter authentication goes here...
    res.redirect('/connected'); 
    
});
app.post('/movies', function(req, res) {
    
});
//set environment ports and start application
app.set('port', process.env.PORT || 3000);
http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});