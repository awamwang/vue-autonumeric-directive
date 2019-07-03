module.exports = {
  'tree': function (browser) {
    browser
    .url('http://localhost:8080/examples/native-input/')
      // .waitForElementVisible('#demo', 1000)
      .end()
  }
}
