import axios, { AxiosRequestConfig } from '../../src/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { AxiosError } from '../../src/helpers/error'
import qs from 'qs'

/* document.cookie = 'a=b'

axios.get('/more/get').then(res => {
  console.log(res)
})

axios.post('http://127.0.0.1:8088/more/server2', {}, {withCredentials: true}).then(res => {
  console.log(res)
}) */
/* ---------------------------------- */

// 测试demo防止XSRF
/* const instance = axios.create({
  xsrfCookieName: 'XSRF-TOKEN-D',
  xsrfHeaderName: 'X-XSRF-TOKEN-D',
})

instance.get('/more/get').then(res => {
  console.log(res)
}) */
/* ---------------------------------- */

// 进度条nprogress功能demo
const instance = axios.create()

function loadProgressBar() {
  const setupStartProgress = () => {
    instance.interceptors.request.use(config => {
      NProgress.start()
      return config
    })
  }
  const setupUpdateProgress = () => {
    const update = (e:ProgressEvent) => {
      NProgress.set(calculatePercentage(e.loaded, e.total))
    }
    instance.defaults.onDownloadProgress = update
    instance.defaults.onUploadProgress = update
  }
  const setupStopProgress = () => {
    instance.interceptors.response.use(res => {
      NProgress.done()
      return res
    }, err => {
      NProgress.done()
      return Promise.reject(err)
    })
  }

  setupStartProgress()
  setupUpdateProgress()
  setupStopProgress()

  function calculatePercentage(loaded:number, total:number) {
    // 隐式转换成数字 str*1.0
    // return Math.floor(loaded*1.0)/total
    return Math.floor(loaded)/total
  }
}

loadProgressBar()

const downloadEL = document.getElementById('download')
downloadEL?.addEventListener('click', function(e) {
  instance.get('https://img1.sycdn.imooc.com/655ac5410001027017920764.jpg')
})

const uploadEL = document.getElementById('upload')
uploadEL?.addEventListener('click', function(e) {
  const data = new FormData()
  const fileEl = document.getElementById('file') as HTMLInputElement
  if (fileEl.files) {
    data.append('file', fileEl.files[0])

    instance.post('/more/upload', data)
  }
})

/* ---------------------------------- */

// http Authorization
/* axios.post('/more/post', {
  a: 1
}, {
  auth: {
    username: 'Yee',
    password: '123456'
  }
}).then(res => {
  console.log(res)
}) */

/* ---------------------------------- */

// 自定义合法状态码功能
/* axios.get('/more/304', {
  // validateStatus(status) {
  //   return status >=200 && status < 400
  // }
}).then(res => {
  console.log(res)
}).catch((err:AxiosError) => {
  console.log(err.message)
})

axios.get('/more/304', {
  validateStatus(status) {
    return status >=200 && status < 400
  }
}).then(res => {
  console.log(res)
}).catch((err:AxiosError) => {
  console.log(err.message)
}) */

/* ---------------------------------- */

// 自定义url参数序列化规则功能
/* axios.get('/more/get', {
  params: new URLSearchParams('a=b&c=d')
}).then(res => {
  console.log(res)
})

axios.get('/more/get', {
  params: {
    a: 1,
    b: 2,
    c: ['a', 'b', 'c']
  }
}).then(res => {
  console.log(res)
})

const instance2 = axios.create({
  paramsSerializer(params) {
    return qs.stringify(params, {arrayFormat: 'brackets'})
  }
})
instance2.get('/more/get', {
  params: {
    a: 1,
    b: 2,
    c: ['a', 'b', 'c']
  }
}).then(res => {
  console.log(res)
}) */

// baseURL
/* const instance3 = axios.create({
  baseURL: 'https://img1.sycdn.imooc.com/'
})

instance3.get('/655db1a3000181d716000682.jpg')

instance3.get('https://img1.sycdn.imooc.com/655587f9000116e716000682.jpg') */

/* ---------------------------------- */

// 
function getA() {
  return axios.get('/more/A')
}

function getB() {
  return axios.get('/more/B')
}

axios.all([getA(), getB()])
  .then(axios.spread(function(resA, resB) {
    console.log(resA.data)
    console.log(resB.data)
}))

axios.all([getA(), getB()])
  .then(([resA, resB]) => {
    console.log(resA.data)
    console.log(resB.data)
})

/* const fakeConfig: AxiosRequestConfig = {
  baseURL: 'https://www.baidu.com/',
  url: '/user/12345',
  params: {
    idClient: 1,
    idTest: 2,
    testString: 'thisIsTest'
  }
}

console.log(axios.getUri(fakeConfig)) */