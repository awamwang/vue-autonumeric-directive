export type PluginsOptions = {
  unsafeSet: boolean; // use unsafe method to set value to element and vnode (eval, more powerful)

  presion: number;
}

export type AutoNumericOptions = Object

export type Options = {
  unsafeSet: boolean;

  bind: string;

  numricOptions: Array < AutoNumericOptions > ;
};

export type InputOptions = {
  unsafeSet: boolean;

  bind: string;
  min: string,
  max: string,
  presion: string,

  local: string,
  predifined: string,

  numricOptions: AutoNumericOptions;
};