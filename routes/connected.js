exports.view = function(req, res) {
	res.render('connected');
    console.log("hi" + global.graph.getAccessToken());
   
    //var friends = new Array();
    graph.get("/me/movies", function (err, res) {
                
                //var movies = res.data;
                //var numMovies = movies.length;
                console.log(res);
                /*
                for (var j = 0; j < numMovies; j++) {
                    console.log("hi");
                }*/
    });
    
    graph.get("/me/friends", function(err, res) {
        //console.log(res);
        var friends = res.data;
        var numFriends = friends.length;
        console.log(res);
        for (var i = 0; i < numFriends; i++) {
            console.log("#" + i + ": " + friends[i].name);
            var currID = friends[i].id;
            //console.log("getting movie for " + currID);
            graph.get("/" + currID + "/movies", function (err2, mres) {
                
                var movies = mres.data;
                var numMovies = movies.length;
                console.log(numMovies);
                /*
                for (var j = 0; j < numMovies; j++) {
                    console.log("hi");
                }*/
            });
        }
        
        
        //friends = res;
    });
    
    //console.log(friends);
}