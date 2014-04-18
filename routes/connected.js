var gres;
var Twit = require('twit');
var T;
var allMovies;
exports.view = function(res) {
    //res.render('connected');
    gres = res;
    
    T = new Twit({
    consumer_key: 'zLCZBXwMQA4o3CwTigDnTr4Bj'
  , consumer_secret: 'QAv4ztXOLSZVkYOeq6m3cj4w933Af4BlbvLkabc0wKlTIovOWq' 
  , access_token: '65550821-hdhrNIaX1KDRpMMzVQvTo97wTpgsX5YRZTH3rgttG' 
  , access_token_secret: 'wLPzzLpJe6BWyFQDk9QDfOPancDr6GwCf7lGnmii8M7pZ' 
});
    //var jumbotron = this.getElementById("jumbotron");
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
        }
            findMovies(allFriends);
           // console.log(allFriends.length);

        });
              
}

function strcmp(a, b) {
    a = a.toString(), b = b.toString();
    for (var i=0,n=Math.max(a.length, b.length); i<n && a.charAt(i) === b.charAt(i); ++i);
    if (i === n) return 0;
    return a.charAt(i) > b.charAt(i) ? -1 : 1;
}

var x = 0; //keeps track of how many friends were already checked
function findMovies(friends) {
    x = friends.length;
    for (var i = 0; i < friends.length; i++) {
        var currID = friends[i];
        //console.log(currID);
        graph.get("/" + currID + "/movies", function (err, res) {
            var movies = res.data;
            x--;
            
            for (var j = 0; j < movies.length; j++) {
                allMovies.push(movies[j].name);
            }
            
            if (x == 0)  //to make sure it's only executed once
                findtop(allMovies);
            //console.log("here");
        }); //end get movies
    }
} //end findmovies
var movieMap;
function findtop(movies) {
    movieMap = {};
    movies.sort(strcmp);
    //console.log("length = " + movies.length);
    for (var k = 0; k < movies.length; k++) {
        if (movieMap[movies[k]] > 0) 
            movieMap[movies[k]]++;
        else 
            movieMap[movies[k]] = 1;
        
    }
    var sortable = [];

    for (movie in movieMap) {
      sortable.push([movie, movieMap[movie]]) 
    }
    
    sortable.sort(function(a, b) {return a[1] - b[1]})
    
    doneSorting(sortable);
   // console.log(sortable);   
}

function doneSorting(movies) {
    movies.reverse();
    
    
    var result = {list: []};
    var x = 25;
    for (var i = 0; i < x; i++) { //convert to JSON
        var curr = movies[i];
         
        T.get('search/tweets', { q: '"#' + curr[0] + '"' + ' since:2014-04-18', count: 100 }, function(err, reply) {
        if (err) {
        console.log(err);
    } else {
        x--;

        console.log(reply);
        console.log(reply.statuses.length);    
        result.list.push({"title": curr[0], "likes": curr[1], "tweets": reply.statuses.length});
        if (x == 0) gres.render('connected', result);
    }
        });//end get
        //console.log(curr[0]);
    }
    //var result = {'title': 'Harry Potter', 'likes': '41'};

    //document.getElementById("loading").hide();
}