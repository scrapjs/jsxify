'use strict'

var detect = require('./lib')
var hs = require('hyperscript')

var cache = {}

module.exports = function h (component, props, children) {
	if (typeof component === 'string') return hs(component, props, children)

	var key = props && (props.key || props.id)
	var fw = detect(component)
	var instance

	// if key is passed by any way - cache/fetch instance
	if (key !== undefined) {
		instance = cache[key]

		if (!instance) instance = cache[key] = fw.create(component, props, children)
	}

	// if key is undefined - create new instance every time
	else {
		instance = fw.create(component, props, children)
	}

	return fw.render(instance, props, children)
}

