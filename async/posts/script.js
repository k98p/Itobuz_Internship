fetch('https://jsonplaceholder.typicode.com/posts/')
    .then(response => response.json())
    .then(data => {
        let items = "";
        for(let i=0; i<data.length; ++i){
            items += `<p><a href="specific.html?id=${data[i].id}">${data[i].title}</a><p>`
        }
        document.getElementById("list-div").innerHTML = items;
    })





