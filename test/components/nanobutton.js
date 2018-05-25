let Nanocomponent = require('nanocomponent')


function Nanobutton () {
  Nanocomponent.apply(this, arguments)
  this.color = null
}

Nanobutton.prototype = Object.create(Nanocomponent.prototype)

Nanobutton.prototype.createElement = function (o) {
  this.color = o.color
  var b = document.createElement('button')
  b.style.backgroundColor = this.color
  b.innerHTML = 'ClickMe'
  return b
}

// Implement conditional rendering
Nanobutton.prototype.update = function (state) {
  let newColor = state.color
  return newColor !== this.color
}

module.exports = Nanobutton
