'use strict'

// detect lib by target instance or component
module.exports = function detect (target, libs) {
	if (!target) {
		// Do nothing
	}

	if (isString(target)) {
		// Create and return HTML node
	}

	else if (isFunction(target)) {
		// Call the function with props and children, handle the result again
	}

	else if (isHTMLElement(target)) {
		// Morph children to this element content, apply props; return the HTML
	}

	else if (react.test(target)) {
		// Render children to react component, return the component
		return react.h(target, props, children)
	}

	else if (isPreact(target)) {
		// Render children to preact component, return the component

	}

	else if (isVNode(target)) {
		// Render items to VNode
	}

	else if (isNanocomponent(target)) {

	}

	else if (isGlComponent(target)) {

	}
}
