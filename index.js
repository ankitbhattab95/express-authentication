var express = require('express');
var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken')
const fs=require('fs')
var app= express();
var userDB= [];
var passwordDB=[];

var routes =['/movies','/sports','/politics','/date']

var getDate = function (req, res, next) {
    req.timestamp = Date();
    next();
  }

app.use(getDate);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', function(req, res) {
    res.writeHead(200,{'Content-type':'text/html'})
    fs.readFile('home.html',function(error,data){
        if(error){
            res.writeHead(404)
            res.write('file not found')
        }
        else{
            res.write(data)
        }
        res.end();
    })
} )

app.get("/login.js",function(req,res){
    if(req.url.match("\.js$")){
        var fileStream= fs.createReadStream("\login.js")
        res.writeHead(200,{'Content-type':'application/javascript'})
        fileStream.pipe(res);
    } 
})
app.get("/home.js",function(req,res){
    if(req.url.match("\.js$")){
        var fileStream= fs.createReadStream("\home.js")
        res.writeHead(200,{'Content-type':'application/javascript'})
        fileStream.pipe(res);
    } 
})

app.get('/login',function(req,res){
    res.writeHead(200,{'Content-type':'text/html'})
    fs.readFile('login.html',function(error,data){
    if(error){
        res.writeHead(404)
        res.write('file not found')
    }
    else{
        console.log("get request")
        res.write(data)
    }
    res.end();
    })
})

app.post('/login',function(req,res){
    userDetails={
        user:req.body.user,
        password:req.body.password
    }
    jwt.sign({userDetails},'secretKey',function(err,token){
        // localStorage.setItem("tokenid","res1.token");
        res.json({
            token
        })
        console.log("post request ");
        console.log(token);
    })
})

app.get('/register',function(req,res){
    res.writeHead(200,{'Content-type':'text/html'})
    fs.readFile('register.html',function(error,data){
    if(error){
        res.writeHead(404)
        res.write('file not found')
    }
    else{
        res.write(data)
    }
    res.end();
    })
})


app.post('/register',function(req,res){
    res.send(req.body);
    passwordDB.push(req.body.password);
    userDB.push(req.body.user);
    console.log(userDB);
    console.log(passwordDB);
})


// app.get('/:topic',verifyToken, function(req, res) {
app.get('/:topic', function(req, res) {
    console.log(req.params.topic)
    if (routes.indexOf(req.url) !== -1){

        if (req.params.topic==='date'){
            var responseText = '<h4>The timestamp stored by the Middleware function (getDate) in the request</h4>'
            responseText += req.timestamp 
            res.send(responseText)  
        }
        else{
            res.writeHead(200,{'Content-type':'text/html'})
            file=req.params.topic+'.html'
            fs.readFile(file,function(error,data){
                if(error){
                    res.writeHead(404)
                    res.write('file not found')
                }
                else{
                    res.write(data)
                }
                res.end();
            })
        }

    }
    else{
        res.send("Page not found, check the URL");
    }
} )

function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
    }
    else{
        res.send('not authorized, need to login');
    }
}

var server= app.listen(3000,function(){
    console.log('serving port',server.address().port);

})