var express = require('express');
var app = express();
var cors = require('cors')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')

var fs = require('fs')
var _ = require('lodash')
var engines = require('consolidate')
var todos = require('./update.json')
var bodyParser = require('body-parser');

const Todo = require('./db').Todo;  //model type er object
const User = require('./db').User;
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
app.use(cors());
app.use(express.json());
//app.use('/profilepics', express.static('images'))

app.post('/users/', (req,res)=>{
	console.log(req.body)
	//console.log(user)
	users.push(req.body);
	res.status(201).send()
})//

app.get('/users/todos/', authenticateToken, (req,res)=>{
	res.json(todos.filter(todo => todo.userId === req.user.userId))
})

app.post('/users/login/', (req,res)=>{
	// console.log("running")
	// const user = users.find(user => user.username === req.body.username)
	// if (user == null){
	// 	return res.status(400).send('Cannot find user')
	// }
	// else{
	// 	if (user.password == req.body.password){
	// 		//res.sendFile(path.join(__dirname, './todos', 'index.html'));
	// 		console.log(__dirname)
	// 		res.sendFile(__dirname + '/todos/index.html'); 
	// 		res.status(201).send()
	// 	}
	// 	else{
	// 		console.log("OH NO :(")
	// 		res.status(500).send()
	// 	}
	// }
	const userId = req.body.userId
	const user = {userId: userId}
	const accesstoken = jwt.sign(user, "KEYTOTHECHEST")
	res.json({accesstoken: accesstoken})
})

function authenticateToken(req,res,next){
	const authheader = req.headers['authorization']
	const token = authheader && authheader.split(' ')[1]
	if (token==null) return res.sendStatus(401)
	jwt.verify(token, "KEYTOTHECHEST", (err,user)=>{
		if (err) return res.sendStatus(403)
		req.user=user
		next()
	})
}

app.post('/todos/', (req,res)=>{
	// var newtodo = req.body;
	// console.log(newtodo)
	// newtodo["id"]=todos.length+1
	// todos.push(newtodo);
	// const jsonstring = JSON.stringify(todos)
	// fs.writeFile('./update.json', jsonstring, err=>{
	// 	if(err){
	// 		console.log("ERROR")
	// 	}
	// 	else{
	// 		console.log("SUCCESS")
	// 	}
	// })
	// //console.log(todos[newtodo.id]);
	// //JSON.stringify(newtodo, null, 4)
	// res.json(newtodo);
	//var dir = req.params.dir;

	Todo.find({} , (error , todos) => {
		let id=0;
		for(let i=0; i<todos.length; ++i){
			console.log(todos[i].id)
			id = (todos[i].id>id)?todos[i].id:id
		}
		id++;
		data = {
				//"userId": 0,
				"id": id,
				//"title": "",
				"completed": false
		};
		Object.assign(data , req.body);
		//data.id = id + 1;
		// console.log(data);
		Todo.create(data , (error , new_todo) => {
			console.log(new_todo);
			res.json(new_todo);
		})
	})
})

// app.get('/:dir/', (req,res,next)=>{
// 	res.sendFile('C:/Users/admin/Desktop/Itobuz_Internship/async/todos/index.html')
// })

// app.get('/todos/', (req,res)=>{
// 	res.json(todos);
// 	//res.send(JSON.stringify(todos,null,4));
// 	//res.render('index', {todos: todos})
// })

app.get('/todos/', (req,res)=>{
	try{
		Todo.find({},(error, todos)=>{
			//console.log(todos);
			res.json(todos);
		})
	}
	catch(e){
		res.sendStatus(404);
	}
})

app.get('/todos/:id', (req,res)=>{
	// var id = req.params.id
	// var unitodo = todos.find((todo)=>{
	// 	if(todo!=null && todo.id==id){
	// 		return todo;
	// 	}
	// })
	// // var unitodo;
	// // for(var i=0; i<todos.length; ++i){
	// // 	if(todos[i]["id"]==id){
	// // 		unitodo=todos[i]
	// // 	}
	// // }
	// //console.log(unitodo);
	// if(unitodo){
	// 	console.log("Todo details: \n" + JSON.stringify(unitodo, null, 4))
	// 	res.json(unitodo)
	// }
	// else{
	// 	console.log("--->Todo doesn't exist")
	// 	res.send("Todo doesn't exist")
	// }
	var id = req.params.id
	try{
		Todo.findOne({id: id},(error, todo)=>{
			//console.log(todos);
			res.json(todo);
		})
	}
	catch(e){
		res.sendStatus(404);
	}
})

app.put('/todos/:id', bodyParser.json(), (req,res)=>{
	//console.log(req.body)
	// var id = req.params.id
	// var updatetodo = req.body
	// console.log(id)
	// console.log(updatetodo)
	// var index;
	// //console.log(todos.length)
	// for(var i=0; i<todos.length; ++i){
	// 	if(todos[i]!=null && todos[i]["id"]==id){
	// 		index=i
	// 		updatetodo["id"]=todos[i]["id"]
	// 		updatetodo["title"]=todos[i]["title"]
	// 		updatetodo["userId"]=todos[i]["userId"]
	// 		break
	// 	}
	// }
	// //console.log(todos[11]["id"])
	// //console.log(updatetodo)
	// //console.log(index)
	// console.log(undefined==0)
	// if(index==undefined){
	// 	console.log("--->Update failed")
	// 	res.send("Todo doesn't exist")
	// }
	// else{
	// 	todos[index]=updatetodo;
	// 	const jsonstring = JSON.stringify(todos)
	// 	fs.writeFile('./update.json', jsonstring, err=>{
	// 		if(err){
	// 			console.log("ERROR")
	// 		}
	// 		else{
	// 			console.log("SUCCESS")
	// 		}
	// 	})
	// 	console.log("--->Update Successful. Todo details: \n" + JSON.stringify(updatetodo, null, 4))
	// 	res.send(JSON.stringify(updatetodo,null,4))
	// }
	var id = req.params.id
	try{
		Todo.find({id: id},(error, todos)=>{
			//console.log(todos);
			let todo = todos[0]

			Object.assign(todo, req.body);
			Todo.findOneAndUpdate({id: id} , todo , () => {});
            res.json(todo);
    	});
	}
	catch(e){
		res.sendStatus(404);
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
