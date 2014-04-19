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



var conf = {
    client_id:      '484197295013302'
  , client_secret:  '3b6dea2d1ecf2e4a101039a280f6d1ad'
  , scope:          'email, read_stream, user_status, friends_likes, user_interests, friends_interests, user_actions.video, user_likes'
  , redirect_uri:   'http://www.contempo.herokuapp.com/connect'
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