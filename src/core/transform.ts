import { AxiosConfigTransform } from '../types'

export default function transform(
  data: any,
  headers: any,
  fns?: AxiosConfigTransform | AxiosConfigTransform[]
) {
  if (!fns) {
    return data
  }
  if (!Array.isArray(fns)) {
    fns = [fns]
  }
  fns.forEach(fn => {
    data = fn(data, headers)
  })
  return data
}
