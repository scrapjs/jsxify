'use strict'

var isClass = require('is-class')
var lib = require('./lib')

module.exports = function jsxify (a, b) {
	var components, h

	// sort out args order
	if (typeof a === 'function') {
		h = a
		components = b
	}
	else {
		components = a
		h = b
	}

	if (!h) throw Error('Pass hyperscript-compatible function as an argument')

	// stored components
	var componentCache = {}
	var instanceCache = {}

	function jsx (name, props, children) {
		var component = componentCache[name]

		if (!component) return h(name, props, children)


		var update = component.render || component.update || component.rerender || component.refresh
		var create = component.create || component.init || component.constructor
		var destroy = component.destroy || component.destructor || component.dispose || component.remove || component.delete

		var content

		if (props.key !== undefined) {
			var instance = instanceCache[props.key]

			if (!instance) instance = instanceCache[props.key] = create(props, children)

			content = update(instance, props, children)
		}
		else {
			var instance = create(props, children)
			content = update(instance, props, children)
		}

		return content
	}

	function add (components) {
		if (components.length) {
			for (let i = 0; i < components.length; i++) {
				add(com)
			}
		}

		for (var name in components) {
			var component = components[name]

			if (isClass(component)) {
				// Nanocomponent
				if (component.prototype.__proto__.constructor.name) {
					componentCache[name] = lib.nanocomponent
				}
			}
		}
	}

	add(components)

	jsx.add = jsx.register = jsx.use = add

	return jsx
}
