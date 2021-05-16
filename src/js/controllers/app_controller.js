import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ 'input' ]
  
  connect() {
    let root = document.documentElement;

    const fontSize = getComputedStyle(root).getPropertyValue('--typo-h1-font-size');
    const color = getComputedStyle(root).getPropertyValue('--typo-h1-color');
    console.log(fontSize)
    console.log(color)

    this.inputTargets.forEach((input) => {
      input.addEventListener('change', (e) => {
        const cssVariable = e.target.dataset.cssVar
        const unit = e.target.dataset.unit

        console.log(cssVariable)
        console.log(unit)

        const valueUnit = unit !== undefined ? unit : '';
        const newValue = e.target.value.toString() + valueUnit;
        console.log(e.target.value, newValue)

        root.style.setProperty(cssVariable, newValue);
      })
    })
  }
}
