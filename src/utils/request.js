import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import router from '@/router'
import store from '@/store'

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API // api的base_url
})

// request拦截器
service.interceptors.request.use(config => {
  // 配置config
  config.headers.Accept = 'application/json'
  if (config.method === 'post') {
    config.data = qs.stringify(config.data, { arrayFormat: 'repeat' })
    // 处理后后台无需添加RequestBody
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }
  return config
}, error => {
  Message.error({ error })
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(response => {
  let taR = response.data
  if (response && response.status === 200) {
    if (response.data === undefined) { // 解决IE9数据问题
      taR = response.request.responseText
    } else {
      taR = response.data
    }
    if (!(taR instanceof Object)) { // 判断taR不是Object时，解析成Object
      taR = JSON.parse(taR)
    }
    if (!taR.success && taR.code === 0) {
      Message.error(taR.msg || taR.detailMsg)
    }
    if (!taR.success && taR.code === 1) {
      store.dispatch('FedLogOut').then(() => {
        Message.error('登录状态失效，请重新登录')
        router.push({ path: '/' })
      })
    }
    return taR
  } else {
    Message.error('请求错误1，请重试')
    return Promise.resolve(response)
  }
}, error => {
  Message.error('服务器请求错误，请重试')
  return Promise.reject(error)
})

var ret = {
  get: function(url, Da, sh, eh) {
    service({
      method: 'get',
      url: url,
      params: Da
    }).then(res => {
      sh(res)
    }).catch(err => {
      if (eh) eh(err)
    })
  },
  post: function(url, Da, sh, eh) {
    service({
      method: 'post',
      url: url,
      data: Da
    }).then(res => {
      sh(res)
    }).catch(err => {
      if (eh) eh(err)
    })
  },
  put: function(url, Da, sh, eh) {
    service({
      method: 'put',
      url: url,
      data: Da
    }).then(res => {
      sh(res)
    }).catch(err => {
      if (eh) eh(err)
    })
  }
}

export default ret
