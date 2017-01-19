# Chapter 04-01

Setting up  a regular route

4 steps

## Create a link

Add link to form page to navbar

```ejs
<li><a href="/feedback">Feedback</a></li>
```



## Create the route

```bash
touch routes/feedback.js
```

@ feedback.js

```javascript
var express = require('express');
var router = express.Router();

router.get('/feedback', function(req, res) {

  res.render('feedback', {
    pageTitle: 'Feedback',
    pageID: 'feedback'
  });

});

module.exports = router;

```

Only need two variables, just serving up a form.

## Add Route to app

@ app.js

```javascript
app.use(require('./routes/feedback'));
```



## Create the Template

```bash
touch app/views/feedback.ejs
```



## Check app functions

```bash
npm start
```

Feedback form is now accessible from dropdown menu

## Commit changes

```bash
git add . && git commit -m
```



# Chapter 04-02

## Add Sample feedback.json



```bash
touch app/data/feedback.json
```



## Create API route

```bash
touch app/routes/api.js
```

Define the route

```javascript
var express = require('express');
var router = express.Router();
var feedbackData = require('../data/feedback.json');

router.get('/api', function(req, res) {
  res.json(feedbackData);
});

module.exports = router;

```

There is no render statement

Doesn't render a template instead it serves a datafile

```res.json(feedback);```





## Add route to app

```javascript
app.use(require('./routes/api'));
```

go to route: localhost:3000/api

and the json data is being served.



## JS to manage adding that json to a page



```bash
touch app/public/js/feedback.js
```

use jQuery to fetch the json data

```javascript
$(function() {
  $.getJSON('api', updateFeedback);

  function updateFeedback(data) {
   var output = '';
   $.each(data,function(key, item) {
     output += '     <div class="feedback-item item-list media-list">';
     output += '       <div class="feedback-item media">';
     output += '         <div class="feedback-info media-body">';
     output += '           <div class="feedback-head">';
     output += '             <div class="feedback-title">' + item.title + '<small class="feedback-name label label-info"></small></div>';
     output += '           </div>';
     output += '           <div class="feedback-message">' + item.message + '</div>';
     output += '         </div>';
     output += '       </div>';
     output += '     </div>';
   });
   $('.feedback-messages').html(output);
  }
});

```



Conditionally load that script only on the feedback page using pageId liek we did with pixgrid

@ template/jsdefaults.ejs

```javascript
<% if(typeof artwork !== "undefined") { %>
  <script src="/js/pixgrid.js"></script>
<% } %>

<% if(pageID == 'feedback') { %>
  <script src="/js/feedback.js"></script>
<% } %>
```



## Check app functions

```bash
npm start
```

Api serves the son and the json data is brought into the feedback page template and populates the recent comments coloumn

## Commit changes

```bash
git add . && git commit -m
```



