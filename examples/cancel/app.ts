import axios from '../../src/index'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

axios.get('/cancel/get', {
  cancelToken: source.token
}).catch(e => {
  if (axios.isCancel(e)) {
    console.log('1: Request canceled', e.message)
  }
})

setTimeout(() => {
  source.cancel('Operation canceled by the user')

  axios.post('/cancel/post', {a:1}, {
    cancelToken: source.token
  }).catch(e => {
    if (axios.isCancel(e)) {
      console.log('2: Request canceled', e.message)
    }
  })
}, 100);

let cancel
axios.get('/cancel/get', {
  cancelToken: new CancelToken(c => {
    cancel = c
  })
}).catch(e => {
  if (axios.isCancel(e)) {
    console.log('3: Request canceled', e.message)
  }
})

setTimeout(() => {
  cancel()
}, 200);
