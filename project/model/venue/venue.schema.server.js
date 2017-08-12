/**
 * Created by harsh on 8/10/2017.
 */
var mongoose = require('mongoose');

var venueSchema = mongoose.Schema({
    name: String,
    location: String,
    hours: String,
    rating: String
    // email: String,
    // phone: String,
    // pictureUrl: String,
    // following: [{type: mongoose.Schema.Types.ObjectId, ref:'UserModel'}],
    // bookmarks: [{type: mongoose.Schema.Types.ObjectId, ref:'VenueModel'}],
    // dateCreated: {type: Date, default: Date.now}
}, {collection: "venue"});

module.exports = venueSchema;