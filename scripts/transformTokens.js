// const StyleDictionary = require('style-dictionary')
// const baseConfig = require('./config.json')

import StyleDictionary from 'style-dictionary';
import baseConfig from './config.js';

import hexToHSL from './transforms/hexToHSL.js';
import deepMapSearch from './transforms/deepMapSearch.js';

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

function transformTokens(dest, token) {
  
  console.log(baseConfig, baseConfig.source)

  baseConfig.source[0] = token
  baseConfig.platforms.scss.buildPath = dest
  console.log(baseConfig, baseConfig.source)

  const StyleDictionaryExtended = StyleDictionary.extend(baseConfig)
  StyleDictionaryExtended.buildAllPlatforms()
}

export default transformTokens;
