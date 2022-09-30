for the browser, currently i dont have any preference, at the moment i'm using chromium based browsers
so i created a little extension to replace **new Tab Window**

##1st
create a `manifest.json`
```JSON
{
    "name": "Chromepage",
    "description": "Personalized override of Chrome New Tab page.",
    "version": "1.0",
    "manifest_version": 2,
    "chrome_url_overrides": { "newtab": "index.html" }
}
```

##2nd
create the index html with your fabourite code, or just use [mine](newTab/index.html)

##3d
add the extension to chromium based web browsers
1. go to `chrome://extensions`
2. enable **developer mode**
3. click on **load unpacked**
4. select the containing folder of `index.html` and `manifest.json`

original tutorial [here](https://blog.karenying.com/posts/customize-chrome-new-tab-page-in-30-seconds)

