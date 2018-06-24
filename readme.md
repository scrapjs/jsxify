# jsxify [![API Stability](https://img.shields.io/badge/stability-experimental-red.svg?style=flat-square)](https://nodejs.org/api/documentation.html#documentation_stability_index) [![Build Status](https://img.shields.io/travis/dy/jsxify.svg?style=flat-square)](https://travis-ci.org/dy/jsxify/)

**Work in progress**

Unopinionated JSX with instant deploy.

## Usage

[![npm install jsxify](https://nodei.co/npm/jsxify.png?mini=true)](https://npmjs.org/package/jsxify/)

```jsx
const h = require('jsxify')
h.use(
	require('jsxify-vdom')
	require('jsxify-react')
	require('jsxify-nano')
	require('jsxify-webgl')
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

### import {h, render} from 'jsxify'

Create hyperscript function for the target `container`, enabling framework adapters by `jsxify-*` packages.

```jsx
import {h, render} from 'jsxify'
import jsxReact from 'jsxify-react'
import jsxVdom from 'jsxify-vdom'

h.use(jsxReact, jsxVdom)

import ReactComponent from './react-component'
import VWidget from './vdom-component'

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
<div container={document.body}>
	<VDOMWidget>
		<div>
			<ReactComp>
				<div></div>
			</ReactComp>
		</div>
	</VDOMWidget>
</div>
```

The function normalizes `key`/`id` properties, which are considered equivalent.
Also it normalizes `on-` and `data-` properties to `on={{}}`, `data{{}}` objects.


## Components

Jsxify by default accepts following targets as components:

* JSX/HTML
* function, returning JSX/HTML
* object/class with `render(props, children)` method
* object/class with `update(props, children)`, `render()` methods
* object/class with `update`, `render`, `destroy` methods
* any object with `.element` property
* any custom component, enabled by plugins

### [FAQ](./faq)

## Related

* [hyperx](https://www.npmjs.com/package/hyperx) − template strings for hyperscript frameworks.
* [etch](https://www.npmjs.com/package/etch) −

## License

© 2018 Dmitry Yv. MIT License
