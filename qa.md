## Mount result

### 1. <Render to={target}> ... </Render> => (same as 3)

+ External JSX-compatible component
- Meaningless structure
- same as `<Compo el={target} />`

### 2. render(<App />, target) => (same as 5)

+ React-like
+ familiar, clear
- no way for portals
- no way for partial updates

### 3. <App container={target}> ... </App> ★

+ natural, intuitive, convenient
+ can be enabled for all components
+ enables portals
+ enables partial update with changed container
```jsx
<App mount={active ? target1 : null} />
```
+ resolves morphdom vs vdom dilemma by forcing single format output
- a tiny bit messy naming: container? parent? element? target? mount? use? at?
	+ cow paths to the help
- not specifically clear if multiple components get added to the same container - are they added at the moment of creation and then get updated, if found?
+ Possible to mount things once and then update partially by request.
- forces single tag for fragments, not always avaiable and/or clear what that should be
```jsx
// append sequentially, rerender on update
<A container={target} />
<B container={target} />
<C container={target} />

<App container={target}/>
	<A />
	<B />
	<C />
</App>
```
+ fits established practice/syntax of JSX
+ no questions where it should be inserted: if already in the target - update, if not in the target - append
+ enables no-body gl-components
+ inserts parent node to track mutation in child node
+ no mixup of vdom and html
- opinionated way to mount items
- no natural fragment support

### 4. <document.body></document.body>

+ Seems to be naturally compileable - react supports `<a.b>` syntax.

+ Any custom target/portal can be done by
```jsx
let Container = querySelector(xxx); <Container>...</Container>
```

-/+ jsxify will use custom handler for pure html elements, signifying them as containers.
+ There does not seem to be logical contradiction:
```jsx
let Portal = document.querySelector('.portal')
<App>
	<Portal>
		<Content>
		</Content>
	</Portal>
</App>
```

+ That is elegant for simple case.

- Not compileable as `<document.querySelector('.xxx')/>`
	+ No way to close such tag
	+ Possible `<document.querySelector {...'.xxx'}/>`

- Does not provide a way to define portal:
```jsx
<Compo>
	<RealNode>content</RealNode>
	<VNode />
</Compo>
```
here portal <RealNode/> gets inserted into <Compo>
	+ we do not need portals, use partial rendering

- morphdom vs vdom: Some children are unavoidably html nodes: `<document.body>`, others can be vnodes along with them.

- Not predictable mounted result: dom? vdom? some state?
	? what if returning DOM node if mounted on real container, and returning the vnode if abstract vdom or container?
	? or returning some intermediary jsxify structure with {init, render}

+ that is natural merge of `render(vdom|dom|react|etc, whereTo)`, as `h(node, null, vdomTree)`
+ that easily enables fragments

+ better solves many use-cases of rerendering (destroying, empty content and alike) than forcing html

+ that allows to not care of what exactly method (html or vdom or react) is used behind the jsx and just change chunks of html declaratively, without binding to JS.
```jsx
<Container>
	<Text />
	<Cartesian />
	<Waveform />
</Container>
```

? can we store instances ids per-real parent? Eg. above example could use `<canvas><Text /></canvas>` as a holder - since elements should add references. How?
	+ that would help with the issue of `undefined`-key components
	+ that would shorten gl-component update notation by removing container
	* prob gl-components might be done as thunks, hopefully called by canvas
	- since hyperscipt format of children is not aware of parents for the moment of creation, we could only identify parents in the next frame or from the parent constructor, so that is the parent's task to set up kids. That is impossible for the gl-components, since they require canvas beforehead, similar to svg use="" attribute.
	```jsx
	<canvas id="gl" />
	<Text use="#gl" />
	<Text use="#gl" />
	<Text use="#gl" />
	```
	✘ no

? It needs defining a way to make query selectors/containers
	? <'.selector'>
		- closing tag is messy
		- invalid syntax
	? <$ selector='.where to'></$>
		- same as <Mount to='selector' />
		- $ is undefined variable, or not used word
	? `<document.querySelector {...'sel'}></document.querySelector>`
		- messyish
		- unreliable long-term
	? `<document.querySelector('.sel')></document.querySelector>`
		- not supported by parsers/editors
		- multiple closing querySelectors are ambiguous
		- closing is not the same as opening
	? <#element-id></#element-id>
		- invalid syntax
		- difficult to close

