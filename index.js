'use strict'

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

	function h (name, props, children) {
		// <document.body>
		if (isElement(name)) {

			morph(name, )
			var rootNode = name

			var tree = VNode('div', props, children)

			var patches = diff(tree, newTree)
			patch(rootNode, patches)
		}

		if (!component) return h(name, props, children)

		var component = detect(name)

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


	return jsx
}
