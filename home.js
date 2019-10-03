document.getElementById('sports').onclick = function() {
    page= this.innerText;
    buildKey();
    console.log(page);
};
document.getElementById('movies').onclick = function() {
    page= this.innerText;
    console.log(page);
 };
 document.getElementById('politics').onclick = function() {
    page= this.innerText;
    console.log(page);      
 };
 
function buildKey(){ 
    var key = localStorage.getItem("tokenID"); 
    var url = "http://localhost:3000/"+page;
    httpGet(url,key); 
}


function httpGet(url,key){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false );
    xmlHttp.setRequestHeader("Ocp-Apim-Subscription-Key",key);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}