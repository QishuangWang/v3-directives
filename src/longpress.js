const longpress = {
  beforeMount(el, binding) {
    const cb = binding.value;
    if (typeof cb !== 'function') return console.warn('v-longpress指令必须接收一个回调函数');
    let timer = null;
    // 重置计时器
    const cancel = () => {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
    }

    el.addEventListener('mousedown', (e) => {
      // 排除点击与右键情况, event.button: 0-左键  2-右键
      if (e.type === 'click' && e.button !== 0) return;
      e.preventDefault();
      if (timer === null) {
        timer = setTimeout(() => {
          cb();
          timer = null;
        }, 1000)
      }
    });

    el.addEventListener('click', cancel);
    el.addEventListener('mouseout', cancel);
    // or - 长按后移出元素外是否还有效
    // el.addEventListener('mouseup', cancel);
  },
  unmounted(el) {
    el.removeEventListener('mousedown', () => {});
    el.removeEventListener('click', () => {});
    el.removeEventListener('mouseout', () => {});
  }
}

export default longpress