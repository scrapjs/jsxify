# jsxify

**Work in progress**

Enables JSX for any type of component: virtual dom, vue, react, nanocomponent, base-element, fun-component, gl-component, pure HTML etc. Coupled with [babel-react]() or [jsx-transform](https://github.com/) enables JSX for everything.

## Usage

### Nanocomponent

```jsx
let h = require('jsxify')(require('hyperscript'))
h.add('NanoButton', require('./nanobutton'))
h.add('Scatter2d', require('@a-vis/scatter2d'))

document.body.appendChild(
<main>
	<Scatter2d />
	<NanoButton ...props/>
</main>
)
```

### Preact / gl-component

```jsx
let h = require('jsxify')(require('preact').createElement)

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

To enable JSX for your custom component, you have to just implement 3 lifecycle methods: `init`, `update` and `destroy`. `jsxify` will take care of the rest: keying, repurposing,

```jsx
let CC = require('my-compo')
let h = require('jsxify')({
	CustomComponent: {
		init: (props, children) => {
			return new CC(props)
		},
		update: (instance, props, children) => {
			instance.render(props)

			return instance.element
		},
		destroy: () => {

		}
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

### h = require('jsxify')(components, options?)

// return component instance or permanent component state

Option | Meaning
---|---
`h` | Function returning the node. Can be virtual-dom, react, hyperscript or any other hyperscript-compatible function.
`portal` | Enable `container` property to automatically mount part of the tree to defined target.

TODO: make sure these options are necessary. Mb we could collapse update by `key`/`container` property.

### h.add(components)

Add a list of components or a single component.

```jsx
h.add({a: compo1, b: widget, c: directHTML, d: vdom})
```


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
