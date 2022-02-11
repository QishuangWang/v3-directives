const collapse = {
  mounted(el, binding) {
    const { value } = binding
    el.style.height = value.open
    el.style.position = 'relative'
    el.style.transition = 'all .4s'
    let collapse = true
    const collapseBtn = document.createElement('i')
    const style = value.style || {
      position: 'absolute',
      right: '15px',
      top: '12px',
      zIndex: '9999',
      transform: 'rotate(0deg)',
      color: '#333',
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'all .4s',
    }
    Object.keys(style).forEach((key) => {
      collapseBtn.style[key] = style[key]
    })
    collapseBtn.className = value.icon || ''
    el.appendChild(collapseBtn)
    collapseBtn.addEventListener('click', (e) => {
      if (collapse) {
        e.target.style.transform = 'rotate(180deg)'
        el.style.height = value.close
      } else {
        e.target.style.transform = 'rotate(0deg)'
        el.style.height = value.open
      }
      collapse = !collapse
    })
  }
}
export default collapse
