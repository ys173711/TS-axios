import { deepMerge, isPlainObject } from '../helpers/utils'
import { AxiosRequestConfig } from '../types'

function defaultStrate(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

function key2Strate(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

function deepMergeStrate(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}

const strate = Object.create(null)
const strateKeysFromKey2Strate = ['url', 'params', 'data']
strateKeysFromKey2Strate.forEach(key => {
  strate[key] = key2Strate
})

const strateKeysDeepMerge = ['headers', 'auth']
strateKeysDeepMerge.forEach(key => {
  strate[key] = deepMergeStrate
})

export default function mergeConfig(
  defaultConfig: AxiosRequestConfig,
  userConfig?: AxiosRequestConfig
) {
  if (!userConfig) {
    userConfig = {}
  }

  const config = Object.create(null)

  for (const key in userConfig) {
    mergeField(key)
  }
  for (let key in defaultConfig) {
    if (!userConfig[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string) {
    const strat = strate[key] || defaultStrate
    config[key] = strat(defaultConfig[key], userConfig![key])
  }

  return config
}
