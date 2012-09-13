
# removed

  Invoke a callback when a DOM element is removed.

## Installation

    $ component install component/removed

## Example

```js
var removed = require('removed');
removed(el, function(){
  console.log('element was removed!');
});
```

## API

### removed(el, fn)

  Invokes `fn` when `el` is removed from the DOM.

### .interval

  The `setInterval` fallback uses `removed.interval`, defaulting to 200ms.

# License

  MIT
