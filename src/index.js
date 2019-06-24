/* @flow */

import getOptions from './options'
import AutoNumeric from 'autonumeric'
import { setProp } from './util/lang'
import { checkElementType, unshiftEventHandler } from './util/dom'

let MyPlugin = {
  AutoNumeric,
}

MyPlugin.install = function(Vue: Vue, outerOptions: PluginsOptions = {}) {
  // 处理后事件传递
  // 适用范围，支持其他TAG
  // 修改为keydown思路，体验更好
  // IE兼容性
  Vue.directive('number', {
    bind(el, binding: VNodeDirective, vnode: VNode) {
      checkElementType(el)

      let options: Options = getOptions(binding, outerOptions)

      el._autoNumericElement = new AutoNumeric(el, options.numricOptions)
      let setValue = options.unsafeSet ? unsafeSetValue : safeSetValue
      let oldValue = el.value

      function unsafeSetValue(value) {
        let cmd = `vnode.context.${options.bind} = \'${value === null ? '' : value}\'`
        eval(cmd) // eslint-disable-line
      }

      function safeSetValue(value) {
        setProp(vnode.context, options.bind, value)
      }

      /* 事件处理 */
      function onkeyDown(event) {
        oldValue = event.target.value
      }

      function updateVueInstance(event) {
        setTimeout(() => {
          let newValue = event.target.value
          if (newValue !== oldValue) {
            setValue(newValue)
          }
        }, 0)
      }

      // function onMinExceeded(event) {
      //   console.log(event)
      // }

      // function onMaxExceeded(event) {
      //   console.log(event)
      // }

      unshiftEventHandler(el, 'keydown', onkeyDown)
      unshiftEventHandler(el, 'keyup', updateVueInstance)
      unshiftEventHandler(el, 'change', updateVueInstance)
      // unshiftEventHandler(el, 'autoNumeric:minExceeded', onMinExceeded)
      // unshiftEventHandler(el, 'autoNumeric:maxExceeded', onMaxExceeded)

      unshiftEventHandler(el, 'paste', (event) => {
        event.preventDefault()
      })
    },
    // update(el, binding, vnode, oldVnode) {
    //   console.log('update', el, binding, vnode, oldVnode)
    // },
    // unbind(el, binding, vnode, oldVnode) {
    //   console.log('unbind', el, binding, vnode, oldVnode)
    // },
  })
}

export default MyPlugin