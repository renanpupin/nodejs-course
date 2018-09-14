var express = require('express');
var app = express();

let mongoose = require('mongoose');
mongoose.connect("mongodb://admin:node123456@ds157762.mlab.com:57762/nodejs-course", { useNewUrlParser: true });

let ToDo = require("./src/models/todo");

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/todo', function (req, res) {
  ToDo
  	.find()
  	.exec((err, todos) => {
  		if(!err){
  			res.json({success: true, message: "ToDos buscados com sucesso.", todos });
  		}else{
  			res.json({success: false, message: err.message, todos: [] });
  		}
  	})
});

app.listen(5000, function () {
  console.log('Example app listening on port 5000!');
});


module.exports = app;