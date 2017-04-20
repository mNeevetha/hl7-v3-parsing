var express = require('express')
var path = require('path')
var app = express()

// __dirname will use the current path from where you run this file 
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '/data')));

app.get('/', function (req, res) {
  //res.send('Hello World!');
  //res.sendFile(__dirname,"/index.html");
  res.sendFile(path.join(__dirname, '/', 'index.html'));
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})