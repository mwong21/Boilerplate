exports.view = function(req, res) {
	res.render('connected');
    console.log("hi" + global.graph.getAccessToken());
   
    var friends;
    
    graph.get("/me/friends", function(err, res) {
        console.log(res);
        //friends = res;
    });
    
    //console.log(friends);
}