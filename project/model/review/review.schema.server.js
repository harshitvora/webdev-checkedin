/**
 * Created by harsh on 8/13/2017.
 */

var mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({
    title: String,
    text: String,
    reply: String,
    rating: String,
    _user: {type: mongoose.Schema.Types.ObjectId,  ref: 'UserModel'},
    _venue: {type: mongoose.Schema.Types.ObjectId, ref:'VenueModel'},
    venueName: String,
    dateCreated: {type: Date, default: Date.now}
}, {collection: "review"});

module.exports = reviewSchema;