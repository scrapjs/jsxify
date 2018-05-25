## Mount result

### <Render to={target}> ... </Render>

+ External JSX-compatible component
- Meaningless structure
- same as `<Compo el={target} />`

### render(<App />, target)

+ React-like
+ familiar, clear
- no way for portals
- no way for partial updates

### <document.body></document.body>

+ Seems to be naturally compileable - react supports `<a.b>` syntax.

+ Any custom target/portal can be done by
```jsx
let Container = querySelector(xxx); <Container>...</Container>
```

- jsxify will use custom handler for pure html elements, signifying them as containers.
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

- Not compileable as `<document.querySelector('.xxx')>`
	+ No way to close such tag
	+ Possible `<document.querySelector {...'.xxx'}>`

- Does not provide a way to define portal:
```jsx
<Compo>
	<RealNode>content</RealNode>
	<VNode />
</Compo>
```
here portal <RealNode/> gets inserted into <Compo>

- morphdom vs vdom: Some children are unavoidably html nodes: <document.body>, others can be vnodes along with them. Not predictable the result.

### <App container={target}> ... </App>

+ natural, intuitive, convenient
+ can be enabled for all components
+ enables portals
+ enables partial update with changed container
```jsx
<App mount={active ? target1 : null} />
```
+ resolves morphdom vs vdom dilemma by forcing single format output
- a tiny bit messy naming: container? parent? element? target?
- not specifically clear if multiple components get added to the same container - do they get added at the moment of creation and then get updated?
+ Possible to mount things once and then update partially by request.


### Return html/vdom ★

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




