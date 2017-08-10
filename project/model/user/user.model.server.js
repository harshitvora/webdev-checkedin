/**
 * Created by harsh on 8/2/2017.
 */

var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var db = require("../models.server");

var userModel = mongoose.model("UserModel", userSchema);
userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.getAllUsers = getAllUsers;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
// userModel.addWebsite = addWebsite;
// userModel.removeWebsite = removeWebsite;
module.exports = userModel;

function createUser(user) {
    return userModel.create(user);
}

function findUserById(id) {
    return userModel.findById(id)
        .populate('websites')
        .exec();
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function getAllUsers() {
    return userModel.find();
}

function updateUser(userId, newUser) {
    return userModel.update({_id: userId}, {$set: newUser});
}

function deleteUser(userId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.websites;
            console.log(index);
            return userModel.remove({_id: userId});
        });
}



// function addWebsite(userId, websiteId) {
//     return userModel
//         .findById(userId)
//         .then(function (user) {
//             user.websites.push(websiteId);
//             return user.save();
//         })
// }
//
// function removeWebsite(userId, websiteId) {
//     return userModel
//         .findById(userId)
//         .then(function (user) {
//             var index = user.websites.indexOf(websiteId);
//             user.websites.splice(index, 1);
//             return user.save();
//         })
// }
