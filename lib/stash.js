'use strict'

// node instance associated stash, Node <<---> Stash
// Node is final result of jsxify, never the source class

var WeakMap = require('es6-weak-map')
var storage = new WeakMap

module.exports = info
info.get = get
info.set = set

function info (target, stash) {
	if (arguments.length < 2) return get(target)
	return set(target, stash)
}

function get (target) {
	var targetInfo = storage.get(target)

	if (!targetInfo) {
		targetInfo = {}
		storage.set(target, targetInfo)
	}

	return targetInfo
}

function set (target, stash) {
	storage.set(target, stash)

	return stash
}
