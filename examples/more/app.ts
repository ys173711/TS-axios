import { error } from 'console'
import axios from '../../src/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

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
