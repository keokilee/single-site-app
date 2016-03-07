require('babel-polyfill')

// require all tests in this directory
const testsContext = require.context('.', true, /_spec.jsx?$/)

testsContext.keys().forEach(testsContext)

// require all browser files, but skip the entry point since we cannot render.
const componentsContext = require.context('../../browser/app/', true, /^(?!\.\/entry\.jsx)(.*\.jsx?)$/)
componentsContext.keys().forEach(componentsContext)
