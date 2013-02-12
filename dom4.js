
/**
 * Module dependencies.
 */

var withinDoc = require('within-document')
  , Observer = require('mutation-observer');

/**
 * Expose `removed`.
 */

module.exports = removed;

/**
 * Watched elements.
 *
 * @api private
 */

var watched = [];

/**
 * Set up observer.
 *
* @api private
 */

var observer = new Observer(onchanges);

/**
 * Generic observer callback.
 *
 * @api private
 */

function onchanges(changes){
  // keep track of number of found els
  var found = 0;

  for (var i = 0, l = changes.length; i < l; i++) {
    if (changes[i].removedNodes.length) {
      // allow for manipulation of `watched`
      // from within the callback
      var w = watched.slice();

      for (var i2 = 0, l2 = w.length; i2 < l2; i2++) {
        var el = w[i2][0];

        // check that the element is no longer in the dom
        if (!withinDoc(el)) {
          watched.splice(i2 - found++, 1)[0][1]();

          // abort if nothing else left to watch
          if (!watched.length) observer.disconnect();
        }
      }

      // we only need to loop through watched els once
      break;
    }
  }
}

/**
 * Starts observing the DOM.
 *
 * @api private
 */

function observe(){
  var html = document.documentElement;
  observer.observe(html, {
    subtree: true,
    childList: true
  });
}

/**
 * Watches for the removal of `el` from DOM.
 *
 * @param {Element} el
 * @param {Function} fn
 * @api private
 */

function removed(el, fn){
  // reattach observer if we weren't watching
  if (!watched.length) observe();

  // we add it to the list of elements to check
  watched.push([el, fn]);
}
