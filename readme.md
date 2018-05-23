# jsxify [![API Stability](https://img.shields.io/badge/stability-experimental-red.svg?style=flat-square)](https://nodejs.org/api/documentation.html#documentation_stability_index) [![Build Status](https://img.shields.io/travis/dy/jsxify.svg?style=flat-square)](https://travis-ci.org/dy/jsxify/)

**Work in progress**

Enable JSX for everything.

## Usage

[![npm install jsxify](https://nodei.co/npm/jsxify.png?mini=true)](https://npmjs.org/package/jsxify/)

```jsx
const h = require('jsxify')
const NanoButton = require('./nanobutton')
const Scatter2D = require('@a-vis/scatter2d')
const { Menu, MenuItem } = require('rc-menu')

<document.body>
<header>
	<Menu>
		<MenuItem />
		<MenuItem />
		<MenuItem />
	</Menu>
</header>
<main>
	<Scatter2d />
	<NanoButton ...props/>
</main>
</document.body>
```

### Supported frameworks

<!-- * [hyperx](https://www.npmjs.com/package/hyperx) -->
* [hyperscript](https://www.npmjs.com/package/hyperscript)
* [virtual-dom](https://www.npmjs.com/package/virtual-dom)
* [react](https://www.npmjs.com/package/react)
* [preact](https://www.npmjs.com/package/preact)
* [base-element](https://www.npmjs.com/package/base-element)
* [ember](https://www.npmjs.com/package/ember)
* [mercury](https://www.npmjs.com/package/mercury)
* [webcomponent](https://www.npmjs.com/package/webcomponent)
* [virtual-dom](https://www.npmjs.com/package/virtual-dom)
* [lit-element](https://github.com/Polymer/lit-element)
* [fun-component](https://github.com/tornqvist/fun-component)
* [svelte](https://github.com/sveltejs/svelte)


## Browserify transform

Instead of setting up frameworks it may be easier to enable `jsxify` transform with options in `package.json` as

```json
  "browserify": {
    "transform": "jsxify"
  },
```

That will detect included component classes and insert corresponding `h.use` directives.


## Motivation

Creating a centralized component like `hyperdom`, `nanocomponent` and adapters for it seems tempting but not feasible task, since there is huge amount of miscellaneous framework-based components, especially for react.

Instead, enabling JSX adapters for frameworks removes incompatibilities and creates single unopinionated workflow. Or just enables react infrastructure for non-react crowd.


## License

© 2018 Dmitry Yv. MIT License
