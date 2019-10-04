console.log("in login.js")


function request(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'http://localhost:3000/login', true);
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = function() {
        console.log('in xhr '+ xhr.readyState)
        console.log(xhr.status)
        if (xhr.readyState === 4 && xhr.status=== 200)  { 
            console.log(xhr.response);
            var serverResponse = xhr.response;
            localStorage.setItem("tokenID",serverResponse);
            window.location.href = '/';
        }
        else if(xhr.readyState ===4 ){
            alert('You have not registered or incorrect credentials');
        }
        
    };
    var data = {
        user : document.getElementById("user").value,
        password: document.getElementById("password").value
    }
    data= JSON.stringify(data);
    xhr.send(data);
}
