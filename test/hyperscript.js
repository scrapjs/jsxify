'use strict'

let t = require('tape')
let h = require('../')(require('hyperscript'), require('./components'))


t('nanocomponent', t => {
	function render (color) {
		return <Nanobutton color={color}>
			<em>Button</em>
		</Nanobutton>
	}

	document.body.appendChild(render('red'))
	setTimeout(() => {
		document.body.appendChild(render('green'))
		setTimeout(() => {
			document.body.appendChild(render('blue'))
		}, 1000)
	}, 1000)
})
