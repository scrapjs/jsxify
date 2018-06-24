'use strict'

var t = require('tape')
var {h, render} = require('../')


t('create/update/render methods', t => {
	let el = document.body.appendChild(document.createElement('div'))

	class X {
		constructor(prop, children) {
			// console.log('create', prop.a)
		}

		update(prop) {
			this.text = prop.a
			// console.log('update', this.text)
		}

		render() {
			// console.log('render', this.text)

			// return this.node
			return document.createTextNode(this.text)
		}

		destroy() {
			// console.log('destroy', this.text)
		}
	}

	// <X a=1 b=2/>
	let x = h(X, {a:1})

	render(x, el)
	t.equal(el.innerHTML, '1' ,'this should create new X')

	let y = h(X, {a: 3})
	render([x, y], el)
	t.equal(el.innerHTML, '13', 'this should create new X and update prev x')

	let z = h(X, {a: 3})
	render(z, el)
	t.equal(el.innerHTML, '3', 'this should destroy prev y and update x')

	t.end()
})
