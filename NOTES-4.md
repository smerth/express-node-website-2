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

Api serves the son and the json data is brought into the feedback page template and populates the recent comments column.

## Commit changes

```bash
git add . && git commit -m
```



# Chapter 04-03

handling post requests.

Handle submit with jQuery.  Use body-parser middleware. Use fs to write files.



# What doing?

@ js/feedback.js

```javascript
  $('.feedback-form').submit(function(e) {
    e.preventDefault();
    $.post('api', {
      name: $('#feedback-form-name').val(),
      title: $('#feedback-form-title').val(),
      message: $('#feedback-form-message').val()
    }, updateFeedback);
  });
```



Get the form with jQuery. On submit, fire an anonymous callback function and pass in the event object.  Prevent the default action of on-submit. Call the jQuery .post() method and pass in the API and map the values of each form field to the correct API json node.  Lastly, call updateFeedback to show the latest data on the page.



## Install dependancies

```bash
npm install --save body-parser
```

Add body-parser to the api route definition

@ routes/api.js

```javascript
var bodyParser = require('body-parser');
```



## Write the response to a post request

```javascript
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false })); 

router.post('/api', function(req, res) {
  feedbackData.unshift(req.body);
  res.json(feedbackData);
});
```

feedbackData is variable holding our json data. Unshift pushes the new post data to the top of the json object (since we want to read the most recent first.) The response we send is this new updated data object.



## Bug fix

Edit the feedback output to display the name of the commenter

@ js/feedback.js

```javascript
 $.each(data,function(key, item) {
   output += '     <div class="feedback-item item-list media-list">';
   output += '       <div class="feedback-item media">';
   output += '         <div class="feedback-info media-body">';
   output += '           <div class="feedback-head">';
   output += '             <div class="feedback-title">' + item.title + ' <small class="feedback-name label label-info">' + item.name + '</small></div>';
   output += '           </div>';
   output += '           <div class="feedback-message">' + item.message + '</div>';
   output += '         </div>';
   output += '       </div>';
   output += '     </div>';
 });
```





## Implement fs module

feedbackData is an object in the node servermemory.  When you restart the server it will disappear (Or, a refresh of the server, like when you write new code).  For it to persist we need to write it to the json file.  For that we use fs (file system) module.

Its a standard npm module so no need to install jsut require.

@ routes/api.js

```javascript
var fs = require('fs');
```

save 

```javascript
fs.writeFile('app/data/feedback.json', JSON.stringify(feedbackData), 'utf8', function(err) {
  console.log(err);
});
```



## Edit start script

```json
"start": "nodemon -e css,ejs,js,json --watch app --ignore feedback.json"
```

ignore feedback.json so the server doesn't reboot every time someone adds a comment.

## Check app functions

```bash
npm start
```

Check the feedback.json file and see that new comments are being written to the file.

## Commit changes

```bash
git add . && git commit -m
```



# Chapter 04-04

Handling Delete requests

Add delete button on the feedback list with the id of the comment it is associated with

```js
output += '<div class="media-left"><button class="feedback-delete btn btn-xs btn-danger"><span id="' + key + '" class="glyphicon glyphicon-remove"></span></button></div>';
```

the key is the id.

## Handle the click event for the delete button

```javascript
  $('.feedback-messages').on('click', function(e) {
      if (e.target.className == 'glyphicon glyphicon-remove') {
        $.ajax({
          url: 'api/' + e.target.id,
          type: 'DELETE',
          success: updateFeedback
        }); //ajax
      } // the target is a delete button
  }); //feedback messages
```



target the click event on the delete button specifically 

```javascript
if (e.target.className == 'glyphicon glyphicon-remove')
```



While we used a jQuery .post() method to post comments here we use $.ajax()  why is not explained (look up jQuery verbs)



Recall the target id is set to the json key ```<span id="' + key + '" class="glyphicon glyphicon-remove">``` and so ```e.target.id``` is all we need to find the item in the json data.

 ## API route for delete request

@ routes/api.js

```javascript
router.delete('/api/:id', function(req, res) {
  feedbackData.splice(req.params.id, 1);
  fs.writeFile('app/data/feedback.json', JSON.stringify(feedbackData), 'utf8', function(err) {
    if (err){
      console.log(err);
    }
  });
  res.json(feedbackData);
});
```



## Check app functions

```bash
npm start
```

Messages can be deleted.

## Commit changes

```bash
git add . && git commit -m
```



# Chapter 05-01

Chat app using Socket.io



## Add chat route

@ app.js

```javascript
app.use(require('./routes/chat'));
```



## Create Route chat.js

@ routes/chat.js

The heart of which is chat form.

```javascript
<form name="chatForm" class="form-horizontal chat-form">
  <div class="form-group">
    <label for="chat-username" class="col-sm-2 control-label">Name</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="chat-username" required placeholder="Enter your name">
    </div><!-- col-sm-10 -->
  </div><!-- form-group -->
  <div class="form-group">
    <label for="chat-message" class="col-sm-2 control-label">Message</label>
    <div class="col-sm-10">
      <div class="input-group">
        <input type="text" placeholder="Enter a message, then press enter" class="form-control" id="chat-message" rows="2" autocomplete="off"
         required>
        <span class="input-group-btn">
          <button id="chat-submit" class="btn btn-info" type="submit">Chat</button>
        </span>
      </div><!-- input-group -->
    </div><!-- col-sm-10 -->
  </div><!-- form-group -->
</form>
```



## Add chat link to menu

@ header.ejs

```ejs
<li><a href="/chat">Chat</a></li>
```



