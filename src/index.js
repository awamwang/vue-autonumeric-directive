/* @flow */
import getOptions from './options'
import AutoNumeric from 'autonumeric/dist/autoNumeric.min.js'
import { setProp, getProp } from './util/lang'
import { checkElementType, unshiftEventHandler, getElementValue } from './util/dom'

let MyPlugin = {
  AutoNumeric,
  install: Function
}

MyPlugin.install = function(Vue: Vue, outerOptions: PluginsOptions = {}) {
  Vue.directive('number', {
    bind(el, binding: VNodeDirective, vnode: VNode) {
      // TODO 如何支持循环组件
      let options: Options = getOptions(binding, outerOptions)

      let targetElement = checkElementType(el, vnode)
      let oldValue = getProp(vnode.context, options.bind)

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
      let options = getOptions(binding, outerOptions)
      let bindValue = getProp(vnode.context, options.bind)

      if (el._autoNumericElement.lastVal !== bindValue) { // 通过代码直接修改了绑定的值，会进入这个逻辑
        let targetElement = checkElementType(el, vnode)
        let options = getOptions(binding, outerOptions)

        el._autoNumericElement.remove()
        el._autoNumericElement = new AutoNumeric(targetElement, bindValue, options.numricOptions)
      }
    },
  })
}

export default MyPlugin