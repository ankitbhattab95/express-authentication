var express = require('express');
var bodyParser = require('body-parser')
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

app.get('/login',function(req,res){
    res.writeHead(200,{'Content-type':'text/html'})
    fs.readFile('login.html',function(error,data){
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


var server= app.listen(3000,function(){
    console.log('serving port',server.address().port);

})