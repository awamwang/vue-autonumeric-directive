declare type PluginsOptions = {
  unsafeSet: boolean; // use unsafe method to set value to element and vnode (eval, more powerful)

  presion: number;
}

declare type AutoNumericOptions = Object

declare type Options = {
  unsafeSet: boolean;

  bind: string;

  numricOptions: Array < AutoNumericOptions > ;
};

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