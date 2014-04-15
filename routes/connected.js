exports.view = function(req, res) {
	res.render('connected');
    console.log("hi" + global.graph.getAccessToken());
    
    
    graph.get("/me/feed", function(err, res) {
        console.log(res); // { picture: 'http://profile.ak.fbcdn.net/'... }
    });
}