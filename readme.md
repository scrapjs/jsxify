# jsxify [![API Stability](https://img.shields.io/badge/stability-experimental-red.svg?style=flat-square)](https://nodejs.org/api/documentation.html#documentation_stability_index) [![Build Status](https://img.shields.io/travis/dy/jsxify.svg?style=flat-square)](https://travis-ci.org/dy/jsxify/)

**Work in progress**

Enable JSX for everything.

## Usage

[![npm install jsxify](https://nodei.co/npm/jsxify.png?mini=true)](https://npmjs.org/package/jsxify/)

```jsx
// require jsx
const h = require('jsxify')
require('jsxify-react')

// require components
const NanoButton = require('./nanobutton')
const Scatter2D = require('regl-scatter2d')
const { Menu, MenuItem } = require('rc-menu')
const ReactDOM = require('react-dom')
const React = require('react')
const Dropdown = require('vue-dropdown')

// create app
<document.body>
	<header>
		<Menu orient="horiz">
			<MenuItem />
			<MenuItem />
			<MenuItem id="lang">
				<Dropdown items={['fr', 'en']} />
			</MenuItem>
		</Menu>
	</header>
	<main>
		<Scatter2d data={} />
		<NanoButton ...props/>
	</main>
</document.body>
```

To compile JSX, any of [jsx-transform](https://www.npmjs.com/package/jsx-transform) or [babel](https://babeljs.io/docs/plugins/transform-react-jsx/) can be used.

## API

### import h from 'jsxify'

Return hyperscript-compatible function, converting JSX to DOM. To register framework converters, include `jsxify-*` specific packages.

```jsx
import h from 'jsxify'
import 'jsxify-react'
import 'jsxify-vdom'

import ReactComponent from './react-component'
import VWidget from './vdom-component'

h(ReactComponent, props, [
	h(VWidget)
])
```

### h(target, props?, children?)

Return element based on `target` argument, apply properties and append children. Element type is created according to the scheme:

```jsx
<document.body>					// returns HTMLElement
	<div>						// creates HTMLElement by hyperscipt
		<VDOMWidget>			// converts virtual-dom widget to HTMLElement
			<div>				// creates VNode by virtual-dom/h
				<ReactComp>		// converts React.Component to virtual-dom
					<div></div>	// creates React.Element by React.createElement
				</ReactComp>
			</div>
		</VDOMWidget>
	</div>
</document.body>
```

Created node type depends on the parent component framework, eg. nodes inside virtual-dom widget are `VNode`s, nodes inside of react component are `React.Element`s, etc. To force the result type, use `jsx-type` property:

```jsx
<div jsx-type='string'>Foo</div>	// creates HTML string
<div jsx-type='dom'>Bar</div>		// creates DivElement
<div jsx-type='vdom'>Baz</div>		// creates VNode
```

`props` object normalizes `on-`, `data-` and `jsx-` properties to `on: {}`, `data: {}`, `jsx: {}` objects.


## Supported Frameworks

<!--
* [hyperx](https://www.npmjs.com/package/hyperx)
* [nanocomponent](https://www.npmjs.com/package/nanocomponent)
* [hyperscript](https://www.npmjs.com/package/hyperscript)
* [virtual-dom](https://www.npmjs.com/package/virtual-dom)
* [vue](https://www.npmjs.com/package/vue)
* [react](https://www.npmjs.com/package/react)
* [preact](https://www.npmjs.com/package/preact)
* [base-element](https://www.npmjs.com/package/base-element)
* [ember](https://www.npmjs.com/package/ember)
* [mercury](https://www.npmjs.com/package/mercury)
* [webcomponent](https://www.npmjs.com/package/webcomponent)
* [virtual-dom](https://www.npmjs.com/package/virtual-dom)
* [lit-element](https://github.com/Polymer/lit-element)
* [fun-component](https://github.com/tornqvist/fun-component)
* [marko-js](https://github.com/tornqvist/marko-js)
* [svelte](https://github.com/sveltejs/svelte)
* [deku](https://www.npmjs.com/package/deku)
* [etch](https://github.com/atom/etch)
* -->


## Motivation

Creating a centralized component like `hyperdom`, `nanocomponent` and a bunch of framework adapters seems tempting but not feasible task, since there are many miscellaneous framework-based components, especially for react/preact/vdom/vanilla.

Instead, creating set of framework converters removes incompatibilities and creates single unopinionated workflow. At least enables react infrastructure for non-react public.

`jsxify` provides a JSX glue, making UI development easy, natural and framework agnostic.

## License

© 2018 Dmitry Yv. MIT License
