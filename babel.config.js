module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [
    [
      "transform-imports",
      {
        "vuetify": {
          "transform": "vuetify/es5/components/${member}", // eslint-disable-line no-template-curly-in-string
          "preventFullImport": true
        }
      }
    ]
  ]
}
