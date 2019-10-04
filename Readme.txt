---------------------------------------------
Requirement
--------------------------------------------
2.
Start reading on Node Express and set up a sample app having the below –

You can setup sample routes. /home, /details .. add a middleware function which will get the current time store it in the request and pass it to the next route using “next()”

---------------------------------------------
Notes
--------------------------------------------
This app demonstrates authentication based on JWT token. 
The token is stored in the local storage during login. Token is sent to server via the url for now.
No database involved, hence need to signUp everytime the server restarts.

run command: node index.js
run on localhost port 3000