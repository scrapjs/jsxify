'use strict'

var detect = require('./lib/detect')

module.exports = jsxify

function jsxify (target, props, children) {
	var type = detect(target) || 'dom'

	return jsxify[type](target, props, children)
}

// by default exports single dom
jsxify.dom = require('./dom')
