## Mount result

### <Render to={target}> ... </Render>

+ External JSX-compatible component
- Meaningless structure

### render(<App />, target)

+ React-like

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



### <App container={target}> ... </App>
