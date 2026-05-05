'use strict'
// Shim for libraries (e.g. @sanity/vision) that import useEffectEvent from 'react'
// before it was added to the stable public API in React 19.
//
// IMPORTANT: require 'react/index.js' (a subpath), not bare 'react'.
// next.config.js aliases bare 'react' to this file with an EXACT-match `$`
// suffix, so subpath imports like 'react/index.js' bypass the alias and
// resolve to the real React package. Using bare 'react' here would loop
// back to this same shim.
const React = require('react/index.js')
module.exports = Object.assign({}, React, {
  useEffectEvent:
    React.useEffectEvent ||
    React.experimental_useEffectEvent ||
    // Minimal polyfill: just return the callback as-is.
    // This is safe because useEffectEvent is only used to create stable
    // event-handler wrappers — returning fn unchanged preserves the behaviour
    // while avoiding the "not exported" build error.
    function useEffectEvent(fn) { return fn },
})
