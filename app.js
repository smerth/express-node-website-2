var express = require('express');
var app = express();

app.get('/', function(request, response){
    response.send('<h1>Chat That Word</h1>')
});

var server = app.listen(3000, function(){
    console.log('Listening on port: 3000...')
})


// CHAPTER 01-04 NODE SERVER
// var http = require('http');

// var myServer = http.createServer(function(request, response){
//     response.writeHead(200, {"Content-Type" : "text/html"})
//     response.write('<h1>Chat that word</h1>');
//     response.end();
// });

// myServer.listen(3000);

// console.log('Go to http://localhost:3000 on your brower.')