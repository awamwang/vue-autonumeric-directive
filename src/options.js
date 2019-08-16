/* @flow */
import AutoNumeric from 'autonumeric/dist/autoNumeric.min.js'
import {
  error
} from './util/log'

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

function handleBindOption(binding) {
  let bind = binding.value.bind
  if (typeof bind !== 'string') {
    error('wrong bind value, should be a prop path string')
  }
}

function setNumricOptions(optionsArr, key, value) {
  optionsArr[optionsArr.length - 1][key] = value
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

function handlePureOption(binding, options, outerOptions) {
  let isPure: boolean = binding.modifiers.pure || outerOptions.pure
  if (isPure) {
    setNumricOptions(options, 'digitGroupSeparator', '')
  }
}

function handMinMaxOption(binding, options) {
  let min: string = binding.value.min
  let max: string = binding.value.max

  min !== undefined && (min = min.toString())
  max !== undefined && (max = max.toString())
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
  let isPurePositiveInteger: boolean = binding.modifiers.ppi
  let unsafeSet: boolean = binding.value.unsafeSet || outerOptions.unsafeSet

  handleBindOption(binding)

  let numricOptions: Array<AutoNumericOptions> = binding.value.numricOptions ? [binding.value.numricOptions] : [{}] // 维护一个配置数组，新增的配置unshift进来

  if (isInt && !binding.value.predifined) {
    binding.value.predifined = 'integer'
  }
  if (isPurePositiveInteger && !binding.value.predifined) {
    binding.value.predifined = 'integerPos'
    setNumricOptions(numricOptions, 'digitGroupSeparator', '')
  }

  handlePredefinedOption(binding, numricOptions)
  handleLocalOption(binding, numricOptions)

  handlePresionOption(binding, numricOptions, outerOptions)
  handlePureOption(binding, numricOptions, outerOptions)
  handMinMaxOption(binding, numricOptions)

  return {
    unsafeSet,

    bind: binding.value.bind,

    numricOptions,
  }
}