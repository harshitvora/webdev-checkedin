/**
 * Created by harsh on 8/2/2017.
 */

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    pictureUrl: String,
    following: [{type: mongoose.Schema.Types.ObjectId, ref:'UserModel'}],
    bookmarks: [{type: mongoose.Schema.Types.ObjectId, ref:'VenueModel'}],
    role: {type:String, enum:['CUSTOMER', 'MANAGER', 'ADMIN']},
    _venue: {type: mongoose.Schema.Types.ObjectId, ref:'VenueModel'},
    google: {id: String,
    token: String},
    dateCreated: {type: Date, default: Date.now}
}, {collection: "user"});

module.exports = userSchema;