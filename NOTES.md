# Chapter 01-04 

Simple Node server

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

@ app.js

```javascript
var http = require('http');
```



## Create server

@ app.js

```javascript
var myServer = http.createServer(function(request, response){

});
```



## Write response

@ app.js

```javascript
var myServer = http.createServer(function(request, response){
    response.writeHead(statusCode: 200, {"Content-Type" : "text/plain"})
    response.write('Chat that word');
    response.end();
});
```



## Listen

@ app.js

```javascript
myServer.listen(3000);
```





## Run app

@ terminal

```bash
node app.js
```



## Serve Html

@ app.js

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



# Chapter 01-05

simple express server

## Start

comment out the node server from previous chapter

## Require Express

@ app.js

```javascript
var express = require('express');
var app = express();
```



## Handle a request to the root route

@ app.js

```javascript
app.get('/', function(request, response){
    response.send('<h1>Chat That Word</h1>')
});
```



## Listen for a request

@ app.js

```javascript
var server = app.listen(3000, function(){
    console.log('Listening on port: 3000...')
})
```







# Chapter 01-06

Serve json data

## Add data folder

```bash
mkdir data && touch data/data.json
```



@ data.json

use this structure

```json
{
  "speakers": [{
    "title" : "Art in Full Bloom",
    "name": "Lorenzo Garcia",
    "shortname" : "Lorenzo_Garcia",
    "summary" : "Drawing and painting flowers may seem like a first-year art student's assignment, but Lorenzo Garcia brings depth, shadows, light, form and color to new heights with his unique and revolutionary technique of painting on canvas with ceramic glaze. This session is sure to be a hit with mixed media buffs.",
    "description": "<p>Lorenzo was born in Mexico, but grew up in Southern California after his mother immigrated to Los Angeles when he was a year old. His mother worked as a seamstress in the Fashion District and brought home scrap materials for Lorenzo to create his early mixed media art. From that point on, Lorenzo became hooked on creating art from scrap metals, fabrics, wood, canvas, and many others. During his junior year at Bischon Art School in Los Angeles, he perfected his own proprietary method of painting on canvas with ceramic glaze, which he will demonstrate on Monday in his session, 'Art in Full Bloom'.</p><p>Lorenzo paints with an extraordinary amount of color, and prefers to create art centered around nature, animals, and science. Now in his senior year at Bischon, Lorenzo has been creating mixed media totem poles made from old telephone poles, and other recycled materials, and is already planning his next new technique that will likely inspire a trend for years to come.</p>",
    "artwork": ["Lorenzo_Garcia_01_tn.jpg", "Lorenzo_Garcia_02_tn.jpg", "Lorenzo_Garcia_03_tn.jpg", "Lorenzo_Garcia_04_tn.jpg"]
  },{
    "title" : "Deep Sea Wonders",
    "name": "Hilary Goldywynn Post",
    "shortname" : "Hillary_Goldwynn",
    "summary": "Hillary is a sophomore art sculpture student at New York University, and has won the major international prizes for painters, including the Divinity Circle and the International Painter's Medal. Hillary's exhibit features paintings that contain only water including waves, deep sea, and river.",
    "description": "<p>Hillary is a sophomore art sculpture student at New York University, and has already won all the major international prizes for new painters, including the Divinity Circle, the International Painter's Medal, and the Academy of Paris Award. Hillary's CAC exhibit features paintings that contain only water images including waves, deep sea, and river.</p><p>An avid water sports participant, Hillary understands the water in many ways in which others do not, or may not ever have the opportunity. Her goal in creating the CAC exhibit was to share with others the beauty, power, and flow of natural bodies of water throughout the world. In addition to the display, Hilary also hosts a session on Tuesday called Deep Sea Wonders, which combines her love of deep sea diving and snorkeling, with instruction for capturing the beauty of underwater explorations on canvas.</p>",
    "artwork" : ["Hillary_Goldwynn_01_tn.jpg" , "Hillary_Goldwynn_02_tn.jpg" , "Hillary_Goldwynn_03_tn.jpg" , "Hillary_Goldwynn_04_tn.jpg" , "Hillary_Goldwynn_05_tn.jpg" , "Hillary_Goldwynn_06_tn.jpg" , "Hillary_Goldwynn_07_tn.jpg"]
  },...
  ] // NO COMMA AFTER LAST NODE
}
```



## Require json files in the server

```javascript
var dataFile = require('./data/data.json');
```



## Offer the option for user to define port

```javascript
app.set('port', process.env.PORT || 3000 );
```



## Modify server listening function

```javascript
var server = app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'));
});
```



## To specify a port

