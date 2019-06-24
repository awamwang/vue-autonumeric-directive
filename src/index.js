/* @flow */

import getOptions from './options'
import AutoNumeric from 'autonumeric'
import { setProp } from './util/lang'
import { checkElementType, unshiftEventHandler } from './util/dom'

let MyPlugin = {
  AutoNumeric,
}

MyPlugin.install = function(Vue: Vue, outerOptions: PluginsOptions = {}) {
  // IE兼容性
  Vue.directive('number', {
    bind(el, binding: VNodeDirective, vnode: VNode) {
      let targetElement = checkElementType(el, vnode)

      let options: Options = getOptions(binding, outerOptions)

      el._autoNumericElement = new AutoNumeric(targetElement, options.numricOptions)
      let setValue = options.unsafeSet ? unsafeSetValue : safeSetValue
      let oldValue = targetElement.value

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

      unshiftEventHandler(targetElement, 'keydown', onkeyDown)
      unshiftEventHandler(targetElement, 'keyup', updateVueInstance)
      unshiftEventHandler(targetElement, 'change', updateVueInstance)
      // unshiftEventHandler(targetElement, 'autoNumeric:minExceeded', onMinExceeded)
      // unshiftEventHandler(targetElement, 'autoNumeric:maxExceeded', onMaxExceeded)

      unshiftEventHandler(targetElement, 'paste', (event) => {
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