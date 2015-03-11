ga-browser
==========
Google Analytics for the browser as a browserify/CommonJS module.

This is a small module that lets you call the tracking function of google analytics (`ga`) using `require()`:

```javascript
var analytics = require('ga-browser')();
analytics('create', 'UA-XXXX-Y', 'auto');
analytics('send', 'pageview', {
        'page': '/my-new-page',
        'title': 'My New Page Title'
});
```

If you use this module in node.js instead of in a browser, calling the `analytics()` function will have no effect. This is useful if you are sharing code between the client & server. _(server side tracking using google analytics is also possible, but beyond the scope if this particular module)_

Usage
-----
This module takes care of handling the global google analytics object, the tracking snippit is no longer required. You only need to load the google analytics javascript file.

The original javascript snippet looks like this:
```
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-XXXX-Y', 'auto');
ga('send', 'pageview');
</script>
```

When using this module, you can replace that snippet with:
```html
<script async src="//www.google-analytics.com/analytics.js"></script>
<script async src="/myBrowserifyBundle.js"></script>
```

One of your modules should then contain:
```javascript
var analytics = require('ga-browser');
analytics('create', 'UA-XXXX-Y', 'auto');
analytics('send', 'pageview', {
        'page': '/my-new-page',
        'title': 'My New Page Title'
});
```



Extras
------
```javascript
console.log(require('ga-browser').scriptUrl);
// //www.google-analytics.com/analytics.js
```

```javascript
console.log(require('ga-browser').debugScriptUrl);
// //www.google-analytics.com/analytics_debug.js
```

```javascript
console.log(require('ga-browser').getScriptMarkup());
// <script async="async" src="//www.google-analytics.com/analytics.js"></script>
```

```javascript
console.log(require('ga-browser').getScriptMarkup(true));
// <script async="async" src="//www.google-analytics.com/analytics_debug.js"></script>
```

```javascript
require('ga-browser').insertScript(document);
// adds the <script> element to the given DOM Document
```

```javascript
require('ga-browser').insertScript(document.head);
// adds the <script> element to the given <head> element
```

Content Security Policy
-----------------------
Unlike google analytics' default snippit, this module is compatible with [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/Security/CSP). It even works if `unsafe-inline` and `unsafe-eval` are not enabled.

You should make sure that `script-src`, `connect-src` and `img-src` allow `www.google-analytics.com`.