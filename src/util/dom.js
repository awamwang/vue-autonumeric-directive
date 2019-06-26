import { error, warn } from './log'
import { getProp } from './lang'

const allowedInputType = ['text', 'tel', 'hidden', null]
const allowedTagList = [
  'b', 'caption', 'cite', 'code', 'const', 'dd', 'del', 'div', 'dfn', 'dt', 'em', 'h1', 'h2', 'h3',
  'h4', 'h5', 'h6', 'ins', 'kdb', 'label', 'li', 'option', 'output', 'p', 'q', 's', 'sample',
  'span', 'strong', 'td', 'th', 'u'
]

function getChildInput(el) {
  if (el.children) {
    let input = Array.prototype.find.call(el.children, e => e.tagName === 'INPUT')

    if (input) {
      return input
    }
  }

  return el
}

function handleElementUI(el, realElement, vnode) {
  if (Array.prototype.includes.call(el.classList, 'el-input')) {
    realElement.value = vnode.data.model.value
  }
}

export let checkElementType = (el, vnode) => {
  let realElement = getChildInput(el)
  handleElementUI(el, realElement, vnode)

  if (realElement.tagName === 'INPUT') {
    if (!allowedInputType.includes(realElement.getAttribute('type'))) {
      error('wrong INPUT element type')
    }
  } else if (!realElement.getAttribute('contenteditable')) {
    if (allowedTagList.includes(realElement.tagName.toLowerCase())) {
      // warn('once use to format number')
    } else {
      error('wrong element type, or should be contenteditable')
    }
  }

  return realElement
}

export let unshiftEventHandler = (el, eventType, handler) => {
  el.addEventListener(eventType, handler)
  // let handlerArr = getEventListeners(el)[eventType]
  // console.log(handlerArr)

  // if (handlerArr) {
  //   handlerArr.unshift(handler)
  // } else {
  //   el.addEventListener(eventType, handler) 
  // }
}

export let getVNodeValue = (vnode) => {
  let res
  let ele = vnode.elm

  if (vnode.data && vnode.data.model) {
    res = vnode.data.model.value
  } else if (vnode.data && vnode.data.domProps) {
    res = vnode.data.domProps.value
  } else if (ele && ele.tagName !== 'INPUT' && ele.innerText) {
    res = ele.innerText
  } else {
    // warn('target vnode hasn\'t bound value, may cause bug')
  }
  return res
}

export let getElementValue = (ele) => {
  let res

  if (ele.tagName === 'INPUT') {
    res = ele.value
  } else {
    res = ele.innerText
  }

  return res
}