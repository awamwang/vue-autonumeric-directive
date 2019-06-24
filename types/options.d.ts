export type MinMaXFlag = "<" | ">" | "<=" | ">="

export type PluginsOptions = {
  unsafeSet: boolean; // use unsafe method to set value to element and vnode (eval, more powerful)

  presion: number;
}

export type Options = {
  unsafeSet: boolean;

  bind: string;
  isInt ? : boolean;
  toNumber ? : boolean;

  min ? : number;
  minFlag ? : MinMaXFlag;
  minValidValue: string;
  max ? : number;
  maxFlag ? : MinMaXFlag;
  maxValidValue: string;
  presion: number;

  validFloatReg: RegExp;
  morePresionReg: RegExp | void;
};