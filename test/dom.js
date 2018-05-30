'use strict'

var t = require('tape')
var h = require('../dom')
var morph = require('morphdom')
var Nanobutton = require('./components/nanobutton')


/**

altogether

<main>
	<Menu>
		<MenuItem/>
		<MenuItem/>
	</Menu>
	<canvas id='plot'/>
	<Scatter canvas='#plot'/>
	<Cartesian canvas='#plot'/>
	<Nanobutton />
</main>

 */


/**

deletion undefineds

<Hello what="World"/>

<Hello what="World"/>
<Hello what="Universe"/>

<Hello what="Universe"/>

 */


/**

should identify both class and instance

var Text = require('regl-text')
var TextInst = Text()

<Text data={} />
<TextInst data={} />

*/


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

