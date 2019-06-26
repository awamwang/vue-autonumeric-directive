
## Use Guide

## On which elements can it be used

[autoNumeric On which elements can it be used](https://github.com/keepgoingwm/autoNumeric#on-which-elements-can-it-be-used)

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

保留原事件响应
把AutoNumeric挂在了插件下
把AutoNumeric的实例挂在了对应的element下，方便调用它的方法