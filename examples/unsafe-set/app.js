Vue.use(VueNumberFormat)

new Vue({
  el: '#demo',

  data: {
    input1: '123.00',
    config1: { bind: 'input1', unsafeSet: true },
  },

  created: function() {},

  watch: {},

  methods: {}
})