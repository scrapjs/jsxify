'use strict'

var t = require('tape')
var {h, render} = require('../')


t('create/update/render methods', t => {
	class X {
		constructor(prop, children) {
			console.log('create', prop.a)
		}

		update(prop) {
			this.text = prop.a
			console.log('update', this.text)
		}

		render() {
			console.log('render', this.text)

			// return this.node
			return document.createTextNode(this.text)
		}

		destroy() {
			console.log('destroy', this.text)
		}
	}

	// <X a=1 b=2/>
	console.log('---')
	let x = h(X, {a:1})

	// this should create new X
	render(x, document.body)

	console.log('---')
	let y = h(X, {a: 3})

	// this should create new X and update prev x
	render([x, y], document.body)

	console.log('---')
	let z = h(X, {a: 2})

	// this should destroy prev y and update x
	render(z, document.body)

	t.end()
})
