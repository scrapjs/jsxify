'use strict'

var jsxify = require('../')

// detect type by instance or component
module.exports = function detect (target, libs) {
	if (typeof target === 'string') return
	if (typeof target === 'function') return

	for (var name in jsxify) {
		var lib = jsxify[name]

		if (!lib || !lib.test) continue

		if (lib.test(target)) return name
	}

	return
}
