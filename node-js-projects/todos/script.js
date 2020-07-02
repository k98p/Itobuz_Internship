//var index;
fetch('http://localhost:3000/todos')
	.then(response => response.json())
	.then(res => {
		//console.log(res);
		index = res.length;
		var todos = ''; 
		todos = document.getElementById("listdiv");
		res.forEach((todo)=>{
			todos.innerHTML = `<label class="container border border-primary mx-auto py-2 rounded-pill" id="label_${todo.id}" for="checkbox_${todo.id}">
						<input type='checkbox' id="checkbox_${todo.id}" name="checkbox_${todo.id}" onclick='check_func("${todo.id}")'>
							<span id="text_${todo.id}">${todo.title}</span>
						</input>
					</label><br>` + todos.innerHTML
			//console.log(typeof todo["completed"])
			if(todo["completed"]==true){
				//console.log("COMPLETED")
				//console.log(todo)
				document.getElementById(`text_${todo.id}`).setAttribute("style" , "text-decoration: line-through;");
				document.getElementById(`label_${todo.id}`).setAttribute("style", "border-color: #28a745 !important;")
				document.getElementById(`checkbox_${todo.id}`).checked = true;
			}
			else{
				//console.log("PENDING")
				//console.log(todo)
				document.getElementById(`text_${todo.id}`).setAttribute("style" , "text-decoration: none;");
				document.getElementById(`label_${todo.id}`).setAttribute("style", "border-color: #007bff !important;")
				document.getElementById(`checkbox_${todo.id}`).checked = false;
			}
		})

		
  	})

function check_func(n){
	var checkboxele = document.getElementById("checkbox_" + n)
	var textele = document.getElementById("text_" + n)
	var labelele = document.getElementById("label_" + n)
	fetch_url = 'http://localhost:3000/todos/' + n
	fetch(fetch_url,{
		method: 'PUT',
		headers: {
			"Content-type": "application/json; charset=UTF-8"
		},
		body: JSON.stringify({
			completed: checkboxele.checked
		})
	}).then(response=>{
		return response.json()
	}).then(data=>{
		if(checkboxele.checked){
			textele.setAttribute("style" , "text-decoration: line-through;");
			labelele.setAttribute("style", "border-color: #28a745 !important;")
		}
		else{
			textele.setAttribute("style" , "text-decoration: none;");
			labelele.setAttribute("style", "border-color: #007bff !important;")
		}
		console.log(data)
	}).catch(err=>{
		console.log(err)
		labelele.setAttribute("style", "border-color: #dc3545 !important;")
	})
}



function add_func(frm){
	if (frm.todo_title.value.length === 0){
		alert("Title not added!");
	}
	else{
		var docu_list = document.getElementById('listdiv')
		fetch('http://localhost:3000/todos/',{
			method: 'POST',
			body: JSON.stringify({
				"userId": frm.todo_userId.value,
				"title": frm.todo_title.value,
				"completed": false
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		}).then(response=>response.json())
		  .then((data)=>{
			  				console.log(data.id)
			  				docu_list.innerHTML = `<label class="container border border-primary mx-auto py-2 rounded-pill" id="label_${data.id}" for="checkbox_${data.id}">
														<input type='checkbox' id="checkbox_${data.id}" name="checkbox_${data.id}" onclick='check_func("${data.id}")'>
															<span id="text_${data.id}">${data.title}</span>
														</input>
													</label>` + docu_list.innerHTML;
			})
	}
}





