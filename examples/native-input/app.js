Vue.use(VueNumberFormat, { pure: false })

window.onload = function() {
  input1.addEventListener('keyup', function(e) {
    console.log(e.target.value, 'should be kept')
  })
}

new Vue({
  el: '#demo',

  data: {
    input1: '123.00',
    config1: { bind: 'input1' },
    input2: 32,
    config2: {
      bind: 'input2',
      min: '-5',
      max: '100',
    },
    input3: {
      num: '',
    },
    config3: { bind: 'input3.num', min: '0', presion: 3, local: 'FR', },
    input4: {
      arr: [
        { v: '' }
      ]
    },
    config4: {
      bind: 'input4.arr[0].v',
      predifined: 'integerNeg',
      numricOptions: {
        decimalPlaces: 1,
        // decimalCharacter: ',',
        // digitGroupSeparator: '.',
        // overrideMinMaxLimits: 'ceiling'
      }
    },
    input5: '123.00',
    config5: { bind: 'input5' },
  },

  created: function() {},

  watch: {},

  methods: {}
})