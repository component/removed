
/**
 * Module dependencies.
 */

var withinDocument = require('within-document');

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
