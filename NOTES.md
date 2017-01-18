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

That variable can then be imported into other file like each of the routing files using ```app.get()```.

We get the variable through the request object ```req.app.get('appData');```

Variables set with ```app.set()``` are available throughout the app and can be fetched throughout the app with ```app.get()```



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

## Add folders

```bash
mkdir public && mkdir public/css && mkdir public/js && mkdir public/images
```



## Import Image and CSS assets

Best to grab these from what ever source you use as they vary from project to project.



## Serve the public assets

Static is an example of middleware.

```express.static('')``` allows us to make a set of folder contents available to any of the app's routes.

```javascript
app.use(express.static('public'));
```



## Use some of these assets in our root route response

@ index.js

```javascript
router.get('/', function(req, res) {
  res.send(`
      <link rel="stylesheet" type="text/css" href="css/style.css">
      <h1>Welcome</h1>
      <img src="/images/misc/background.jpg" alt="background" style="height: 300px;">
      <p>Roux Academy Meetups put together artists from all walks of life</p>
  `);
});
```



## Use some of these assets in our speaker/s route response

@ speakers.js

```javascript
router.get('/speakers', function(req, res) {
  var info = '';
  var dataFile = req.app.get('appData');
  dataFile.speakers.forEach(function(item) {
    info += `
    <li>
      <h2>${item.name}</h2>
      <img src="/images/speakers/${item.shortname}_tn.jpg" alt="speaker">
      <p>${item.summary}</p>
    </li>
    `;
  });
  res.send(`
    <link rel="stylesheet" type="text/css" href="/css/style.css">
      <h1>Roux Academy Meetups</h1>
      ${info}
  `);
});

router.get('/speakers/:speakerid', function(req, res) {
  var dataFile = req.app.get('appData');
  var speaker = dataFile.speakers[req.params.speakerid];
  res.send(`
      <link rel="stylesheet" type="text/css" href="/css/style.css">
      <h1>${speaker.title}</h1>
      <h2>with ${speaker.name}</h2>
      <img src="/images/speakers/${speaker.shortname}_tn.jpg" alt="speaker">
      <p>${speaker.summary}</p>
  `);
});
```

Looping through the json data to make up image src paths relies on structuring the the json with a "shortname" item.

```html
<img src="/images/speakers/${item.shortname}_tn.jpg" alt="speaker">
```



For the ```/speakers/:speakerid``` route make sure you use the absolute path to assets since you traversing the folder hierarchy. Eg: ```href="/css/style.css"```



## Check app functions

```bash
node app.js
```



## Commit changes

```bash
git add . && git commit -m
```



# Chapter 02-04

Automating Workflow: Use Node.js package node monitor (nodemon) and scripts to watch for changes and reload the browser.

Not using gulp since there isn't any comlicated processing nessecary.



```bash
npm install -save nodemon
```

to use simply start the app through ```nodemon```

```bash
nodemon app.js
```

## Modify start script 

@ package.json

```json
  "scripts": {
    "start": "nodemon app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```



 Specify the file extensions nodemon will restart for

```json
  "scripts": {
    "start": "nodemon -e css,ejs,js,json app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```





specify the folder to watch

```json
  "scripts": {
    "start": "nodemon -e css,ejs,js,json --watch app",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```



ignore some files

```json
  "scripts": {
    "start": "nodemon -e css,ejs,js,json --watch app --ignore feedback.json",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```



## Setup reload functionality

```bash
npm install --save reload
```

@ app.js

```javascript
var reload = require('reload');
```

call the reload method on the server

@ app.js (bottom)

```java
reload(server, app);
```



Add reload script to each page

@ index.js and @ speakers.js

```html
<script src="/reload/reload.js"></script>
```





## Check app functions

```bash
npm start
```

auto reloading and change watching should be functional.

## Commit changes

```bash
git add . && git commit -m
```





# Chapter 03-01

Installing a templating system

We're using [EJS embeddable javascript](http://www.embeddedjs.com) templating.



## Create a views folder and template

```bash
mkdir views && touch index.ejs
```



Add template code

@ index.ejs

