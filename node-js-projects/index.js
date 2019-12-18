var express = require('express');
var app = express();

var fs = require('fs')
var _ = require('lodash')
var engines = require('consolidate')
var todos = require('./update.json')
const updateJsonFile = require('update-json-file')
//const filepath = './update.json'
var bodyParser = require('body-parser');

//console.log(todos)

//var todos = []

// fs.readFile('todos.json', {encoding: 'utf8'}, function (err, data) {
//   if (err) throw err

//   JSON.parse(data).forEach((todo)=>{
//     todos.push(todo)
//   })
// })



app.engine('hbs', engines.handlebars)
app.set('views', './views')
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
//app.use('/profilepics', express.static('images'))

app.post('/todos/', (req,res)=>{
	var newtodo = req.body;
	todos.push(newtodo);
	const jsonstring = JSON.stringify(todos)
	fs.writeFile('./update.json', jsonstring, err=>{
		if(err){
			console.log("ERROR")
		}
		else{
			console.log("SUCCESS")
		}
	})
	//console.log(todos[newtodo.id]);
	res.send("Post successful:\n"+JSON.stringify(newtodo, null, 4));
})

app.get('/todos/', (req,res)=>{
	res.json(todos);
	//res.send(JSON.stringify(todos,null,4));
	//res.render('index', {todos: todos})
})

app.get('/todos/:id', (req,res)=>{
	var id = req.params.id
	var unitodo = todos.find((todo)=>{
		if(todo!=null && todo.id==id){
			return todo;
		}
	})
	// var unitodo;
	// for(var i=0; i<todos.length; ++i){
	// 	if(todos[i]["id"]==id){
	// 		unitodo=todos[i]
	// 	}
	// }
	//console.log(unitodo);
	if(unitodo){
		console.log("Todo details: \n" + JSON.stringify(unitodo, null, 4))
		res.json(unitodo)
	}
	else{
		console.log("--->Todo doesn't exist")
		res.send("Todo doesn't exist")
	}
})

app.put('/todos/:id', bodyParser.json(), (req,res)=>{
	
	//console.log(req.body)
	var id = req.params.id
	var updatetodo = req.body
	var index;
	//console.log(todos.length)
	for(var i=0; i<todos.length; ++i){
		if(todos[i]!=null && todos[i]["id"]==id){
			index=i
			//console.log(index)
			break
		}
	}
	//console.log(todos[11]["id"])
	//console.log(updatetodo)
	//console.log(index)
	if(!index){
		console.log("--->Update failed")
		res.send("Todo doesn't exist")
	}
	else{
		todos[index]=updatetodo;
		const jsonstring = JSON.stringify(todos)
		fs.writeFile('./update.json', jsonstring, err=>{
			if(err){
				console.log("ERROR")
			}
			else{
				console.log("SUCCESS")
			}
		})
		console.log("--->Update Successful. Todo details: \n" + JSON.stringify(updatetodo, null, 4))

		res.send(JSON.stringify(updatetodo,null,4))
	}
})

app.delete('/todos/:id', (req,res)=>{
	var id = req.params.id
	var index;
	var deletedtodo;
	//console.log(todos.length)
	var afterdelete =[]
	for(var i=0; i<todos.length; ++i){
		if(todos[i]!=null && todos[i]["id"]==id){
			index=i
			deletedtodo = todos[i]
			//console.log(index)
		}
		else{
			afterdelete.push(todos[i])
		}
	}
	console.log(index)
	todos = afterdelete; 
	delete todos[index];
	var jsonstring = JSON.stringify(todos)
	fs.writeFile('./update.json', jsonstring, err=>{
		if(err){
			console.log("ERROR")
		}
		else{
			console.log("SUCCESS")
		}
	})
	res.send("Deleted todo: " + deletedtodo)
})

var server = app.listen(3000, function () {
  	console.log('Server running at http://localhost:' + server.address().port)
})
