/* @flow */
import getOptions from './options'
import AutoNumeric from 'autonumeric/dist/autoNumeric.min.js'
import { setProp } from './util/lang'
import { checkElementType, unshiftEventHandler, getVNodeValue, getElementValue } from './util/dom'

let MyPlugin = {
  AutoNumeric,
  install: Function
}

MyPlugin.install = function(Vue: Vue, outerOptions: PluginsOptions = {}) {
  Vue.directive('number', {
    bind(el, binding: VNodeDirective, vnode: VNode) {
      // TODO 如何支持循环组件
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
    update(el, binding: VNodeDirective, vnode: VNode) {
      if (el._autoNumericElement.lastVal !== binding.value.bind) { // 通过代码直接修改了binding.value.bind会进入这个逻辑
        let targetElement = checkElementType(el, vnode)
        let oldValue = getVNodeValue(vnode)
        let options = getOptions(binding, outerOptions)

        el._autoNumericElement.remove()
        el._autoNumericElement = new AutoNumeric(targetElement, options.numricOptions)
      }
    },
  })
}

export default MyPlugin