```bash
PORT=8080 node app.js
```



## Respond with JSON data

```javascript
app.get('/', function(req, res) {
  var info = '';
  dataFile.speakers.forEach(function(item) {
    info += `
    <li>
      <h2>${item.name}</h2>
      <p>${item.summary}</p>
    </li>
    `;
  });
  res.send(`
      <h1>Roux Academy Meetups</h1>
      ${info}
  `);
});
```



## Commit changes

```bash
git add . && git commit -m
```



# Chapter 02-01

basic routing

## Send a response for the root route

```javascript
app.get('/', function(req, res) {
  res.send(`
      <h1>Welcome</h1>
      <p>Roux Academy Meetups put together artists from all walks of life</p>
  `);
});
```



## Send a response for the "speakers" route

```javascript
app.get('/speakers', function(req, res) {
  var info = '';
  dataFile.speakers.forEach(function(item) {
    info += `
    <li>
      <h2>${item.name}</h2>
      <p>${item.summary}</p>
    </li>
    `;
  });
  res.send(`
      <h1>Roux Academy Meetups</h1>
      ${info}
  `);
});
```



## Send a response for an individual speaker route based on speaker's "id"

```javascript
app.get('/speakers/:speakerid', function(req, res) {

  var speaker = dataFile.speakers[req.params.speakerid];
  res.send(`
      <h1>${speaker.title}</h1>
      <h2>with ${speaker.name}</h2>
      <p>${speaker.summary}</p>
  `);
});
```



## Commit changes

```bash
git add . && git commit -m
```





# Chapter 02-02

modularizing routes



## Add a routes directory

```javascript
mkdir routes
```



## Add separate files to handle each route

```bash
touch routes/index.js && touch routes/speakers.js
```



## Set a variable to reference the datafile

@app.js

```javascript
app.set('appData', dataFile);
```



## Require Express Router 

@ the top of index.js and speaker.js

```javascript
var express = require('express');
var router = express.Router();
```



## Move root route handling to index.js

```javascript
app.get('/', function(req, res) {
  res.send(`
      <h1>Welcome</h1>
      <p>Roux Academy Meetups put together artists from all walks of life</p>
  `);
});
```



## Move speaker route handling to speaker.js

```javascript
app.get('/speakers', function(req, res) {
  var info = '';
  dataFile.speakers.forEach(function(item) {
    info += `
    <li>
      <h2>${item.name}</h2>
      <p>${item.summary}</p>
    </li>
    `;
  });
  res.send(`
      <h1>Roux Academy Meetups</h1>
      ${info}
  `);
});

app.get('/speakers/:speakerid', function(req, res) {
  var speaker = dataFile.speakers[req.params.speakerid];
  res.send(`
      <h1>${speaker.title}</h1>
      <h2>with ${speaker.name}</h2>
      <p>${speaker.summary}</p>
  `);
});
```



## Routes should now be methods called on the router

replace app.get() with router.get() for all three routes...

## Get data file into speakers.js

You can set app variables using ```app.set()``` as was done for the data.json file in the express server ```app.set('appData', dataFile);```

That variable can then be imported into other file like each of the routing files using ```



speakers.js uses the datafile.  Use the var created in app.js to import the data into speakers.js routing functions

```javascript
app.get('/speakers', function(req, res) {
  var info = '';
  var dataFile = req.app.get('appData'); //<-- ADD
  dataFile.speakers.forEach(function(item) {
    info += `
    <li>
      <h2>${item.name}</h2>
      <p>${item.summary}</p>
    </li>
    `;
  });
  res.send(`
      <h1>Roux Academy Meetups</h1>
      ${info}
  `);
});

app.get('/speakers/:speakerid', function(req, res) {
  var speaker = dataFile.speakers[req.params.speakerid]; //<-- ADD
  var dataFile = req.app.get('appData');
  res.send(`
      <h1>${speaker.title}</h1>
      <h2>with ${speaker.name}</h2>
      <p>${speaker.summary}</p>
  `);
});
```



## Export router from index.js and speakers.js

```javascript
module.exports = router;
```



## Include newly created route handling files

To have the app process and use files rather than require them for use later you can use the ```.use()``` method.

@ app.js

```javascript
app.use(require('./routes/index'));
app.use(require('./routes/speakers'));
```



## app.js looks like this

```javascript
var express = require('express');
var app = express();
var dataFile = require('./data/data.json');

app.set('port', process.env.PORT || 3000 );
app.set('appData', dataFile);

var server = app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'));
});
```



## Check app functions

```bash
node app.js
```



## Commit changes

```bash
git add . && git commit -m
```



# Chapter 02-03

Creating a Public Folder



