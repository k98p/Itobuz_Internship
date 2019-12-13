let id_string = window.location.href.split('?')[1]
const id = id_string.split('=')[1];

let fetch_url = 'https://jsonplaceholder.typicode.com/posts/' + id; 
//console.log(fetch_url);
fetch(fetch_url)
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        document.getElementsByClassName("container")[0].innerHTML = "userId: " + data.userId + "<br>" + 
                                                                "id: " + data.id + "<br>" + 
                                                                "title: " + data.title + "<br>" + 
                                                                "body: " + data.body
    })          