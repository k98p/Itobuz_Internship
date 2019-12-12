var test;
var listarr = [];
fetch('https://jsonplaceholder.typicode.com/posts')
	.then(response => response.json())
	.then(res => {
		let items = "";
		for(let i=0; i<res.length; ++i){
			listarr.push(res[i].id)
			items += `<input type='checkbox' id="checkbox_${res[i].id}" onclick='check_func("${res[i].id}")'><span id="text_${res[i].id}">${res[i].title}</span></input><br>`
		}
		document.getElementById("listdiv").innerHTML = items;
		console.log(res)
		test = res 		//doesn't work. Why?
		return res
  	})

function check_func(n){
	var checkid = "checkbox_"+n;
	var textid = "text_"+n;
	var checkboxele = document.getElementById(checkid)
	var textele = document.getElementById(textid)
	fetch_url = 'https://jsonplaceholder.typicode.com/posts/' + n
	if (checkboxele.checked===true){
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
