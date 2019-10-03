console.log("in login.js")


function request(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'http://localhost:3000/login', true);
    xhr.onreadystatechange = function() {
        console.log('in xhr '+ xhr.readyState)
        if (xhr.readyState === 4)  { 
            console.log(xhr.response);
            var serverResponse = xhr.response;
            localStorage.setItem("tokenID",serverResponse);
        }
    };
    xhr.send(null);
}
