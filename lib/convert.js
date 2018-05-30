'use strict'

module.exports = convert

// convert target from lib to lib
function convert (target, fromLib, toLib) {
	var converter = fromLib[to] || fromLib.vdom || fromLib.h

	converter(target)
}
