'use strict'

var t = require('tape')

var NanoCompo = require('./component/nano')
var ReactCompo = require('./component/react')
var PreactCompo = require('./component/preact')
var GlCompo = require('./component/gl')
var CustomCompo = require('./component/custom')


var div = document.createElement('div')
var em = document.createElement('em')

var fragment = [
	null,
	'Hello Text',
	function () {
		return 'Hello Function'
	},
	['Hello', ' ', 'List'],
	document.createElement('div'),

	h(null),

	h(div, {class: 'dom'}, [
		h(em, null, 'Hello DOM')
	]),

	h('div', {class: 'hyper'}, [
		h('em', null, 'Hello Hyperscript')
	]),

	h(function () {
		return 'Hello Function Component'
	}),
	h({
		render: function () {
			return 'Hello Object Component'
		}
	}),

	h(VDomWidget),
	h(VDomThunk),

	h(Nanobutton, {color: 'red'}, [
		h('em', null, 'Hello Nanocomponent')
	]),
	h(ReactElement),
	h(ReactCompo),
	h(PreactCompo),
	h(CustomCompo),
	h(GlCompo),
	h(MercuryCompo),
	h(MarcoCompo),
	h(hyperx)

	// dom( vdom( dom() ) )
	// vdom( dom( vdom() ))
	// dom( react( vdom() ) )
	// vdom( preact ( nanocomponent( h() ) ))
])

var result = '<div class="el">' +
	'Hello World' +
	'<em></em>' +
	'123' +
	'<button class="nanobutton" style="color: red"><em>Click</em></button>' +
	'<reactCompo/>' +
	'preactCompo' +
	'customCompo' +
	'glCompo' +
'</div>'


t('dom', function (t) {
	var el = document.createElement('div')

	t.equal(
		h('div', {class: 'el'}, fragment).outerHTML,
		result
	})

	t.equal(
		h(div, {class: 'el'}, fragment).outerHTML,
		result
	)
	t.end()
})


t('vdom', function (t) {
	var el = document.createElement('div')

	t.equal(
		vdom2html(h('div', {class: 'el'}, fragment)),
		result
	})

	t.equal(
		h(div, {class: 'el'}, fragment).outerHTML,
		result
	)

	t.end()
})
