const config = {
  "source": ["src/tokens/*.json"],
  "basePxFontSize": 16,
  "platforms": {
    "scss": {
      "transforms": ["attribute/cti", "name/cti/kebab", "time/seconds", "dimension/pxToRem", "color/hsla", "scss/deepMap"],
      "buildPath": "src/scss/",
      "files": [{
        "destination": "tokens.scss",
        "format": "scss/map-deep",
        "options": {
          "outputReferences": false,
          "themable": false
        },
        "filter": "noTypography"
      }]
    }
  }
}

export default config;