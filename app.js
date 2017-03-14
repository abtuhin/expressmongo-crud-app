var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');

var app = express();

app.use(express.static(__dirname+ '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());

routes = require('./routes/controller')(app);

mongoose.connect('mongodb://localhost/vehicle', function(err, res){
  if(err){
    console.log('error connecting to vehicle database');
  }else{
    console.log('Connected to database vehicle');
  }
});

app.listen(8000);
console.log('Server active on port 8000');
app.get('/test', function(req, res){
  res.send("express, mongoose y node.js");
})
