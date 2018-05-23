'use strict'

module.exports = {
	test: (obj) => {
		if (isClass(component)) {
			// Nanocomponent
			if (component.prototype.__proto__.constructor.name) {
				componentCache[name] = lib.nanocomponent
			}
		}
	},
	create: (props, children) => {
		return new component
	},
	render: (instance, props, children) => {
		return instance.render(props)
	},
	destroy: () => {

	}
}
