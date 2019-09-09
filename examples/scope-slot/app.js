Vue.use(VueNumberFormat)

new Vue({
  el: '#demo',

  data: {
    list: [
    {
      val: '1',
      id: 1
    },
    {
      val: '2',
      id: 2
    }],
    input1: '123.00',
    config1: { bind: 'input1' },
  },

  created: function() {},

  watch: {},

  methods: {}
})
