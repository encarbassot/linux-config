# Browser extensions

for the browser, currently i dont have any preference, at the moment i'm using chromium based browsers:
 - [Brave](brave) - what i currently use (no special reason)
 - [Vivaldi](vivaldi)
 - [Epic privacy browser](epic)
 - [Slim Browser](slim)
 - [Torch](torch)
 - [Comodo Dragon](dragon)
 - [Chrome](chrome)
 - [Opera](opera)
 - [Edge](edge)😅

so i created a little extension to replace **new Tab Window**

## New Tab
### 1. create a `manifest.json`
[manifest.json](newTab/manifest.json)
```JSON
{
  "name": "New Tab by Elio!",
  "version": "1.0",
  "manifest_version": 3,
  "action": {},
  "chrome_url_overrides" : {
    "newtab": "index.html"
  }
}
```

### 2. create the HTML
create the index html with your fabourite code, or just use [mine](newTab/index.html)

### 3. add the extension
add the extension to chromium based web browsers
1. go to `chrome://extensions`
1. enable **developer mode**
1. click on **load unpacked**
1. select the containing folder of `index.html` and `manifest.json`

original tutorial [here](https://blog.karenying.com/posts/customize-chrome-new-tab-page-in-30-seconds)




[Linked pages]:>

[brave]:brave.com
[vivaldi]:https://vivaldi.com/
[edge]:https://www.microsoft.com/en-us/edge
[epic]:https://www.epicbrowser.com/
[slim]:https://www.slimbrowser.net/
[torch]:https://torchbrowser.com/
[comodo]:https://www.comodo.com/home/browsers-toolbars/browser.php
[chrome]:https://www.google.com/intl/es_es/chrome/
[opera]:https://www.opera.com/
