# Chapter 03-04

Creating Partials Through Includes



## Add Partial templates

Under views create a partials folder and add partial templates according to your own project.  This is arbitrary and project specific.

For this tutorial:

```bash
├── content
│   ├── artworklist.ejs
│   ├── maincontent.ejs
│   ├── speakerslist.ejs
│   └── whoshouldcome.ejs
└── template
    ├── head.ejs
    ├── header.ejs
    └── jsdefaults.ejs
```

Cut and paste common code from index.ejs and and speakers.ejs into partials and then include those partials in index.ejs and and speakers.ejs in place of the code you cut and paste.



## Inlcuding partials in a template

Straight forward

Eg: @ index.ejs

```ejs
<!DOCTYPE html>
<html>
  <head><% include partials/template/head.ejs %></head>
  <body id="<%= pageID %>">
    <% include partials/template/header.ejs %>
    <div class="container">
      <div class="row">
        <div class="col-sm-8">
        <% include partials/content/maincontent.ejs %>
        </div><!-- primary -->
        <aside class="col-sm-4">
          <% include partials/content/whoshouldcome.ejs %>
          <% include partials/content/artworklist.ejs %>
        </aside><!-- secondary -->
      </div>
    </div><!-- container -->
    <% include partials/template/jsdefaults.ejs %>
  </body>
</html>

```



Once the index.ejs is built like this it is easier to build the speakers.ejs page.  You can copy and modify the index.ejs page.



```ejs
<!DOCTYPE html>
<html>
  <head><% include partials/template/head.ejs %></head>
  <body id="<%= pageID %>">
    <% include partials/template/header.ejs %>
    <div class="container">
      <div class="row">
        <div class="col-sm-8">
        <% include partials/content/speakerslist.ejs %>
        </div><!-- primary -->
        <aside class="col-sm-4">
          <% include partials/content/artworklist.ejs %>
        </aside><!-- secondary -->
      </div>
    </div><!-- container -->
    <% include partials/template/jsdefaults.ejs %>
  </body>
</html>
```



## Update the speaker.js route file

@ speakers.js

Work on the speakers route: paste in the index.js root route code since has alot of what we want and we can modify it

```javascript
router.get('/speakers', function(req, res) {
  var data = req.app.get('appData');
  var pagePhotos = [];

  data.speakers.forEach(function(item) {
    pagePhotos = pagePhotos.concat(item.artwork);
  });

  res.render('index', {
    pageTitle: 'Home',
    artwork: pagePhotos,
    pageID: 'home'
  });

});
```

Modify the render function

```javascript
  res.render('speakers', {
    pageTitle: 'Speakers',
    artwork: pagePhotos,
    pageID: 'speakers'
  });
```

Now the speakers page looks like the homepage but the main content is empty an ready for a speaker list..

add a variable to get speakers data

```javascript
var pageSpeakers = data.speakers;
```

Make that speakers variable available to the template by adding it to th render array

```javascript
  res.render('speakers', {
    pageTitle: 'Speakers',
    artwork: pagePhotos,
    speakers: pageSpeakers,
    pageID: 'speakers'
  });
```



## Loop though speakers variable to make a speakers list

In the speakers list partial we can loop through the speakers variable

```ejs
<article class="speakerslist">
  <div class="container">
    <div class="row">
        <% speakers.forEach(function(item) { %>
        <div class="col-sm-8">
          <h3 class="speakerslist-title"><%= item.title %></h3>
          <h5 class="speakerslist-name">with <a href="/speakers/<%= item.shortname %>"><%= item.name %></a></h5>
          <p class="speakerslist-info"><a href="/speakers/<%= item.shortname %>">
            <img class="speakerslist-img img-circle pull-left" src="/images/speakers/<%= item.shortname %>_tn.jpg" alt="Photo of <%= item.name %>"></a>
            <%= item.summary %>
          </a></p>
        </div>
        <%  }); %>
    </div><!-- row -->
  </div><!-- container -->
</article>
```

using a forEach() loop

```ejs
speakers.forEach(function(item)
```



## Check app functions

```bash
npm start
```

Speaker list on speakers route is working

## Commit changes

```bash
git add . && git commit -m
```



