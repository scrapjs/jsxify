'use strict'

let WeakMap = require('es6-weak-map')
let getKey = require('primitive-pool')
let h = require('hyperscript')
let morph = require('morphdom')

module.exports = jsxify
jsxify.h = jsxify
jsxify.render = render


let containerStore = new WeakMap
let instancesStore = new WeakMap

// eval JSX
function jsxify (target, o, children) {
	if (o.container) {
		render(o.container)
		return null
	}

	// TODO: normalize args here to valid [target, props, children]
	return arguments
}

// mount tree into the container
function render (fragment, container) {
	if (typeof container === 'string') {
		let c = document.querySelector(container)
		if (!c) throw Error('Cannot find element `' + container + '`')
		container = c
	}

	if (!container) throw Error('Unknown container `' + arguments[1] + '`')

	let containerStash = containerStore.get(container)
	if (!containerStash) {
		containerStash = {
			// instances per target
			instances: new WeakMap,

			// list of targets (components/constructors/vnodes)
			targets: []
		}
		containerStore.set(container, containerStash)
	}

	if (!Array.isArray(fragment)) fragment = [fragment]

	// count number of instances per target within the container
	let targetIds = new WeakMap, targetKeys = {}

	fragment.forEach((VNode) => {
		let [target, props, children] = VNode

		// get target-specific instances
		let targetKey = getKey(target)
		let instances = containerStash.instances.get(targetKey)
		if (!instances) {
			instances = { key: {}, id: [] }
			containerStash.instances.set(targetKey, instances)
			containerStash.targets.push(targetKey)
		}

		let key = props.id != null ? props.id : props.key,
			instance

		// key property stores instance by the key
		if (key !== undefined) {
			instance = instances.key[key]

			if (!instance) {
				instance = instances.key[key] = create(target, props, children, container)
				instancesStore.get(instance).key = key
			}

			targetKeys[key] = true
		}
		// undefined key uses stack of children as instances
		else {
			let id = targetIds.get(targetKey) || 0
			instance = instances.id[id]
			if (!instance) {
				instance = create(target, props, children, container)
				instances.id[id] = instance
				instancesStore.get(instance).id = id
			}
			targetIds.set(targetKey, ++id)
		}

		update(instance, props, children, container)
	})

	// destroy instances not defined by JSX
	containerStash.targets.forEach((targetKey) => {
		let instances = containerStash.instances.get(targetKey)

		for (let i = 0; i < instances.id.length; i++) {
			let count = targetIds.get(targetKey)
			if (!count) {
				destroy(instances.id[i], container)
			}
			else {
				count--
				targetIds.set(targetKey, count)
			}
		}

		for (let key in instances.key) {
			if (!targetKeys[key]) {
				destroy(instances.key[key], container)
				delete instances.key[key]
			}
		}
	})
}


// create a new instance of a target
function create (target, props, children, container) {
	let instance

	if (target.call) {
		instance = new target(props, children)
	}

	else if (typeof target === 'string') {
		instance = h(target, props, children)
	}

	else if (isElement(target)) {
		// TODO: detect element
		// // apply props
		// for (var name in props.attributes) {
		// 	target.setAttribute(name, props.attributes[name])
		// }

		// // apply dataset
		// extend(target.dataset, props.data)

		// // rebind events
		// for (var event in props.on) {
		// 	var listener = props.on[event]
		// 	target.removeEventListener(event,listener)
		// 	target.addEventListener(event, listener)
		// }

		// // make sure children exist in proper order
		// for (var i = 0; i < children.length; i++) {
		// 	var child = convert(children[i], 'dom')
		// 	if (!target.contains(child)) target.appendChild(child)
		// }

		// var targetStash = stash.get(target)
		// targetStash.src = target
		// targetStash.type = 'dom'
		// targetStash.dom = target
		// targetStash.props = props
		// targetStash.children = children

		// return result
	}

	// TODO: detect all other types of targets

	// create instance stash
	if (!instancesStore.get(instance)) {
		instancesStore.set(instance, {})
	}

	return instance
}

// update instance
function update (instance, props, children, container) {
	if (instance.update) instance.update(props, children)

	if (instance.render) {
		let el = instance.render()

		if (el) {
			let stash = instancesStore.get(instance)

			if (stash.element) {
				stash.element = morph(stash.element, el)
			}
			else {
				container.appendChild(el)
				stash.element = el
			}
		}
	}
}

// destroy instance
function destroy (instance, container) {
	// TODO: add even hook if required
	let stash = instancesStore.get(instance)
	if (stash.element) {
		container.removeChild(stash.element)
		instancesStore.delete(instance)
	}

	if (instance.destroy) instance.destroy()
}

function isElement(obj) {
	return (
		obj &&
		typeof obj.nodeName === 'string' &&
		typeof obj.appendChild === 'function' &&
		typeof obj.getBoundingClientRect === 'function'
	)
}
