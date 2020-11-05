const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const mongoAccess = require('./hide/mongoCredentials.js')

const data = require('./data.js');
const Users = require('./models/Users.js');
const { get } = require('http');

const app = express();
const port = 3000;
const upload = multer();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(upload.array());
app.use(express.json());

const grantAccess = mongoAccess.MONGODB_URI

mongoose.connect(grantAccess, {useNewUrlParser: true, useUnifiedTopology: true},
    function(err, database){
        if (err){
            throw err;
        }
        console.log("Connection made to database")
    }
); 

app.get('/display-users', function(req, res){
    console.log("display-users route")
    Users.find({})
        .then(function(users) {
        console.log(users)
        res.send(users)
    })
    .catch(function(err) {
        console.log(err)
        res.send(err)
    })
})

app.post('/login', function(req, res) {
    console.log("LOGIN route hit")
    console.log(req.body)
    let userFName = req.body.loginFName
    console.log(userFName)
    Users.find({fullName: userFName})
        .then(function(user) {
            console.log("This should be the user:")
            console.log(user)
            res.send(user)
        })
        .catch(function(err) {
            console.log(err)
            res.send(err)
        })
});

app.patch('/users/:id', function(req, res) {
    console.log("HITTING the UPDATE route")
    console.log(req.body)
    console.log(req.params)
    console.log(req.params.id)
    Users.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify: false})
        .then(function(user) {
            console.log(user)
            res.send(user)
        })
        .catch(function(err){
            console.log(err)
            res.send(err)
        })
})

app.post('/sign-up', function(req, res) {
    console.log("SIGN UP route hit")
    console.log(req.body)

    let userObject = {
        fullName: req.body.userFullName,
        age: req.body.userAge,
        password: req.body.userPswrd,
        visits: 1
    }

    userToAdd = new Users(userObject)

    userToAdd.save()
        .then(function(user) {
            console.log("ITEM SAVED!")
            console.log(user)
            res.send(user)
        })
        .catch(function(err) {
            console.log(err)
        })
});

//added two users to populate database
app.get('/add-users', function(req, res) {
    Users.insertMany(data.users)
        .then(function(users) {      
        console.log(users)
        res.send(users)
    })
    .catch(function(err) {
        console.log(err)
        res.send(err)
    });
})

app.listen(port, function() {
    console.log(`Example app listening at http://localhost:${port}`)
  });