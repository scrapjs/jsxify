'use strict'

var stash = require('./stash')
var jsxify = require('../')
var detect = require('./detect')

module.exports = convert

// convert element/instance to target framework
// by creating instance from scratch
function convert (target, type) {
	if (Array.isArray(target)) {
		return target.map(function (target) {
			return convert(target, type)
		})
	}

	// text, number, null content
	if (!target || typeof target === 'number' || typeof target === 'string') {
		return target
	}

	// already created child possibly for the other framework
	var targetStash = stash.get(target)

	// use already calculated child
	if (targetStash[type]) {
		return targetStash[type]
	}

	// create child in target base
	var targetType = targetStash.type

	if (!jsxify[targetType]) throw Error('Unknown type `' + targetType + '`')
	if (!jsxify[targetType][type]) throw Error('Unknown converter `' + targetType + '` to `' + type + '`')

	var result = jsxify[targetType][type](targetStash.src, targetStash.props, targetStash.children)
	targetStash[type] = result

	stash.set(result, targetStash)

	return result
}
