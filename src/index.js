/* @flow */
import './util/polyfiil'
import getOptions from './options'
import AutoNumeric from 'autonumeric/dist/autoNumeric.min.js'
import { setProp } from './util/lang'
import { checkElementType, unshiftEventHandler, getVNodeValue, getElementValue } from './util/dom'

let MyPlugin = {
  AutoNumeric,
}

MyPlugin.install = function(Vue: Vue, outerOptions: PluginsOptions = {}) {
  Vue.directive('number', {
    bind(el, binding: VNodeDirective, vnode: VNode) {
      let targetElement = checkElementType(el, vnode)
      let oldValue = getVNodeValue(vnode)

      let options: Options = getOptions(binding, outerOptions)

      el._autoNumericElement = new AutoNumeric(targetElement, oldValue, options.numricOptions)
      let setValue = options.unsafeSet ? unsafeSetValue : safeSetValue

      function unsafeSetValue(value) {
        let cmd = `vnode.context.${options.bind} = \'${value === null ? '' : value}\'`
        eval(cmd) // eslint-disable-line
      }

      function safeSetValue(value) {
        setProp(vnode.context, options.bind, value)
      }

      /* 事件处理 */
      function onkeyDown(event) {
        oldValue = getElementValue(event.target)
      }

      function updateVueInstance(event) {
        setTimeout(() => {
          let newValue = getElementValue(event.target)
          if (newValue !== oldValue) {
            setValue(newValue)
          }
        }, 0)
      }

      unshiftEventHandler(targetElement, 'keydown', onkeyDown)
      unshiftEventHandler(targetElement, 'keyup', updateVueInstance)
      unshiftEventHandler(targetElement, 'change', updateVueInstance)

      unshiftEventHandler(targetElement, 'paste', (event) => {
        event.preventDefault()
      })
    },
  })
}

export default MyPlugin