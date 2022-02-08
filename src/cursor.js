// cursor.js
/**
 * 获取光标位置
 * @param elObject: getElementsByTagName('INPUT')
 * @returns {number}: 光标位置
 */
function getCursorPos(elObject) {
  let CaretPos = 0;
  // IE Support 
  if (document.selection) {
    elObject.focus(); // 获取光标位置函数 
    let Sel = document.selection.createRange();
    Sel.moveStart('character', -elObject.value.length);
    CaretPos = Sel.text.length;
  }
  // Firefox/Safari/Chrome/Opera support 
  else if (elObject.selectionStart || elObject.selectionStart == '0')
    CaretPos = elObject.selectionEnd;
  return (CaretPos);
}

/**
 * 设置光标位置
 * @param elObject: getElementsByTagName('INPUT')
 * @param pos: 光标位置
 */
function setCursorPos(elObject, pos) {
  // Firefox/Safari/Chrome/Opera
  if (elObject.setSelectionRange)
    elObject.setSelectionRange(pos, pos);
  // IE
  else if (elObject.createTextRange) {
    let range = elObject.createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
  }
}

/**
 * 替换后定位光标在原处,可以这样调用onkeyup=replaceAndSetPos(this,/[^/d]/g,''); 
 * @param elObject: getElementsByTagName('INPUT')
 * @param pattern: 正则
 * @param text
 */
const replaceAndSetPos = function (elObject, pattern, text) {
  /* if(event.shiftKey||event.altKey||event.ctrlKey||
        event.keyCode==16||event.keyCode==17||event.keyCode==18||
        (event.shiftKey&&event.keyCode==36)
     ) 
    return;
  */
  // 保存原始光标位置
  let pos = getCursorPos(elObject);
  // 保存原始值
  let temp = elObject.value;
  // 替换掉非法值
  elObject.value = temp.replace(pattern, text);
  // 截掉超过长度限制的字串(要求设置maxlength属性)
  let max_length = elObject.getAttribute && elObject.getAttribute('maxlength') ? parseInt(elObject.getAttribute('maxlength')) : '';
  if (max_length && elObject.value.length > max_length) {
    // (1) elObject.value = elObject.value.substring(0, max_length); 若用户在中间进行输入，此方法则达不到效果

    // (2) 可以满足任何情况,当超过输入了,去掉新输入的字符
    let str1 = elObject.value.substring(0, pos - 1);
    let str2 = elObject.value.substring(pos, max_length + 1);
    elObject.value = str1 + str2;

    /* (3) 在支持keycode等一系列的情况下使用
     * var e=e||event; 
     * currKey=e.keyCode||e.which||e.charCode;
     * currKey = 0;
     * or
     * window.onkeydown=function(){ 
     * if( event.keyCode!=37 && event.keyCode!=39 && event.keyCode!=8 ){ // 左、右、删除
     *   return false;
     * }
     */
  }

  pos = pos - (temp.length - elObject.value.length); // 当前光标位置 
  setCursorPos(elObject, pos); // 设置光标 
};

const inputFilter = {
  getCursorPos: getCursorPos,
  setCursorPos: setCursorPos,
  replaceAndSetPos: replaceAndSetPos
};

export default inputFilter;