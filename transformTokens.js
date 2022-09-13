const StyleDictionary = require('style-dictionary')
const baseConfig = require('./config.json')

// Transform px values to rem
StyleDictionary.registerTransform({
  name: 'dimension/pxToRem',
  type: 'value',
  matcher: token => {
    return (token.unit === 'pixel' || token.type === 'dimension') && token.value !== 0
  },
  transformer: token => {
    // Load Base Font Size from Config
    const fontBasePx = baseConfig.basePxFontSize || 16
    return `${token.value/fontBasePx}rem`
  }
})

function hexToHSL(H) {
  // Convert hex to RGB first
let r = 0, g = 0, b = 0, a = 1;

  if (H.length == 5) {
    r = "0x" + H[1] + H[1];
    g = "0x" + H[2] + H[2];
    b = "0x" + H[3] + H[3];
    a = "0x" + H[4] + H[4];
  } else if (H.length == 9) {
    r = "0x" + H[1] + H[2];
    g = "0x" + H[3] + H[4];
    b = "0x" + H[5] + H[6];
    a = "0x" + H[7] + H[8];
} else if (H.length == 4) {
    r = "0x" + H[1] + H[1];
    g = "0x" + H[2] + H[2];
    b = "0x" + H[3] + H[3];
  } else if (H.length == 7) {
    r = "0x" + H[1] + H[2];
    g = "0x" + H[3] + H[4];
    b = "0x" + H[5] + H[6];
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

  if (delta == 0)
    h = 0;
  else if (cmax == r)
    h = ((g - b) / delta) % 6;
  else if (cmax == g)
    h = (b - r) / delta + 2;
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0)
    h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(0);
  l = +(l * 100).toFixed(0);
  a = (a / 255).toFixed(1);

  return "hsla("+ h + "," + s + "%," + l + "%," + a + ")";
}

StyleDictionary.registerTransform({
  name: 'color/hsla',
  type: 'value',
  matcher: token => {
    return token.type === 'color' && token.value !== 0
  },
  transformer: token => {
    return `${hexToHSL(token.value)}`
  }
})

StyleDictionary.registerTransform({
  name: 'size/percent',
  type: 'value',
  matcher: token => {
    return token.unit === 'percent' && token.value !== 0
  },
  transformer: token => {
    return `${token.value}%`
  }
})

function deepMapSearch(obj) {
  let map = []

  Object.entries(obj).forEach(entry => {
    const [k,v] = entry

    if (typeof(v) == 'object') {
      map.push(`"${k}": ${deepMapSearch(v)}`)
    } else {
      map.push(`"${k}": ${v}`)
    }
  })

  return `(${map.join(', ')})`
}

// Create SCSS map if value is an object
StyleDictionary.registerTransform({
  name: 'scss/deepMap',
  type: 'value',
  matcher: token => {
    return typeof(token.value) == 'object' //  token.type === 'custom-fontStyle' || token.type === 'custom-grid'
  },
  transformer: token => {
    return deepMapSearch(token.value);
  }
})

StyleDictionary.registerFilter({
  name: 'noTypography',
  matcher: function(token) {
    return !['typography'].includes(token.attributes.category)
  }
})

StyleDictionary.registerFilter({
  name: 'validToken',
  matcher: function(token) {
    return ['dimension', 'string', 'number', 'color'].includes(token.type)
  }
})

const StyleDictionaryExtended = StyleDictionary.extend(baseConfig)

StyleDictionaryExtended.buildAllPlatforms()
