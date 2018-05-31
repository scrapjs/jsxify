# jsxify [![API Stability](https://img.shields.io/badge/stability-experimental-red.svg?style=flat-square)](https://nodejs.org/api/documentation.html#documentation_stability_index) [![Build Status](https://img.shields.io/travis/dy/jsxify.svg?style=flat-square)](https://travis-ci.org/dy/jsxify/)

**Work in progress**

Enable JSX for everything.

## Usage

[![npm install jsxify](https://nodei.co/npm/jsxify.png?mini=true)](https://npmjs.org/package/jsxify/)

```jsx
const jsxify = require('jsxify')
const h = jsxify(
	require('jsxify-dom'),
	require('jsxify-react'),
	require('jsxify-nano'),
	require('jsxify-gl'),
	require('jsxify-vue')
)

const NanoButton = require('./nanobutton')
const Scatter2D = require('regl-scatter2d')
const { Menu, MenuItem } = require('rc-menu')
const Dropdown = require('vue-dropdown')

document.body.appendChild(
<div>
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
</div>
)
```

To compile JSX, any of [jsx-transform](https://www.npmjs.com/package/jsx-transform) or [babel](https://babeljs.io/docs/plugins/transform-react-jsx/) can be used.

## API

### var h = jsxify(to, from, ...rest)

Create hyperscript function for the target framework `to`, able to convert from frameworks `from` and the `rest`. Frameworks are enabled by `jsxify-*` packages.

```jsx
import jsx from 'jsxify'
import react from 'jsxify-react'
import vdom from 'jsxify-vdom'

import ReactComponent from './react-component'
import VWidget from './vdom-component'

let h = jsx(react, vdom)

h(ReactComponent, props, [
	h(VWidget)
])
```

### h(target, props?, children?)

Hyperscript function returning instance of the component for the target framework.

Example:

```jsx
var el = (
<div>						// creates HTMLElement by hyperscipt
	<VDOMWidget>			// converts virtual-dom widget to HTMLElement
		<div>				// creates VNode by virtual-dom/h
			<ReactComp>		// converts React.Component to virtual-dom
				<div></div>	// creates React.Element by React.createElement
			</ReactComp>
		</div>
	</VDOMWidget>
</div>
)
```

The function normalizes `key`/`id` properties, which are considered equivalent.
Also it normalizes `on-` and `data-` properties to `on={{}}`, `data{{}}` objects.

## Supported Frameworks

* [vhtml](https://www.npmjs.com/package/vhtml)
* [hyperscript](https://www.npmjs.com/package/hyperscript)
* [virtual-dom](https://www.npmjs.com/package/virtual-dom)
* [vue](https://www.npmjs.com/package/vue)
* [react](https://www.npmjs.com/package/react)
* [preact](https://www.npmjs.com/package/preact)
* [virtual-dom](https://www.npmjs.com/package/virtual-dom)
* [marko-js](https://github.com/tornqvist/marko-js)
* [svelte](https://github.com/sveltejs/svelte)
* [deku](https://www.npmjs.com/package/deku)
* [etch](https://github.com/atom/etch)
* [nanocomponent](https://www.npmjs.com/package/nanocomponent)
* [gl-component](https://www.npmjs.com/package/gl-component)
* [lit-element](https://github.com/Polymer/lit-element)
* [fun-component](https://github.com/tornqvist/fun-component)
* [base-element](https://www.npmjs.com/package/base-element)
* [ember](https://www.npmjs.com/package/ember)
* [mercury](https://www.npmjs.com/package/mercury)
* [webcomponent](https://www.npmjs.com/package/webcomponent)


## Motivation

Creating a centralized component like `hyperdom`, `nanocomponent` or `etch` and a set of adapters seems tempting but not feasible task, since there are many miscellaneous framework-specific components, especially for react/preact/vdom/etch.

Instead, creating set of framework converters removes incompatibilities and creates single unopinionated workflow. At least enables react infrastructure for non-react public.

`jsxify` provides a JSX glue, making UI development easy, natural and framework agnostic.

## Related

* [hyperx](https://www.npmjs.com/package/hyperx) − template strings for hyperscript frameworks.

## License

© 2018 Dmitry Yv. MIT License
