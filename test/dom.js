'use strict'

let t = require('tape')
let h = require('../dom')
let morph = require('morphdom')
let Nanobutton = require('./components/nanobutton')

t('nanocomponent', function (t) {
	function render (color) {
		morph(document.body,
			h('body', null, [
				h(Nanobutton, {color:color}, [
					h('em', null, 'Button')
				])
			])
		)
	}

	render('red')
	setTimeout(function () {
		render('green')
		setTimeout(function () {
			render('blue')
		}, 1000)
	}, 1000)
})

