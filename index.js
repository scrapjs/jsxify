'use strict'

var detect = require('./lib/detect')

module.exports = jsxify

function jsxify (target, props, children) {
	if (!target) return

	for (var i = 0; i < jsxify.libs.length; i++) {
		var lib = jsxify.libs[i]
		if (lib.test(target)) return lib.h(target, props, children.map(
			function (child) { return child[lib.name] }
		))
	}
}

// registered libs
jsxify.libs = []

// register libs
jsxify.use = function use (list) {
	if (arguments.length > 1) {
		list = arguments
	}

	for (var i = 0; i < list.length; i++) {
		var lib = validate(list[i])

		jsxify.libs[i] = lib
	}

	return jsxify
}

function validate (lib) {
	if (!lib.test) throw Error('Lib should provide `test` function')
	if (!lib.name) throw Error('Lib should provide `name` property')
	if (!lib.h) throw Error('Lib should provide `h` hyperscript function implementation')

	return lib
}

// register set of deafult libs
jsxify.use(
	require('./string'),
	require('./dom'),
	require('./vdom'),
	require('./preact'),
	require('./react'),
	require('./nanocomponent'),
	require('./gl-component')
)
