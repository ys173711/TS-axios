const toString = Object.prototype.toString

export function isDate(params: any): params is Date {
  return toString.call(params) === '[object Date]'
}

export function isObject(params: any): params is Object {
  // return toString.call(params) === '[object Object]'
  return params !== null && typeof params === 'object'
}
