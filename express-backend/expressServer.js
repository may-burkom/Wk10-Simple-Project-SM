const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');

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

mongoose.connect('mongodb+srv://nUser_201020:KAYpgL20yI23MP3X@smbootcamp2020.dw1al.gcp.mongodb.net/Wk10_Simple_Project?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true},
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

//added two users to populate database
// app.get('/add-users', function(req, res) {
//     Users.insertMany(data.users)
//         .then(function(users) {
//         console.log(users)
//         res.send(users)
//     })
//     .catch(function(err) {
//         console.log(err)
//         res.send(err)
//     });
// })

app.listen(port, function() {
    console.log(`Example app listening at http://localhost:${port}`)
  });