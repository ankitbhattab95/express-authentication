var express = require('express');
var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken')
const fs=require('fs')
var app= express();
var userDB= [];
var passwordDB=[];
var loggedIn= false;
var routes =['movies','sports','politics','date']

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


app.get("/home.css",function(req,res){
    if(req.url.match("\.css$")){
        var fileStream= fs.createReadStream("\home.css")
        res.writeHead(200,{'Content-type':'text/css'})
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
    if(loggedIn){
        res.redirect('/');
    }
    else{

        res.writeHead(200,{'Content-type':'text/html'})
        fs.readFile('login.html',function(error,data){
        if(error){
            res.writeHead(404)
            res.write('file not found')
        }
        else{
            // console.log("get request")
            res.write(data)
        }
        res.end();
        })
    }
})



app.post('/login',function(req,res){
    userDetails={
        user:req.body.user,
        password:req.body.password
    }
    //check if its a registered user
    console.log(req.body)
    console.log(req.body.password)
    console.log(passwordDB[userDB.indexOf(req.body.user)])
    if((userDB.indexOf(req.body.user) !== -1)  &&
        (passwordDB[userDB.indexOf(req.body.user)] === req.body.password)){
            loggedIn = true;
            jwt.sign({userDetails},'secretKey',function(err,token){
                res.json({
                    token
                })
                // console.log("post request ");
                console.log(token);
            })
        }
    else{
        res.sendStatus(403);
    }
})

app.get('/register',function(req,res){
    
    if (!loggedIn){
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
    }
    else{
        res.redirect('/')
    }
})


app.post('/register',function(req,res){
    // res.send(req.body);
    passwordDB.push(req.body.password);
    userDB.push(req.body.user);
    console.log(userDB);
    console.log(passwordDB);
    res.redirect("/login");
})

app.get('/logout',function(req,res){
    res.send("Logged out successfully!!!! ");
})
app.post('/logout',function(req,res){
    const bearerHeader = req.headers['authorization'];
    // console.log("logout");
    // console.log(bearerHeader);
    loggedIn = false;
    if(typeof bearerHeader !== 'undefined'){
        jwt.verify(bearerHeader,'secretKey',function(err,authData){
            res.sendStatus(200)       
        })
    }
    else{
        sendStatus(403)
    }
})

app.get('/:topic', function(req, res) {
    console.log("/:topic")
    // console.log(req.url)
    // console.log(req.query.token)
    if(loggedIn){
        if (routes.indexOf(req.params.topic) !== -1 && (req.query.token)!==undefined){
                jwt.verify(req.query.token,'secretKey',function(err,authData){
                    if(err){
                        res.sendStatus(403);
                    }
                    else{
                        // console.log("finished");
                        // console.log(req.params.topic)
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
                                    res.end(data)
                                }
                                res.end();
                            })
                        }
                    }
                })
    
        }
        else{
        res.send("Token is missing from the URL ");
        }
    }
    else{
        res.send("not authorized, need to SignUp or Login!!!!");
    }
} )

var server= app.listen(3000,function(){
    console.log('serving port',server.address().port);
})

