'use strict'

var frameworks = [
	require('./vdom'),
	require('./preact'),
	require('./react'),
	require('./gl-component'),
	require('./nanocomponent')
]

function detect (component) {
	for (var name in frameworks) {
		var type = frameworks[name]
		if (type.test && type.test(component)) return type
	}

	throw Error('Unknown type of component `' + component + '`')
}

module.exports = detect
