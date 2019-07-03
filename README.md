## Introduction

`vue-autonumeric-directive`是一个基于[autoNumeric](https://github.com/keepgoingwm/autoNumeric#options)的Vue插件，使用简单的指令方式，对需要的元素添加格式化功能。

## Use Guide

### Installation

```shell
# with `yarn` :
yarn add vue-autonumeric-directive
# or with `npm` :
npm install vue-autonumeric-directive --save
```

### How to use?

按照Vue插件方式注册插件。

在浏览器中插件的全局名称为`VueNumberFormat`。

```vue
<input name="input1" id="input1" v-model="input1" v-number="config1">
```

```js
new Vue({
  el: '#demo',

  data: {
    input1: '123.00',
    config1: { bind: 'input1' },
    input2: 32,
  }
})
```



## On which elements can it be used

[On which elements can it be used](https://github.com/keepgoingwm/autoNumeric#on-which-elements-can-it-be-used)

### <input>

只支持下列input类型

+ text,
+ tel,
+ hidden, or
+ no type specified at all

### 支持contenteditable元素

### 支持其他元素的一次性格式化

### 支持Vue组件

支持element-ui Input组件

## Options

```
declare type InputOptions = {
  unsafeSet: boolean;

  bind: string;
  min: string,
  max: string,
  presion: string,

  local: string,
  predifined: string,

  numricOptions: AutoNumericOptions;
};
```

### numricOptions选项

参考numberic
numricOptions [autoNumeric options](https://github.com/keepgoingwm/autoNumeric#options)


## Features

1. 保留原事件响应
2. 把AutoNumeric挂在了插件下
3. 把AutoNumeric的实例挂在了对应的element下，方便调用它的方法