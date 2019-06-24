Vue.use(VueNumberFormat)

window.onload = () => {
  input1.addEventListener('keyup', function(e) {
    console.log(e.target.value, 'should be kept')
  })
}

new Vue({
  el: '#demo',

  data: {
    input1: '123.0000',
    config1: { bind: 'input1' },
    input2: 32266,
    config2: {
      bind: 'input2',
      min: '-5',
      max: '100000',
      local: 'FR'
    },
  },

  created: function() {},

  watch: {},

  methods: {}
})