export interface PluginsOptions {
  unsafeSet: boolean; // use unsafe method to set value to element and vnode (eval, more powerful)

  pure: boolean; // 是否不使用分隔符（例如千分位逗号）
  presion: number; // 精确到小数点后几位
}

export type AutoNumericOptions = Object;

export interface Options {
  unsafeSet: boolean;

  bind: string;

  numricOptions: Array<AutoNumericOptions>;
}

export interface InputOptions {
  unsafeSet: boolean;

  bind: string;
  min: string;
  max: string;
  presion: string; // 精确到小数点后几位

  local: string; // autoNumeric本地化配置，
  predifined: string; // autoNumeric预定义配置

  numricOptions: AutoNumericOptions;
}
