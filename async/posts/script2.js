let id_string = window.location.href.split('?')[1]
const id = id_string.split('=')[1];

let fetch_url = 'https://jsonplaceholder.typicode.com/posts/' + id; 
let comments_url = 'https://jsonplaceholder.typicode.com/comments?postId=' + id
//console.log(fetch_url);

const fetch_arr = [fetch(fetch_url), fetch(comments_url)]
Promise.all(fetch_arr)
    .then(res=>res.json())
    .then(data=>{
        var contain = document.getElementsByClassName("post-container")[0];
        contain.innerHTML = `<div id="post">
                                <h3>${data.title} (ID: ${data.id})</h3><h6>${data.body}</h6></div>`;
        var contain_comment = document.getElementsByClassName("comment-container")[0];
        for(let i=0; i<data.length; ++i){
            contain_comment.innerHTML+= '<div style="padding: 10px;"></div>' + '<h5>' + data[i].name + '</h5>' + '<p>' + data[i].body + '</p>' 
            // /contain_comment.innerHTML+= 
            //contain_comment.innerHTML+= 
            //contain_comment.innerHTML+= '</div>'
        }
    })

/*
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
            contain_comment.innerHTML+= '<div style="padding: 10px;"></div>' + '<h5>' + data[i].name + '</h5>' + '<p>' + data[i].body + '</p>' 
            // /contain_comment.innerHTML+= 
            //contain_comment.innerHTML+= 
            //contain_comment.innerHTML+= '</div>'
        }
    })
*/
