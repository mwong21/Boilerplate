exports.view = function(req, res) {
	res.render('index');
}

exports.authenticate = function(req, res) {
    console.log("hi");
    console.log(exports.fb);
    
    
    // get authorization url
    var authUrl = exports.graph.getOauthUrl({
        "client_id":     '227774884083477'
      , "redirect_uri":  'http://localhost:3000/connect'
    });

    // shows dialog
    res.redirect(authUrl);

    // after user click, auth `code` will be set
    // we'll send that and get the access token
    exports.graph.authorize({
        "client_id":      '227774884083477'
      , "redirect_uri":   'http://localhost:3000/connect'
      , "client_secret":  'ac125834434e415cbf1585e56a42e401'
      , "code":           req.query.code
    }, function (err, facebookRes) {
      res.redirect('/connect');
    });
    
    
    
    
    
    
    
    
    
    
}





