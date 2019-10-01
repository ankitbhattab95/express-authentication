userDB= [];
PasswordDB=[];
function myFunction() {
    userDB.push( document.querySelector("#user").value);
    PasswordDB.push(document.querySelector("#password").value)
    console.log(userDB);
    console.log(PasswordDB);
    
    const http = new XMLHttpRequest()
    http.open("GET", "http://localhost:3000/")
    http.send()
    http.onload = () => console.log(http.responseText)

  }

