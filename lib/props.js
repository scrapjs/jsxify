'use strict'

var camel = require('camelcase')
var extend = Object.assign//require('object-assign')

// normalize properties object
// detect on-
// detect data-
// detect jsx-
// split reserved
module.exports = function parseProps(srcProps) {
	var props = extend({}, srcProps)
	var result = { key: props.key != null ? props.key : props.id }

	result.on = pickSet(props, 'on')
	result.jsx = pickSet(props, 'jsx')
	result.data = pickSet(props, 'data')

	result.attributes = props

	return result
}

// on-something, onsomething, onSomething → on: {something}
function pickSet (props, prefix) {
	var l = prefix.length

	var set

	// on={{something}}
	if (props[prefix]) {
		set = props[prefix]
		delete props[prefix]
		return set
	}

	set = {}
	for (var name in props) {
		if (name.substr(0, prefix.length) === prefix) {
			// on-something
			if (name[prefix.length] === '-') {
				set[camel(name.substr(1))] = props[name]
			}
			// onSomething, onsomething
			else {
				set[camel(name)] = props[name]
			}

			delete props[name]
		}
	}

	return set
}
