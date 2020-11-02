const express = require('express')
const app = express()
const port = 8080
var path = require('path');

app.use(express.static('public'))
app.use(express.static('css'))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/page.html'));
});

app.listen(port, function() {
    console.log(`Example app listening at http://localhost:${port}`)
})