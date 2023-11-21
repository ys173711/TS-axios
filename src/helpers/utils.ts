const toString = Object.prototype.toString

export function isDate(params: any): params is Date {
  return toString.call(params) === '[object Date]'
}

export function isObject(params: any): params is Object {
  return params !== null && typeof params === 'object'
}

export function isPlainObject(params: any): params is Object {
  return toString.call(params) === '[object Object]'
}

// 把from拷贝到to中
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }

  return to as T & U
}

//
export function deepMerge(...args: any[]) {
  const result = Object.create(null)
  args.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })
  return result
}

export function isFormData(val: any): val is FormData {
  return typeof val !== 'undefined' && val instanceof FormData
}
