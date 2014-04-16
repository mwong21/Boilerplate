var allMovies;
exports.view = function(req, res) {
	res.render('connected');
    //console.log("hi" + global.graph.getAccessToken());
   
    //var friends = new Array();
    graph.get("/me/movies", function (err, res) {
                
                //var movies = res.data;
                //var numMovies = movies.length;
                //console.log(res);
                /*
                for (var j = 0; j < numMovies; j++) {
                    console.log("hi");
                }*/
    });
    allMovies= new Array();// [""];
    var currMovie = 1;
            var i;
    var allFriends = new Array();

    graph.get("/me/friends", function(err, res) {
        //console.log(res);
        var friends = res.data;
        var numFriends = friends.length;
        //console.log(res);
        for (i = 0; i < numFriends; i++) {
            //console.log("#" + i + ": " + friends[i].name);
            var currID = friends[i].id;
            allFriends.push(currID);

            //console.log("getting movie for " + currID);
            graph.get("/" + currID + "/movies", function (err2, mres) {
                console.log(i);

                var movies = mres.data;
                var numMovies = movies.length;
               //console.log(movies);
                
                for (var j = 0; j < numMovies; j++) {
                    var temp = movies[j].name.toString();
                    allMovies.push(temp);
                    //console.log(allMovies.pop());
                    //console.log(movies[j]);
                }
                
                //function(a, b) {
                //    return a.localeCompare(b);
                //});
                //console.log(i);
                
                /*
                if (i === numFriends) {
                    
                allMovies.sort(strcmp);
                    console.log("length = " + allMovies.length);
                    for (var k = 0; k < allMovies.length; k++) 
                        console.log(allMovies[k]);
                }*/
                
                
            });
                            //console.log("int length = " + allMovies.length);

        }

                
   
        //friends = res;
    });

    console.log("done");
    findtop(allMovies);

    //console.log(friends);
}

function strcmp(a, b) {
    a = a.toString(), b = b.toString();
    for (var i=0,n=Math.max(a.length, b.length); i<n && a.charAt(i) === b.charAt(i); ++i);
    if (i === n) return 0;
    return a.charAt(i) > b.charAt(i) ? -1 : 1;
}

function findtop(movies) {
    movies.sort(strcmp);
                    console.log("length = " + movies.length);
                    for (var k = 0; k < movies.length; k++) 
                        console.log(movies[k]);
}