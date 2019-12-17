let id_string = window.location.href.split('?')[1]
const id = id_string.split('=')[1];

let fetch_url = 'https://jsonplaceholder.typicode.com/posts/' + id; 
let comments_url = 'https://jsonplaceholder.typicode.com/comments?postId=' + id
//console.log(fetch_url);

var contain = document.getElementsByClassName("post-container")[0];
fetch(fetch_url)
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        contain.innerHTML = `<div id="post">
                                <h3>${data.title} (ID: ${data.id})</h3><h6>${data.body}</h6></div>`;
    })          

var contain_comment = document.getElementsByClassName("comment-container")[0];
fetch(comments_url)
    .then(response=>response.json())
    .then(data=>{
        for(let i=0; i<data.length; ++i){
            contain_comment.innerHTML+= '<div style="padding: 10px;"></div>'
            contain_comment.innerHTML+= '<h5>' + data[i].name + '</h5>'
            contain_comment.innerHTML+= '<p>' + data[i].body + '</p>'
            //contain_comment.innerHTML+= '</div>'
        }
    })