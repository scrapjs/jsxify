# jsxify [![API Stability](https://img.shields.io/badge/stability-experimental-red.svg?style=flat-square)](https://nodejs.org/api/documentation.html#documentation_stability_index) [![Build Status](https://img.shields.io/travis/dy/jsxify.svg?style=flat-square)](https://travis-ci.org/dy/jsxify/)

**Work in progress**

Unopinionated JSX with instant deploy.

## Usage

[![npm install jsxify](https://nodei.co/npm/jsxify.png?mini=true)](https://npmjs.org/package/jsxify/)

```jsx
const jsxify = require('jsxify')
const h = jsxify(
	require('jsxify-vdom'),
	require('jsxify-react'),
	require('jsxify-nano'),
	require('jsxify-webgl'),
	require('jsxify-vue')
)

// gets instantly deployed into container
<div container={document.body}>
	<AudioSource ondata={d => render({push: d})}/>
	<FpsIndicator text="false"/>
	<Logo href={package.repository.url}/>
	<Panel closed onchange={render}>
		<Volume id="width" min=0 max=100 value={state.width} />
		<Range id="amplitude" symmetric min=-10 max=10 value={[-state.amplitude, state.amplitude]} />
	</Panel>
	<canvas context="webgl">
		<Waveform data={state.data}/>
	</canvas>
</div>
```

To compile JSX, any of [jsx-transform](https://www.npmjs.com/package/jsx-transform) or [babel](https://babeljs.io/docs/plugins/transform-react-jsx/) can be used.

## API

### var h = jsxify(container?, adapter1, adapter2, ...rest)

Create hyperscript function for the target `container`, enabling framework adapters by `jsxify-*` packages.

```jsx
import {jsxify, render} from 'jsxify'
import react from 'jsxify-react'
import vdom from 'jsxify-vdom'

import ReactComponent from './react-component'
import VWidget from './vdom-component'

let h = jsxify(react, vdom)

render(
	h(ReactComponent, props, [
		h(VWidget)
	]),
document.body)
```

### h(target, props?, children?)

Deploy JSX.

Example:

```jsx
<div container={document.body}>	// creates HTMLElement by hyperscipt
	<VDOMWidget>				// converts virtual-dom widget to HTMLElement
		<div>					// creates VNode by virtual-dom/h
			<ReactComp>			// converts React.Component to virtual-dom
				<div></div>		// creates React.Element by React.createElement
			</ReactComp>
		</div>
	</VDOMWidget>
</div>
```

The function normalizes `key`/`id` properties, which are considered equivalent.
Also it normalizes `on-` and `data-` properties to `on={{}}`, `data{{}}` objects.

### Framework adapters

## Related

* [hyperx](https://www.npmjs.com/package/hyperx) − template strings for hyperscript frameworks.

## License

© 2018 Dmitry Yv. MIT License
