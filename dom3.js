
module.exports = removed;

/**
 * Watch for removal with a DOM3 MutationEvent.
 *
 * @param {Element} el
 * @param {Function} fn
 * @api private
 */

function removed(el, fn) {
  function cb(mutationEvent) {
    var target = mutationEvent.target
      , children = [].slice.call(target.getElementsByTagName('*'));

    if (target === el || ~children.indexOf(el)) {
      fn(el);
      document.removeEventListener('DOMNodeRemoved', cb);
    }
  }

  document.addEventListener('DOMNodeRemoved', cb);
}
