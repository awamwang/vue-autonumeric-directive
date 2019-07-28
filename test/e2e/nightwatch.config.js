// http://nightwatchjs.org/guide#settings-file
module.exports = {
  'src_folders': ['test/e2e/specs'],
  'output_folder': 'test/e2e/reports',
  'custom_commands_path': ['node_modules/nightwatch-helpers/commands'],
  'custom_assertions_path': ['node_modules/nightwatch-helpers/assertions'],

  'selenium': {
    'start_process': false,
    'server_path': require('selenium-server').path,
    'host': '127.0.0.1',
    'port': 9515,
    'cli_args': {
      'webdriver.chrome.driver': require('chromedriver').path,
      // 'webdriver.gecko.driver': require('geckodriver').path
    }
  },

  // "webdriver": {
  //   'start_process': true,
  //   "server_path": require('chromedriver').path,
  //   "cli_args": [
  //     "--verbose",
  //   ],
  //   "port": 9515
  // },  

  'test_settings': {
    'default': {
      'selenium_port': 9515,
      'selenium_host': 'localhost',
      "default_path_prefix" : "",
      'silent': true,
      'screenshots': {
        'enabled': true,
        'on_failure': true,
        'on_error': false,
        'path': 'test/e2e/screenshots'
      }
    },

    'chrome': {
      'desiredCapabilities': {
        'browserName': 'chrome',
        'javascriptEnabled': true,
        'acceptSslCerts': true,
        "chromeOptions": {
          "args" : ["--no-sandbox"]
        },
      }
    },

    'firefox': {
      'desiredCapabilities': {
        'browserName': 'firefox',
        'javascriptEnabled': true,
        'acceptSslCerts': true,
        'marionette': true
      }
    },

    'phantomjs': {
      'desiredCapabilities': {
        'browserName': 'phantomjs',
        'javascriptEnabled': true,
        'acceptSslCerts': true,
        'phantomjs.binary.path': require('phantomjs-prebuilt').path
      }
    }
  }
}
