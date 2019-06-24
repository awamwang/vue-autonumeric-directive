import { error } from './log'

const allowedInputType = ['text', 'tel', 'hidden', null]
{/* <p id="editableDom" contenteditable="true">12345678.9012</p> */}
const allowedTagList = [
    'b', 'caption', 'cite', 'code', 'const', 'dd', 'del', 'div', 'dfn', 'dt', 'em', 'h1', 'h2', 'h3',
    'h4', 'h5', 'h6', 'ins', 'kdb', 'label', 'li', 'option', 'output', 'p', 'q', 's', 'sample',
    'span', 'strong', 'td', 'th', 'u'
]

export let checkElementType = (el) => {
  if (el.tagName !== 'INPUT' || !allowedInputType.includes(el.getAttribute('type'))) {
    error('wrong element type')
  }
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