# v3-directives

## 使用方法

1. 安装依赖

```
npm install v3-directives --save
```

2. 注册指令

```js
import VueDirectives from "v3-directives";
Vue.use(VueDirectives);
```

基于 vue 的自定义指令集合，包含

- 复制粘贴指令 v-copy
- 图片出错时可使用默认图片 v-RealImg
- 长按指令 v-longpress
- 防抖指令 v-debounce
- 禁止表情及特殊字符 v-emoji
- 限制输入框类型，可传正则 v-input:type
- 图片懒加载 v-LazyLoad
- 权限校验指令 v-premission
- 实现页面水印 v-waterMarker
- 拖拽指令 v-draggable
- 文字超出宽度隐藏 v-ellipsis
- 拖拽指令 v-hide-text

## v-copy

使用：给 Dom 加上 v-copy 及复制的文本即可

```html
<template>
  <button v-copy="copyText">复制</button>
</template>

<script>
  export default {
    data() {
      return {
        copyText: "a copy directives",
      };
    },
  };
</script>
```

## v-copy

使用：给 Dom 加上 v-RealImg

```html
<template>
  <img v-RealImg="'images/logo.png'" src="images/errorLogo.png" />
</template>

<script>
  export default {
    data() {
      return {
        copyText: "a copy directives",
      };
    },
  };
</script>
```

## v-longpress

使用：给 Dom 加上 longpress:[1000] 及回调函数即可,可传时间，单位 ms

```html
<template>
  <button v-longpress:[1000]="longpress">长按</button>
</template>

<script>
export default {
  methods: {
    longpress () {
      alert('长按指令生效')
    }
  }
}
```

## v-debounce

使用：给 Dom 加上 v-debounce 及回调函数即可

```html
<template>
  <button v-debounce="debounceClick">防抖</button>
</template>

<script>
export default {
  methods: {
    debounceClick () {
      console.log('只触发一次')
    }
  }
}
```

## v-emoji

使用：将需要校验的输入框加上 v-emoji 即可
只能输入数字字母汉字

```html
<template>
  <input type="text" v-model="note" v-emoji />
</template>
```

## v-input:type

使用：type 值：
'number'：数字类型,
'decimal'：数字加小数,
'decimal_2'：数字加 2 位小数,
'customize'：自定义正则，允许你通过 data-rule= 传递一个自定义的正则表达式

```html
<template>
  <input
    v-input:customize="inputValue"
    data-rule="/[^\d]/"
    v-model="inputValue"
  />
</template>
```

## v-LazyLoad

使用，将组件内 <img> 标签的 src 换成 v-LazyLoad

```html
<img v-LazyLoad="xxx.jpg" />
```

## v-permission

使用：给 v-permission 赋值判断即可

```html
<div class="btns">
  <!-- 显示 -->
  <button v-permission="'1'">权限按钮1</button>
  <!-- 不显示 -->
  <button v-permission="'10'">权限按钮2</button>
</div>
```

## v-waterMarker

使用，设置水印文案，颜色，字体大小即可

```html
<template>
  <div
    v-waterMarker="{text:'wqs版权所有',textColor:'rgba(180, 180, 180, 0.4)'}"
  ></div>
</template>
```

## v-draggable

使用: 在 Dom 上加上 v-draggable,传 id 即在父级内部拖拽，不传则在可视区域

```html
<div
  id="draggableBox"
  style="width: 500px;height:500px;border:1px solid red;margin: 100px 0 0 300px"
>
  <div
    v-draggable:draggableBox
    style="width:100px;height:100px;background:red;"
  ></div>
</div>
```

## v-ellipsis

使用: 在 Dom 上加上 v-ellipsis:100,参数 width

```html
<template>
  <div v-ellipsis:100>
    需要省略的文字是阿萨的副本阿萨的副本阿萨的副本阿萨的副本
  </div>
</template>
```

## v-hide-text

支持三种修饰符
name：两个字隐藏后一个，两个字以上隐藏中间（默认）；
mobile：手机号码，展示前 3 后 4；
idcard：身份证，展示前 6 后 4
使用: 在 Dom 上加上 v-hide-text.name

```html
<template>
  <div v-hide-text.name>张三</div>
  <!-- 张* -->
  <div v-hide-text.name>张三丰</div>
  <!-- 张*丰 -->
  <div v-hide-text.mobile>13412345678</div>
  <!-- 134****5678 -->
  <div v-hide-text.idcard>422124199010101234</div>
  <!-- 422124********1234 -->
</template>
```

## v-format-text

支持传入指定的绑定值，参数和修饰符
value 分隔符，默认为,
arg 指令参数，默认为 3，每隔 3 个字符分割一次
modify 暂时只支持传入 money(金额千分位)

```html
<template>
  <div v-format-text.money=",">123456789</div>
  <!-- 123,456,789 -->
  <div v-format-text.money="_">123456789</div>
  <!-- 123_456_789 -->
  <div v-format-text.money:4=",">123456789</div>
  <!-- 1234,4567,89 -->
  <div v-format-text.money:4=",">123456789</div>
  <!-- 1234,4567,89 -->
  <div v-format-text>abcdefghi</div>
  <!-- abc,def,ghi- -->
</template>
```
