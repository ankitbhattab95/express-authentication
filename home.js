document.getElementById('sports').onclick = function() {
    page= this.innerText;
    buildKey();
    console.log(page);
};
document.getElementById('movies').onclick = function() {
    page= this.innerText;
    buildKey();
    console.log(page);
 };
 document.getElementById('politics').onclick = function() {
    page= this.innerText;
    buildKey();
    console.log(page);      
 };
 
function buildKey(){ 
    var key = JSON.parse(localStorage.getItem("tokenID")); 
    console.log(key)
    var url = "http://localhost:3000/"+page;
    httpGet(url,key); 
}





function httpGet(url,key){
    var xhr = new XMLHttpRequest();
    xhr.open("get", url, true);
    xhr.setRequestHeader("authorization",key.token);
    window.location.href=(url+"?token="+key.token);
    // xhr.onreadystatechange = function() {
    //     // console.log('in xhr '+ xhr.readyState)
    //     if (xhr.readyState === 4)  { 
    //         console.log("home.js get");
    //         console.log(xhr.response);
    //         var serverResponse = xhr.response;
            
    //     }
    // };
    // xhr.send(null);
    // return xhr.responseText;
}




// function httpGet(url,key){
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.open( "GET", url, false );
//     xmlHttp.setRequestHeader("Ocp-Apim-Subscription-Key",key);
//     xmlHttp.send(null);
//     return xmlHttp.responseText;
// }