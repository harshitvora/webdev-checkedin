/**
 * Created by harsh on 7/26/2017.
 */

var app = require("../../express");
var userModel = require("../model/user/user.model.server");
var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/uploads' });

// http handlers:
app.get("/api/users", getAllUsers);
app.get("/api/user/:userId", findUserById);
app.get("/api/user", findUserByCredentials);
app.post("/api/user", createUser);
app.delete("/api/user/:userId", deleteUser);
app.put("/api/user/:userId", updateUser);
app.post ("/api/upload", upload.single('myFile'), uploadImage);

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

function uploadImage(req, res) {

    var myFile        = req.file;
    var userId = req.body.userId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    var user = null;
    userModel.findUserById(userId)
        .then(function (response) {
            user = response;
            user.pictureUrl = '/uploads/'+filename;
            userModel.updateUser(userId, user)
                .then(function (widget) {
                    console.log(widget);
                });
        });

    var callbackUrl = "/#!/user/"+userId+"/edit";

    res.redirect(callbackUrl);
}
