var express = require('express');
var app = express();

let mongoose = require('mongoose');
mongoose.connect("mongodb://admin:node123456@ds157762.mlab.com:57762/nodejs-course", { useNewUrlParser: true });

let ToDo = require("./src/models/todo");

let todoController = require("../helpers/mongoose")(ToDo);
const asyncMiddleware = require("../utils/asyncMiddleware");

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

app.put('/todo/:id', asyncMiddleware(async(req, res) => {
    let todo = await todoController.findOne({_id: req.params.id});
    console.log(todo);

    todo.is_complete = req.body.is_complete;
    todo.completed_at = new Date();

    let updatedTodo = await todoController.update(todo);
    console.log("updatedTodo", updatedTodo);

    res.json({ success: true, message: "Successo!!!" });
}));

app.listen(5000, function () {
  console.log('Example app listening on port 5000!');
});

app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	
	res.json({
	  success: false,
	  message: err.message,
	  error: err
	});
});

module.exports = app;