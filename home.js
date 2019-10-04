document.getElementById('sports').onclick = function() {
    page= this.innerText;
    buildKey();
};
document.getElementById('movies').onclick = function() {
    page= this.innerText;
    buildKey();
 };
 document.getElementById('politics').onclick = function() {
    page= this.innerText;
    buildKey();     
 };
 

 document.getElementById('date').onclick = function() {
    page= 'date';
    buildKey();     
 };


 document.getElementById('logout').onclick = function() {
    var key = JSON.parse(localStorage.getItem("tokenID")); 
    console.log(key)
    if(key !== null){
        logout(key);   
    }
    else{
        alert("you are not logged in");
    }
 };
 
 
 function buildKey(){ 
     var key = JSON.parse(localStorage.getItem("tokenID")); 
     var url = "http://localhost:3000/"+page;
     console.log(url)
     if (key !==null){
         window.location.href=(url+"?token="+key.token);
     }
     else{
        window.location.href=(url);
     }
    }
    
    
    
function logout(key){
    console.log("logout function")
    console.log(key.token)
    var xhr = new XMLHttpRequest();
    xhr.open("post", 'http://localhost:3000/logout', true);
    xhr.setRequestHeader("authorization",key.token);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status=== 200)  { 
            localStorage.removeItem("tokenID");
            window.location.href=('http://localhost:3000/logout');
        }
        else if(xhr.readyState === 4 ){
            alert('login first')
        }
}
    xhr.send(null)
}

