const backTop =  {
  mounted(el, binding, vnode) {
    // 响应点击后滚动到元素顶部
    el.addEventListener("click", () => {
      const target = binding.arg ?
        document.getElementById(binding.arg) :
        window;
      target.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  },
  updated(el, binding, vnode) {
    // 滚动到达参数值才出现绑定指令的元素
    const target = binding.arg ? document.getElementById(binding.arg) : window;
    if (binding.value) {
      target.addEventListener("scroll", (e) => {
        if (e.srcElement.scrollTop > binding.value) {
          el.style.visibility = "unset";
        } else {
          el.style.visibility = "hidden";
        }
      });
    }
    // 判断初始化状态
    if (target.scrollTop < binding.value) {
      el.style.visibility = "hidden";
    }
  },
  unmounted(el) {
    const target = binding.arg ? document.getElementById(binding.arg) : window;
    target.removeEventListener("scroll");
    el.removeEventListener("click");
  },
};
export default backTop