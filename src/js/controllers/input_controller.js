import { Controller } from "stimulus"

import * as u from "../utils.js"

export default class extends Controller {
  static targets = [ 'input', 'unit' ]
  
  connect() {
    u.domReady(() => {
      let root = document.documentElement;

      const el = this.element,
            input = this.inputTarget,
            unit = this.hasUnitTarget ? this.unitTarget : false,
            cssVariable = el.dataset.cssVar,
            cssVariableRaw = getComputedStyle(root).getPropertyValue(cssVariable);

      let cssVariableValue, cssVariableUnit;

console.log('------------- ', unit)

      if (!unit) {
        cssVariableUnit = false;
        cssVariableValue = cssVariableRaw;
      } else {
        cssVariableUnit = cssVariableRaw.trim().split(/\d+/g).filter(n=>n).pop();
        cssVariableValue = cssVariableRaw.trim().split(cssVariableUnit).filter(n=>n)[0].trim();
      }

      console.log('--> ', input, unit)
      console.log(cssVariableRaw)
      console.log(cssVariableValue, '|', cssVariableUnit)
      console.log(typeof cssVariableValue)

      console.log('org = ', input.value)

      input.value = cssVariableValue;

      console.log('updated = ', input.value)


      if (unit) {
        unit.value =  el.dataset.unit 

        unit.addEventListener('change', (e) => {
          el.dataset.unit = e.target.value
        })
      }

      input.addEventListener('change', (e) => {
        const inputUnit = el.dataset.unit
        const valueUnit = inputUnit !== undefined ? inputUnit : '';
        const newValue = e.target.value.toString() + valueUnit;

        console.log(e.target.value, newValue)

        root.style.setProperty(cssVariable, newValue);
      })
    })
  }
}
