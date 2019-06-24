/* @flow */
import AutoNumeric from 'autonumeric/dist/autoNumeric.min.js'
import { error } from './util/log'

let localOptions = {
  FR: 'French',
  ES: 'Spanish',
  US: 'NorthAmerican',
  GB: 'British',
  CH: 'Swiss',
  JP: 'Japanese',
  CN: 'Chinese',
  BR: 'Brazilian',
  TR: 'Turkish',
}

function setNumricOptions(optionsArr, key, value) {
  let realOption = optionsArr[optionsArr.length - 1][key] = value
}

function handleLocalOption(binding, options) {
  let local: string = binding.value.local
  if (local in localOptions) {
    options.unshift(AutoNumeric.getPredefinedOptions()[localOptions[local]])
  }
}

function handlePredefinedOption(binding, options) {
  let predifined: boolean = binding.value.predifined
  if (predifined) {
    options.unshift(AutoNumeric.getPredefinedOptions()[predifined])
  }
}

function handlePresionOption(binding, numeriOptionsArr, outerOptions) {
  let isInt: boolean = binding.modifiers.int
  let defaultPresion = outerOptions.presion !== undefined ? outerOptions.presion : 2
  let presion: number = binding.value.presion !== undefined ? binding.value.presion : (isInt ? 0 : defaultPresion)

  setNumricOptions(numeriOptionsArr, 'decimalPlaces', presion.toString())
}

function handlePureOption(binding, options) {
  let isPure: boolean = binding.modifiers.pure
  if (isPure) {
    setNumricOptions(options, 'digitGroupSeparator', '')
  }
}

function handMinMaxOption(binding, options) {
  let min: string = binding.value.min
  let max: string = binding.value.max

  if (typeof min === 'string' && typeof Number(min) === 'number') {
    setNumricOptions(options, 'minimumValue', min)
  } else if (min !== undefined) {
    error('wrong min value, should be a valid numeric String')
  }
  if (typeof max === 'string' && typeof Number(max) === 'number') {
    setNumricOptions(options, 'maximumValue', max)
  } else if (max !== undefined) {
    error('wrong max value, should be a valid numeric String')
  }
}

export default function getOptions(binding: VNodeDirective, outerOptions: PluginsOptions = {}) {
  let isInt: boolean = binding.modifiers.int
  let unsafeSet: boolean = binding.value.unsafeSet || outerOptions.unsafeSet

  let numricOptions: Array < AutoNumericOptions > = binding.value.numricOptions ? [binding.value.numricOptions] : [{}]

  if (isInt && !binding.value.predifined) {
    binding.value.predifined = 'integer'
  }

  handlePredefinedOption(binding, numricOptions) // 先执行产生的配置在配置数组后面，优先级高
  handleLocalOption(binding, numricOptions)

  handlePresionOption(binding, numricOptions, outerOptions)
  handlePureOption(binding, numricOptions)
  handMinMaxOption(binding, numricOptions)

  return {
    unsafeSet,

    bind: binding.value.bind,

    numricOptions,
  }
}