- too custom solution: too many questions, too opinionated syntactic extension/practice over JSX


### 5. Return html/vdom

+ the most natural and logical expectation
- no in-code portals
	+ force partial update
		- no easy way to move an element from one container to another
			+ partial update + attach manually
			```jsx
			someEl.appendChild(<Compo />)
			```
	? is that a good idea to have portals straight in code? What are the real cases?
	```jsx
	<A portal={el1}>
		<B portal={el2}/>
	</A>
	```
	That is needed in react to render element's children to another node, unlike to the parent component. The profit is event propagating to sibling, not only parent nodes, eg. Modal component's parent can catch events wherever Modal is placed to.
		+ not a serious justification for the whole abstraction - just catch portal events separately
		+ portals create redundant difficult to track complexity
- need for manual morphdom/patch
	+ supports libs
	+ obvious use solution
	+ enables thinking
	+ not JSX responsibility
+ partial updates are still possible providing ids
```jsx
morphdom(document.body,
<body>
	<C1 id="1" ...props/>
	<C2 ...props/>
</body>
)
```
+ braces around JSX start making sense
```jsx
morph(target, <App><Content/></App>)
...

// will be updated, unless destroyed before - then created anew
<C1 id="1" ...newProps/>

// will create a new node
<C1 ...newProps/>
```

- That creates too many possible entries: jsxify/vdom, jsxify/dom, jsxify/react etc. Having single jsxify, solving the issue of mounting whatever what is easier. The question is what it should return - see above.

- That is already invented, see dom-chef, vhtml etc.


### 6. let h = jsxify(require('hyperscript'))

+ unopinionated builder
```jsx
let h = require('jsxify')(require('hyperscript'),
	require('jsxify/vdom'),
	require('jsxify/preact'),
	require('jsxify/react')
)
```
+ explicit glue interface `let h = jsxify(to, ...from)`
* uses internally vdom and a bunch of explicit detectors
- does not allow easy import h from 'jsxify'
- requires custom dependency to remember `require('hyperscript')`


### 7. = 3 + 4 ★

+ Depending on the type of target node - HTML, VDOM, React or etc., it handles that properly anyways
```jsx
var Body = document.body

<Body>
	<A />
	<B />
	<C />
</Body>
```

? returning result depends on the root node? If that is an HTML - it gets mounted, if VDOM - that returns VDOM, React - returns react?
	+ reasonable
	+ not too much opinionated or unobvious
	? how to define default hyperscript? Eg. which of `React.createElement`, `hyperscript` or `vdom.h` should be used?
		+ require('jsxify/dom') forces hyperscript result, require('jsxify/react') - react result
		+ by default jsxify returns the type of component of the constructor, root level returns DOM
		? should we return string for simple `<div/>` ?
			+ that completes the beauty of the concept
			+ that removes need for
			- that may be not useful or expected, eg.
			```jsx
			<div>Hello World</div> // returns string
			<Div>Hello World</Div> // returns node - unobvious
			```
		?! `lib` property for forced return type eg `<div lib='react'/>`?
			format?
				- interferes with audio
			result?
				- not clear, possibly interferes with props
			out?
				- interferes with props
			type?
				- interferes with DOM
			jsx?
				- too generic
				- not extensible
			dtype?
				- not related to JSX
			h?
				+ short
				+ not likely to interfere
				- not explicit
				- not easy to remember
			htype?
				- same as above
				- more difficult to remember
			hyperscript?
				- too long
			jsxtype?
				- too long
				+ extensible
				+ itemprop, enctype, doctype, srcdoc etc - standard practice
				? jsxformat? jsxout?
				? jsx-type, jsx-format, jsxType, jsx={type: ...}
			data-jsx={}?
			jsx={type: a, container: b}?
			data-jsx-type={a} data-jsx-container={b}?
				- redundant html entity

+ enables non-opinionated mount={}, which can be component-specific
