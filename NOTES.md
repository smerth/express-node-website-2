# Start

## Optional starting points

[express frameworks](http://expressjs.com/en/resources/frameworks.html)

but for this project we will start from scratch.

## Create basic structure

```bash
mkdir public && mkdir views && touch readme.md && touch notes.md && touch .gitignore && touch app.js
```

## Gitignore

Copy from [gitignore.io](https://www.gitignore.io)

## Install Express

```bash
npm install express --save
```


## Git

```bash
git init && git add . && git commit -m
```



## Express

See [expressjs.com](http://expressjs.com)

require (include, load) a module that comes with express that handles http requests

```javascript
var http = require('http');
```



## Create server

```javascript
var myServer = http.createServer(function(request, response){

});
```



## Write response

```javascript
var myServer = http.createServer(function(request, response){
    response.writeHead(statusCode: 200, {"Content-Type" : "text/plain"})
    response.write('Chat that word');
    response.end();
});
```



## Listen

```javascript
myServer.listen(3000);
```





## Run app

@ terminal

```bash
node app.js
```



## Serve Html

```javascript
var myServer = http.createServer(function(request, response){
    response.writeHead(200, {"Content-Type" : "text/html"})
    response.write('<h1>Chat that word</h1>');
    response.end();
});
```



## Commit changes

```bash
git add . && git commit -m
```

