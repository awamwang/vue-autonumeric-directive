# vue-autonumeric-directive

[![npm Version][NPM VERSION BADGE]][NPM PAGE]  [![Node.js][NODE VERSION BADGE]][NODE PAGE]  [![GitHub License][LICENSE BADGE]][LICENSE PAGE]  [![Build Status][BUILD BADGE]][BUILD PAGE]



[example](https://github.com/keepgoingwm/vue-autonumeric-directive/tree/master/examples)

<!--ts-->
<!--te-->

## Introduction

`vue-autonumeric-directive`是一个基于[autoNumeric](https://github.com/autoNumeric/autoNumeric)的Vue插件，使用简单的指令方式，对需要的元素添加格式化功能。

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

[On which elements can it be used](https://github.com/autoNumeric/autoNumeric#on-which-elements-can-it-be-used)

### \<input\>

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

### 全局Options

```typescript
export type PluginsOptions = {
  unsafeSet: boolean; // use unsafe method to set value to element and vnode (eval, more powerful)

  pure: boolean;	// 是否不使用分隔符（例如千分位逗号）
  presion: number;	  // 精确到小数点后几位
}
```

### 指令Options
```typescript
declare type InputOptions = {
  unsafeSet: boolean;

  bind: string;
  min: string,
  max: string,
  presion: string,  // 精确到小数点后几位

  local: string,    // autoNumeric本地化配置，
  predifined: string, // autoNumeric预定义配置

  numricOptions: AutoNumericOptions;
};
```
+ local: 参考[autoNumeric language options](https://github.com/autoNumeric/autoNumeric#predefined-language-options)
+ predifined: 参考[autoNumeric predifined options](https://github.com/autoNumeric/autoNumeric#predefined-options)

### 指令modifiers

+ int // 整数
+ pure // 不使用分隔符（例如千分位逗号）
+ ppi  // pure positive integer 无分隔符正整数

### numricOptions选项

参考numberic
numricOptions [autoNumeric options](https://github.com/autoNumeric/autoNumeric#options)


## Features

1. 保留原事件响应
2. 把AutoNumeric挂在了插件下
3. 把AutoNumeric的实例挂在了对应的element下，方便调用它的方法




[BUILD BADGE]: https://travis-ci.com/keepgoingwm/vue-autonumeric-directive.svg?branch=master
[BUILD PAGE]: https://travis-ci.com/keepgoingwm/vue-autonumeric-directive
[LICENSE BADGE]: https://img.shields.io/badge/license-MIT%20License-blue.svg?style=flat-square
[LICENSE PAGE]: https://github.com/keepgoingwm/node-readme-md/blob/master/LICENSE
[NODE PAGE]: https://nodejs.org/
[NODE VERSION BADGE]: https://img.shields.io/node/v/readme-md.svg?style=flat-square
[NPM PAGE]: https://www.npmjs.com/package/vue-autonumeric-directive
[NPM VERSION BADGE]: https://img.shields.io/npm/v/vue-autonumeric-directive.svg?style=flat-square
