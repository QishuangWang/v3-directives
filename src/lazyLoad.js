const LazyLoad = {
  beforeMount(el, binding) {
    el.$data_src = binding.value;
  },
  mounted(el) {
    IntersectionObserver ? ioEvent(el) : scrollEvent(el);
  },
  updated(el, binding) {
    el.$data_src = binding.value;
  },
  unmounted(el) {
    IntersectionObserver && el.$io.disconnect();
  }
}

function ioEvent(el) {
  const io = new IntersectionObserver(entries => {
    const realSrc = el.$data_src;
    entries[0].isIntersecting && realSrc && (el.src = realSrc);
  });
  el.$io = io;
  io.observe(el);
}

function scrollEvent(el) {
  const handler = throttler(loadImg, 250);
  loadImg(el);
  window.addEventListener('scroll', () => {
    handler(el);
  })
}

function loadImg(el) {
  const clientHeight = getClientHeight();
  const {
    top,
    bottom
  } = el.getBoundingClientRect();
  const realSrc = el.$data_src;
  (top < clientHeight && bottom > 0) && realSrc && (el.src = realSrc);
}

function getClientHeight() {
  const dClientHeight = document.documentElement.clientHeight;
  const bodyClientHeight = document.body.clientHeight;
  let clientHeight = 0;
  if (bodyClientHeight && dClientHeight) {
    clientHeight = bodyClientHeight < dClientHeight ? bodyClientHeight : dClientHeight;
  } else {
    clientHeight = bodyClientHeight > dClientHeight ? bodyClientHeight : dClientHeight;
  }
  return clientHeight;
}

function throttler(fun, delay) {
  let last, deferTimer
  return function (args) {
    let that = this
    let _args = arguments
    let now = +new Date()
    if (last && now < last + delay) {
      clearTimeout(deferTimer)
      deferTimer = setTimeout(function () {
        last = now
        fun.apply(that, _args)
      }, delay)
    } else {
      last = now
      fun.apply(that, _args)
    }
  }
}
export default LazyLoad;