Vue.use(VueNumberFormat)

new Vue({
  el: '#demo',

  data: {
    input1: '123.00',
    config1: { bind: 'input1' },
    input2: {
      num: '666',
    },
    config2: { bind: 'input2.num', min: '0', presion: 3, local: 'FR', },
  },

  created: function() {},

  watch: {},

  methods: {}
})