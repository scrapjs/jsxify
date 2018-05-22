let html = require('nanohtml')
let Nanocomponent = require('nanocomponent')

class Button extends Nanocomponent {
  constructor () {
    super()
    this.color = null
  }

  createElement ({color}) {
    this.color = color
    return html`
      <button style="background-color: ${color}">
        Click Me
      </button>
    `
  }

  // Implement conditional rendering
  update (state) {
    let newColor = state.color
    return newColor !== this.color
  }
}

module.exports = Button
