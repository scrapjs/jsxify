'use strict'

var Nanocomponent = requireSafe('nanocomponent')

module.exports = {
	test: function (o) {
		return isInstance(o, 'Nanocomponent', Nanocomponent)
	},
	create: function (Component, props, children) {
		return new Component()
	},
	render: function (instance, props, children) {
		return instance.render(props)
	},
	destroy: function () {

	}
}

function requireSafe (name) {
	var res
	try {res = require(name)} catch (e) {}
	return res
}

function isInstance (o, className, Ctor) {
	if (!o) return false

	// default case
	if (Ctor && o instanceof Ctor) return true

	if (!o.prototype) return false

	var proto = o.prototype

	// classic case
	if (proto.constructor && proto.constructor.name === className) return true

	// class case
	if (proto.__proto__) {
		if (proto.__proto__.constructor && proto.__proto__.constructor.name === className) return true
	}

	return false
}
