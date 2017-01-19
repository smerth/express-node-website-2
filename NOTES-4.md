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



## 

# Chapter 04-02

## Add Sample feedback.json





## Create API route





Doesn't render a template instead it serves a datafile

```res.json(feedback);```





## Add route to app





Test api Url



## JS to manage adding that json to a page



```bash
touch public/js/feedback.js
```

use jQuery

```javascript

```







