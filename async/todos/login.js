function signup(frm){
    if (frm.username.value.length === 0 || frm.pass.value.length === 0){
		alert("Username or Password field cannot be empty");
	}
	else{
		//var docu_list = document.getElementById('listdiv')
		fetch('http://localhost:3000/users/',{
			method: 'POST',
			body: JSON.stringify({
				"username": frm.username.value,
				"password": frm.pass.value
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		}).then(response=>response.json())
		  .then((data)=>{
			  		return data;
			})
	}
}

function login(frm){
    if (frm.username.value.length === 0 || frm.pass.value.length === 0){
		alert("Username or Password field cannot be empty");
	}
	else{
		//var docu_list = document.getElementById('listdiv')
		fetch('http://localhost:3000/users/login',{
			method: 'POST',
			body: JSON.stringify({
				"username": frm.username.value,
				"password": frm.pass.value
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		}).then(response=>response.json())
		  .then((data)=>{
			  		return data;
			})
	}
}