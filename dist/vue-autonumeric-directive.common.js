if (process.env.NODE_ENV === 'production') {
  module.exports = require('./vue-autonumeric-directive.common.prod.js')
} else {
  module.exports = require('./vue-autonumeric-directive.common.dev.js')
}