'use strict'

var v = require('virtual-dom')
var dom = require('./dom')

module.exports = vdom

function vdom (target, props, children) {

}

vdom.h = v.h

vdom.dom = function () {

}


// register dom → vdom converter
dom.vdom = function () {

}
