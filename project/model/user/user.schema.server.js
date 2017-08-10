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
    // following: [{type: mongoose.Schema.Types.ObjectId, ref:'FollowModel'}],
    // followers: [{type: mongoose.Schema.Types.ObjectId, ref:'FollowModel'}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "user"});

module.exports = userSchema;