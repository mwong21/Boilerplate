exports.view = function(req, res) {
	res.render('connected');
    console.log(global.graph);
    
    var searchOptions = {
    q:     "Fbgraph."
  , type:  "post"
};

global.graph.search(searchOptions, function(err, res) {
  console.log(res); // {data: [{id: xxx, from: ...}, {id: xxx, from: ...}]}
});
}