fetch('https://jsonplaceholder.typicode.com/todos')
	.then(response => response.json())
	.then(res => {
		console.log(res);
		let items = "";
		for(let i=0; i<10; ++i){
			items += `<label class="container border border-primary mx-auto py-2 rounded-pill" for="checkbox_${res[i].id}">
							<input type='checkbox' id="checkbox_${res[i].id}" name="checkbox_${res[i].id}" onclick='check_func("${res[i].id}")'>
								<span id="text_${res[i].id}">${res[i].title}</span>
							</input>
						</label><br>`
		}
		document.getElementById("listdiv").innerHTML = items;
  	})

function check_func(n){
	var checkid = "checkbox_" + n;
	var textid = "text_"+n;
	var checkboxele = document.getElementById(checkid)
	var textele = document.getElementById(textid)
	fetch_url = 'https://jsonplaceholder.typicode.com/todos/' + n
	if (checkboxele.checked){
		fetch(fetch_url,{
			method: 'PUT',
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			},
			body: JSON.stringify({
				completed: true
			})
		}).then(response=>{
			textele.setAttribute("style" , "text-decoration: line-through;");
			return response.json()
		}).then(data=>console.log(data))
	}
	else{
		fetch(fetch_url,{
			method: 'PUT',
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			},
			body: JSON.stringify({
				completed: false
			})
		}).then(response=>{
			textele.setAttribute("style" , "text-decoration: none;");
			return response.json()	
		}).then(data=>{
			console.log(data);
		})
	}
}

var docu_list = document.getElementById('listdiv')
var next_id = 11;

function add_func(frm){
	if (frm.todo_title.value.length = 0){
		alert("Title not added!");
	}
	else{
		//console.log(docu_list)
		next_id++;
		fetch('https://jsonplaceholder.typicode.com/todos',{
			method: 'POST',
			body: JSON.stringify({
				userId: frm.todo_userId.value,
				title: frm.todo_title.value,
				completed: false
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		}).then(response=>response.json())
		//<input type='checkbox' id="checkbox_${res[i].id}" name="checkbox_${res[i].id}" onclick='check_func("${res[i].id}")'><label for="checkbox_${res[i].id}" id="text_${res[i].id}">${res[i].title}</label></input><br>
		  .then(data=>docu_list.innerHTML += `<label class="container border border-primary mx-auto py-2 rounded-pill" for="checkbox_${data.id}">
												  <input type='checkbox' id="checkbox_${data.id}" name="checkbox_${data.id}" onclick='check_func("${data.id}")'>
														  <span id="text_${data.id}">${data.title}</span>
													</input>
											</label>`)
	
		}
}
