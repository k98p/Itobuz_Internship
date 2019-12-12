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
		test = res 		//doesn't work. Why?
		return res
  	})

function check_func(n){
	var checkid = "checkbox_"+n;
	var textid = "text_"+n;
	var checkboxele = document.getElementById(checkid)
	var textele = document.getElementById(textid)
	fetch_url = 'https://jsonplaceholder.typicode.com/posts/' + n
	fetch(fetch_url).then(response => {
		if (checkboxele.checked===true){
			textele.setAttribute("style" , "text-decoration: line-through;");
		}
		else{
			textele.setAttribute("style" , "text-decoration: 'none';");
		}
	})
}
