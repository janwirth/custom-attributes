# Web Attributes

Prototypical implementation in `web-attributes.js` and usage in `log-attribute.js`.

```javascript
webAttribute('log', ([value, el]) => console.log(value, el))
```

```html
<div log="hello world">
</div>
```
