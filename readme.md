# jsxify

**Work in progress**

Enables JSX for any type of component: virtual dom, vue, react, nanocomponent, base-element, fun-component, gl-component, pure HTML etc. Coupled with [babel-react]() or [jsx-transform](https://github.com/) enables JSX for everything.

## Usage

### Nanocomponent

```jsx
let h = require('jsxify/dom')
h.add(require('./nanobutton'))
h.add(require('@a-vis/scatter2d'))

document.body.appendChild(
<main>
	<Scatter2d />
	<NanoButton ...props/>
</main>
)
```

### Preact / gl-component

```jsx
let h = require('jsxify/vdom')
import {Menu, MenuItem} from 'react-toolbox/menu'
h.add(Menu, MenuItem)

() => (
	<Menu>
		<MenuItem />
		<MenuItem />
		<MenuItem />
	</Menu>

	<Scatter2d />
)
```

### Bootstrap

```jsx
```

### Custom component

To enable JSX for your custom component, you have to implement 3 lifecycle methods: `create`, `render` and `destroy`. `jsxify` will take care of the rest: keying, repurposing,

```jsx
let CC = require('my-compo')
let h = require('jsxify/dom')
h.add('CustomComponent', {
	create: (props, children) => {
		return new CC(props)
	},
	render: (instance, props, children) => {
		instance.render(props)

		return instance.element
	},
	destroy: () => {

	}
})

function render (props) {
	return <CustomComponent key=1 ...props />
)

setTimeout(() => {
	render({time: Date.now()})
}, 1000)
```

## API

### `h = require('jsxify/dom')`

Turn JSX into DOM with [hyperscript]() package.

### `h = require('jsxify/vdom')`

Turn JSX into virtual DOM with [virtual-dom]() package.

### `h = require('jsxify/react')`

Turn JSX into react virtual DOM.

### `h = require('jsxify')(createElement)`

Turn JSX into any hyperscript-compatible structure.


### `h.add(name?, component)`

Add a component by name. If name is skipped, default component name will be used.

```js
// add Menu and MenuItem components
h.add(require('react-toolbox/menu'))

// register menu component as ReactMenu
h.add('ReactMenu', require('react-toolbox/menu'))
```

### `h.add({name: component, ...})`

Register dict of components.

### `h.add([component1, component2, ...])`

Add list of components or a single component. Component names are taken from packages.

```js
// register all react-toolbox components
h.add(require('react-toolbox'))
```

### `jsxify` browserify transform

Analyses statically which frameworks are being used and includes only necessary ones. For example, if no react components are detected in the package, it won't include react.


## Supported components

* [base-element](https://www.npmjs.com/package/base-element)
* [react](https://www.npmjs.com/package/react)
* [ember](https://www.npmjs.com/package/ember)
* [mercury](https://www.npmjs.com/package/mercury)
* [webcomponent](https://www.npmjs.com/package/webcomponent)
* [virtual-dom](https://www.npmjs.com/package/virtual-dom)
* [lit-element](https://github.com/Polymer/lit-element)
* [fun-component](https://github.com/tornqvist/fun-component)
* [svelte](https://github.com/sveltejs/svelte)

## Similar

* [hyperx](https://www.npmjs.com/package/hyperx) − tagged template string virtual dom builder


## Motivation

Creating a centralized type of component, alike to `hyperdom` or many others, and then providing adapters does not seem to be feasible task, since there is huge amount of various framework-based components - converting all of them to another one UI framework would be a massive task.

Instead, providing adapters for frameworks and enabling JSX → HTML/vdom conversion would erase framework differences and create single unopinionated workflow.

## License

© 2018 Dmitry Yv. MIT License
