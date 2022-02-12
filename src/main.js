import copy from './copy'
import RealImg from './realImg'
import emoji from './emoji'
import input from './input'
import longpress from './longpress'
import debounce from './debounce'
import waterMarker from './waterMarker'
import draggable from './draggable'
import LazyLoad from './lazyLoad'
import ellipsis from './ellipsis'
import hideText from './hideText'
import formatText from './formatText'
import collapse from './collapse'
import backTop from './backTop'
// 自定义指令
const directives = {
  copy,
  emoji,
  input,
  longpress,
  debounce,
  waterMarker,
  draggable,
  LazyLoad,
  RealImg,
  ellipsis,
  hideText,
  formatText,
  collapse,
  backTop
  }
export default {
  install(app) {
    Object.keys(directives).forEach((key) => {
      app.directive(key, directives[key])
    })
  }
}