// function find_large(a){
//     let largest = 0;
//     for (let i=0; i<a.length; ++i){
//         if (a[i]>largest){
//             largest=a[i];
//         }
//     }
//     return largest;
// }

// function palin(a){
//     let start = 0;
//     let end = a.length-1;
//     while(start<=end){
//         if(a[start]!=a[end]){
//             return false;
//         }
//         else{
//             start++;
//             end--;
//         }
//     }
//     return true;
// }

// function check_pow(a){
//     return (!(a&(a-1)));
// }

// a = [2,3,4,7,16]

// var n = prompt("Enter the initial value");
// function add(m){
//     return n+m;
// }
// console.log()

// var cal = function(n){
//     //let init_val = n;
//     let sum = n;
//     this.add = function(m){
//         n=n+m;
//         return n;
//     }
// }

/*

(function(){
    const el = document.getElementById('buy_link');
    console.log(el)

    const leftContent = document.querySelector('.content .left-content')

    document.addEventListener('click', function (event) {
        console.log('clicked document', event);
    });
    el.addEventListener('click', function (event) {
        event.stopPropagation();

        const h1 = leftContent.querySelector('h2');
        h1.textContent = '<span>WOW</span>'
    });
})()



var hiddenName = 'ankit';
get name {
    return hiddenName
}
var name = 'ankit'

name = 'something else'










var name;
get name() {
    return name;
}
*/
let q = new Promise((resolve, reject)=>{
    let a = 1+1;
    if (a===5){
        resolve("success")
    }
    else{
        reject("Failure");
    }
})

q.then((message)=>{
    console.log("In the then block " + message)
}).catch((message)=>{
    console.log("In the catch block "+message)
})

let record1 = new Promise((resolve, reject)=>{
    resolve('Video 1 released')
})

let record2 = new Promise((resolve, reject)=>{
    resolve('Video 2 released')
})

Promise.all([record1, record2]).then((messages)=>{
    console.log(messages)
})

function custompromise(){
    return new Promise((resolve, reject)=>{
        if (false){
            resolve("Help")
        }
        else{
            reject({
                name: 'Kaustav',
                message: 'busy'
            })
        }
    })
}

custompromise().then((message)=>{
    console.log('Success: ' + message)
}).catch((message)=>{
    console.log("Failure "+ message.name + " " + message.message)
})