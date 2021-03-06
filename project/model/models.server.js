/**
 * Created by harsh on 8/3/2017.
 */

var q = require('q');

var connectionString = 'mongodb://127.0.0.1:27017/checkedin'; // for local
if(process.env.MLAB_USERNAME) { // check if running remotely
    var username = process.env.MLAB_USERNAME; // get from environment
    var password = process.env.MLAB_PASSWORD;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds139619.mlab.com:39619/heroku_rmg52nng'; // user yours
}

var mongoose = require("mongoose");
var db = mongoose.connect(connectionString, {useMongoClient: true});
mongoose.Promise = q.Promise;

module.exports = db;
