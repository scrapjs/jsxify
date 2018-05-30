'use strict'

var React = requireSafe('react')
var ReactDOM = requireSafe('react-dom')
var vdom = require('./vdom')
var dom = require('./dom')
var vdomReact = require('vdom-react')

module.exports = react

// return an object with react component.
function react (target, props, children) {
}

// is react component or element
react.test = function (target) {

}

// react hyperscript
react.h = React.createElement

// react → DOM
react.dom = function () {

}

// react → vdom
react.vdom = function () {

}


// dom element → react
dom.react = function () {

}

// vdom → react
vdom.react = function (VNode) {
	return vdomReact()
}
