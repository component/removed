
/**
 * Expose `removed`.
 */

exports = module.exports = removed;

/**
 * Default interval.
 */

exports.interval = 200;

/**
 * Watch for removal and invoke `fn(el)`.
 *
 * @param {Element} el
 * @param {Function} fn
 * @api public
 */

function removed(el, fn){
  interval(el, fn);
}

/**
 * Watch for removal with an interval.
 *
 * @param {Element} el
 * @param {Function} fn
 * @api private
 */

function interval(el, fn) {
  var id = setInterval(function(){
    if (el.parentNode && withinDocument(el)) return;
    clearInterval(id);
    fn(el);
  }, exports.interval);
}

/**
 * Check if `el` is within the document.
 *
 * @param {Element} el
 * @return {Boolean}
 * @api private
 */

function withinDocument(el) {
  var node = el;
  while (node = node.parentNode) {
    if (node == document) return true;
  }
  return false;
}