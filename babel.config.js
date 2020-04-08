const plugins = [
  [
    'import',
    {
      libraryName: 'muse-ui',
      libraryDirectory: 'lib',
      camel2DashComponentName: false
    }
  ]
]

module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins
}
