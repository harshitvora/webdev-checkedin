/**
 * Created by harsh on 7/26/2017.
 */

var app = require("../../express");
var userModel = require("../model/user/user.model.server");

// http handlers:
app.get("/api/users", getAllUsers);
app.get("/api/user/:userId", findUserById);
app.get("/api/user", findUserByCredentials);
app.post("/api/user", createUser);
app.delete("/api/user/:userId", deleteUser);
app.put("/api/user/:userId", updateUser);

function getAllUsers(req, res) {
    userModel.getAllUsers()
        .then(function (users) {
            res.json(users);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function createUser(req, res) {
    var user = req.body;
    userModel.createUser(user)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function findUserById(req, res) {
    userModel.findUserById(req.params.userId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}


function findUserByCredentials(req, res) {

    var username = req.query.username;
    var password = req.query.password;

    if(username && password){
        userModel.findUserByCredentials(username, password)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
    }
    else if(username){
        userModel.findUserByUsername(username)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
    }
}

function updateUser(req, res) {
    var user = req.body;
    var userId = req.params.userId;
    userModel.updateUser(userId, user)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(404).send(err);
        })
}

function deleteUser(req, res) {
    var userId = req.params.userId;
    userModel.deleteUser(userId)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(404).send(err);
        })
}