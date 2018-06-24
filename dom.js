'use strict'

var parseProps = require('./lib/props')
var detect = require('./lib/detect')
var stash = require('./lib/stash')
var convert = require('./lib/convert')
var jsxify = require('./')

var hyperscript = require('hyperscript')
var extend = require('object-assign')

module.exports = dom

// return
function dom (target, props, children) {
	if (!target) return

	if (!Array.isArray(children)) {
		children = [].slice.call(arguments, 2)
	}

	// normalize props
	var props = parseProps(props)

	// h('div')
	if (typeof target === 'string') {
		// FIXME: properly provide events and key in props
		var result = dom.h(target, props, convert(children, 'dom'))

		var targetStash = stash.get(result)
		targetStash.src = target
		targetStash.type = 'h'
		targetStash.dom = result
		targetStash.props = props
		targetStash.children = children

		return result
	}

	// h(fn => plain)
	if (typeof target === 'function') {
		var result = target(props, convert(children, 'dom'))

		var targetStash = stash.get(result)
		if (!targetStash.type) {
			targetStash.type = 'fn'
			targetStash.src = target
			targetStash.props = props
			targetStash.children = children
		}

		targetStash.dom = result

		return result
	}

	// h(document.body)
	if (dom.test(target)) {
		// apply props
		for (var name in props.attributes) {
			target.setAttribute(name, props.attributes[name])
		}

		// apply dataset
		extend(target.dataset, props.data)

		// rebind events
		for (var event in props.on) {
			var listener = props.on[event]
			target.removeEventListener(event,listener)
			target.addEventListener(event, listener)
		}

		// make sure children exist in proper order
		for (var i = 0; i < children.length; i++) {
			var child = convert(children[i], 'dom')
			if (!target.contains(child)) target.appendChild(child)
		}

		var targetStash = stash.get(target)
		targetStash.src = target
		targetStash.type = 'dom'
		targetStash.dom = target
		targetStash.props = props
		targetStash.children = children

		return result
	}

	// h(OtherComponent) → h(OtherComponentAdapter)
	var targetType = detect(target)

	if (!jsxify[targetType]) throw Error('Unknown component `' + target + '`')
	if (!jsxify[targetType].dom) throw Error('Unknown converter `' + targetType + '` to dom')

	var result = jsxify[targetType].dom(target, props, children)

	var targetStash = stash.get(result)
	targetStash.src = target
	targetStash.type = targetType
	targetStash.props = props
	targetStash.children = children
	targetStash.dom = result

	return result
}

// element builder
dom.h = hyperscript

// component tester
dom.test = function (obj) {
  return (
  	obj &&
    typeof obj.nodeName === 'string' &&
    typeof obj.appendChild === 'function' &&
    typeof obj.getBoundingClientRect === 'function'
  )
}

// convert element to string
dom.string = function (obj) {
	// TODO
}
