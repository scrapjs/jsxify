## FAQ

### Principle?

Jsxify sees virtual DOM not as "ghost" reflection of real DOM, rendered via diffing/patching to match real DOM, it appeals to well-known concept of controller (aka component, widget), which is responsible for some part of the real DOM and knows how that should be updated, delegates update to components or creates components instances if required.

Hierarchy of components, defined by JSX therefore has mounting points in the real DOM, defined by `container` property. Content withing these nodes is made sure to exist corresponding to the JSX structure. The rest of the content is kept unharmed. When content is updated or removed, only the nodes that were created by JSX before are removed.

Virtual DOM: create a vtree, calculate diffs, apply patches. Components hierarchy: just update the DOM.

TODO: elaborate

### Portals?

Any JSX node in jsxify can provide `container` property to be deployed into any target.

Consider React example:

```jsx
// These two containers are siblings in the DOM
const appRoot = document.getElementById('app-root');
const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {clicks: 0};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      clicks: prevState.clicks + 1
    }));
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <p>Number of clicks: {this.state.clicks}</p>
        <Modal>
          <button>Click</button>
        </Modal>
      </div>
    )
  }
}

ReactDOM.render(<App />, appRoot);
```

Analogous jsxify code will be:

```js
function Modal (props, children) {
  	return <div container="#modal-root">{ children }</div>
}

class App {
  constructor(props, children) {
    this.state = {clicks: 0};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
  	this.state.clicks++
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <p>Number of clicks: {this.state.clicks}</p>
        <Modal>
          <button>Click</button>
        </Modal>
      </div>
    )
  }
}

<App container="#app-root"/>
```

### Diffing?

Jsxify does not use diffing/patching approach, istead, it delegates JSX structure of components to update DOM themselves, and makes sure these components exist in DOM nodes according to that structure.

Jsxify does not force content of `container` be exactly as in JSX, allowing to mixin real DOM, rather than dictate/redefine it.

Example:

```jsx
// append #world to the body, keep the rest of document.body content
<div id="world" container={document.body}>
	<h1>Hello World!</h1>
	<div id="amaze">
		You are amazing
	<div>
</div>

// append #sun to the body, don't replace the #world
<div id="sun" container={document.body}>
	<h2>Hello Sun!</h2>
</div>

// update #world, remove #amaze
<div id="world" container={document.body}>
	<h1>Hello World!</h1>
</div>
```

### Non-DOM components?

Sometimes you may want to organize [simulacra](https://en.wikipedia.org/wiki/Simulacra_and_Simulation) components, for example, include webgl shader programs as webgl context nodes. That can be easily achieved by

```jsx
var Text = require('gl-text')
var Scatter = require('gl-scatter2d')
var Lines = require('gl-line2d')

class WebGL {
  constructor (props) {
  	this.canvas = document.createElement('canvas')
  	this.context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
  }

  render (props, children) {
    children.forEach(child => {
      child.render()
    })
  }
}

<WebGL container={document.body}>
	<Text text="Hello World!"/>
	<Scatter />
	<Lines />
</WebGL>
```

### Multiple components on a single target?

### Why `container`, not `element`?

### Rendering to a string?

### Rendering to a target other than `document.body`?

### Framework replacement?

### Normalized properties?

### Plugins?

Plugins enable property/component-based hooks extending jsxify functionality.

Framework plugins:

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

Util plugins:

* jsxify-frame − enable frame

### Difference with etch

Jsxify | Etch
---|---
Requires single `render` method, and optionally `update` | Requires `render` and `update` methods
Rerenders whenever JSX evaluated. Frame scheduling can be implemented component-wise. | Plans rerender for the next frame.
Can include etch with [jsxify-etch]() | Cannot include jsxify

### Motivation?

Creating a centralized component like `hyperdom`, `nanocomponent` or `etch` and a set of adapters seems tempting but not feasible task, since there are many miscellaneous framework-specific components, especially for react/preact/vdom/etch.

Instead, creating set of framework converters removes incompatibilities and creates single unopinionated workflow. At least enables react infrastructure for non-react public.

`jsxify` provides a JSX glue, making UI development easy, natural and framework agnostic.
