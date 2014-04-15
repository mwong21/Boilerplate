//load environment variables
var dotenv = require('dotenv');
dotenv.load();

//add facebook api setup
var fb = require('fbgraph');
fb.set('client_id', process.env.fb_client_id);
fb.set('client_secret', process.env.fb_client_secret);

//export fb as a parameter to be used by other methods that require it.
exports.fb = fb;


/**
* Add your authentication apis here with example like the bottom
*/
/**
//add instagram api setup
var ig = require('instagram-node-lib');
ig.set('client_id', process.env.instagram_client_id);
ig.set('client_secret', process.env.instagram_client_secret);

//export ig as a parameter to be used by other methods that require it.
exports.ig = ig;
**/