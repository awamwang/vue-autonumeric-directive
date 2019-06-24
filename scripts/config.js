const path = require('path')
const buble = require('rollup-plugin-buble')
const cjs = require('rollup-plugin-commonjs')
const replace = require('rollup-plugin-replace')
const node = require('rollup-plugin-node-resolve')
const flow = require('rollup-plugin-flow-no-whitespace')
const version = process.env.VERSION || require('../package.json').version

const banner =
  '/*!\n' +
  ` * vue-autonumeric-directive v${version}\n` +
  ` * (c) 2019-${new Date().getFullYear()} Awam Wang\n` +
  ' * Released under the MIT License.\n' +
  ' */'

const builds = {
  // Runtime only (CommonJS). Used by bundlers e.g. Webpack & Browserify
  'web-cjs-dev': {
    entry: path.resolve(__dirname, '../src/index.js'),
    dest: path.resolve(__dirname, '../dist/vue-autonumeric-directive.common.dev.js'),
    format: 'cjs',
    env: 'development',
    banner
  },
  'web-cjs-prod': {
    entry: path.resolve(__dirname, '../src/index.js'),
    dest: path.resolve(__dirname, '../dist/vue-autonumeric-directive.common.prod.js'),
    format: 'cjs',
    env: 'production',
    banner
  },
  // development build (Browser)
  'web-full-dev': {
    entry: path.resolve(__dirname, '../src/index.js'),
    dest: path.resolve(__dirname, '../dist/vue-autonumeric-directive.js'),
    format: 'umd',
    env: 'development',
    banner
  },
  // production build (Browser)
  'web-full-prod': {
    entry: path.resolve(__dirname, '../src/index.js'),
    dest: path.resolve(__dirname, '../dist/vue-autonumeric-directive.min.js'),
    format: 'umd',
    env: 'production',
    banner
  },
  // Runtime only ES modules build (for bundlers)
  'web-runtime-esm': {
    entry: path.resolve(__dirname, '../src/index.js'),
    dest: path.resolve(__dirname, '../dist/vue-autonumeric-directive.esm.js'),
    format: 'es',
    banner
  },
  // ES modules build (for direct import in browser)
  'web-full-esm-browser-dev': {
    entry: path.resolve(__dirname, '../src/index.js'),
    dest: path.resolve(__dirname, '../dist/vue-autonumeric-directive.esm.browser.js'),
    format: 'es',
    transpile: false,
    env: 'development',
    banner
  },
}

function genConfig(name) {
  const opts = builds[name]
  const config = {
    input: opts.entry,
    external: opts.external,
    plugins: [
      flow(),
      node(),
      cjs(),
      // alias(Object.assign({}, aliases, opts.alias))
    ].concat(opts.plugins || []),
    output: {
      file: opts.dest,
      format: opts.format,
      banner: opts.banner,
      name: opts.moduleName || 'VueNumberFormat'
    },
    onwarn: (msg, warn) => {
      if (/autonumeric/.test(msg.message) && msg.code == 'NON_EXISTENT_EXPORT') {
        return  // 
      }
      if (/Use of eval/.test(msg.message)) {
        return  // 
      }
      warn(msg)
    }
  }

  // built-in vars
  const vars = {
    __VERSION__: version
  }
  // build-specific env
  if (opts.env) {
    vars['process.env.NODE_ENV'] = JSON.stringify(opts.env)
  }
  config.plugins.push(replace(vars))

  if (opts.transpile !== false) {
    config.plugins.push(buble())
  }

  Object.defineProperty(config, '_name', {
    enumerable: false,
    value: name
  })

  return config
}

if (process.env.TARGET) {
  module.exports = genConfig(process.env.TARGET)
} else {
  exports.getBuild = genConfig
  exports.getAllBuilds = () => Object.keys(builds).map(genConfig)
}