```ejs
<!DOCTYPE html>
<html>
  <head>
    <title>Roux Meetups</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

    <link rel='stylesheet' href='/css/style.css' />
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <link href='https://fonts.googleapis.com/css?family=Open+Sans|Roboto+Slab' rel='stylesheet' type='text/css'>
  </head>
  <body>

    <header>
      <div class="jumbotron hidden-xs">
      </div><!-- jumbotron -->

      <nav class="navbar navbar-inverse">
        <div class="container">
          <div class="navbar-header">

            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>

            <a href="/" class="navbar-brand">Roux Meetups</a>
          </div>
          <div class="collapse navbar-collapse" id="navbar-collapse">
            <ul class="nav navbar-nav navbar-right">
              <li><a href="/">Home</a></li>
                <li><a href="/speakers" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Speakers <span class="caret"><span></a>
                  <ul class="dropdown-menu">
                    <li><a href="/speakers">All Speakers</a></li>
                    <li role="separator" class="divider"></li>
                  </ul>
              </li>
            </ul><!-- nav -->
          </div><!-- navbar-collapse -->
        </div><!-- container -->
      </nav>
    </header>

    <div class="container">
      <div class="row">
        <div class="col-sm-8">
          <div class="maincontent">

            <article class="article">
              <h1 class="article-title">Who are we?</h1>
                <p>The Roux Academy gets thousands of submissions every year for artists interesting in participating in the CAC exhibits, and selects approximately 200 distinct pieces of contemporary art for display in their collective exhibit. In addition, 12 individuals are honored as Featured Artists - each being granted his or her own exhibit hall to display entire collections or themed pieces.</p>
                <p>Each Featured Artist has an opportunity to speak at one of our meetups and share his or her vision, perspective, and techniques with attendees on a more personal level than at our large conference. It is truly an honor to be a CAC Featured Artist and many past students artists who were featured at CAC have gone on to brilliant careers in art.</p>
            </article><!-- article -->

            <article class="article">
              <h1 class="article-title">Get Busy!</h1>
              <p>If you want to keep up with what's going on with the group, <a href="http://www.meetup.com/rouxmeet">join our meetup group</a>, <a href="http://www.twitter.com/rouxmeet">follow us on twitter</a>. If you're in FaceBook, you can also <a href="http://www.facebook.com/rouxmeet">join our FaceBook group</a>.</p>
            </article><!-- article -->

            <article class="article">
              <h1 class="article-title">Who should come?</h1>
              <ul>
                <li>Anybody interested in art and the creative industry</li>
                <li>Painters, sculptors, photographers and graphic artists</li>
                <li>Those interested in meeting and making a connection with others in the local art scene.</li>
              </ul>
            </article><!-- article -->

          </div>
        </div><!-- primary -->
        <aside class="col-sm-4">
          <article class="sidebar">
            <h1 class="sidebar-title">Who should come?</h1>
            <ul class="sidebar-body">
              <li>Anybody interested in art and the creative industry</li>
              <li>Painters, sculptors, photographers and graphic artists</li>
              <li>Those interested in meeting and making a connection with others in the local art scene.</li>
            </ul>
          </article><!-- article -->
        </aside><!-- secondary -->
      </div>
    </div><!-- container -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>

    <script src="/js/pixgrid.js"></script>
    <script src="/reload/reload.js"></script>
  </body>
</html>

```



## Install EJS

```bash
npm install --save ejs
```



## Set EJS views variables

@ app.js

```javascript
app.set('view engine', 'ejs');
app.set('views', 'app/views');
```



now the routes have access to the views so we can render the ```index.ejs``` file instead of … that js inline html format thingy...

@ index.js

```javascript
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {

  res.render('index');

});

module.exports = router;

```



## Check app functions

```bash
npm start
```

index.ejs template should be rendering

## Commit changes

```bash
git add . && git commit -m
```



# Chapter 03-02 

Using data with views



## Data in Views

You can pass data as a variable to routes in a rendered response...

It will become a local variable that you can use inside your templates.

```javascript
res.render('index', { data })
```

That data will only be available to that route.



Or, you can set a global variable for data, which will make data available as a local variable within all views throughout the app.

```javascript
app.locals.??? = {}
```



To access data inside templates you sue this notation

```ejs
<%= data %>
```



## Passing data through the route

```javascript
  res.render('index', {
    pageTitle: 'Home',
    pageID: 'home'
  });
```



## Use these variables in the template

@ index.ejs

```ejs
<title>Roux Meetups--<%= pageTitle %></title>
```

and 

@ index.ejs

```ejs
<body id="<%= pageID %>">
```



## Make site title available globally

Site title is used on every route so its a good candidate for setting a global variable.

@ app.js

```javascript
app.locals.siteTitle = 'Roux Meetups';
```



and use it in the template

```ejs
<title><%= siteTitle %>--<%= pageTitle %></title>
```







## Check app functions

```bash
npm start
```

index.ejs template should be rendering

## Commit changes

```bash
git add . && git commit -m
```









# Chapter 03-03



Using Conditionals and Loops

