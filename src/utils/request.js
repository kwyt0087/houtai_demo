// 1.0 引入 axios ，并声明相关的配置
import axios from 'axios'
import qs from 'qs'
import local from '@/utils/local.js'
import { Message } from 'element-ui'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 1.1 axios的配置项
axios.defaults.baseURL = 'http://127.0.0.1:5000'

// 1.2 请求的拦截器
axios.interceptors.request.use(config => {
  NProgress.start()
  const token = local.get('token')
  // 除了登录之外的请求，都必须携带 token
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

// 1.3 响应的拦截器
axios.interceptors.response.use(res => {
  NProgress.done()
  // 既然所有的响应都会先走这里，那么关于成功和失败的提示，直接处理得了
  const { code, msg } = res.data
  if (code || msg) {
    // 成功的判断
    if (code === 0 || code === '00') {
      console.log('asdass', 111)
      Message.success(msg)
    } else {
      // 失败的判断
      Message.error(msg)
    }
  }

  return res
})

// 2.0 导出请求的方法
export default {
  get(url, params) {
    // 发起get请求，接收参数并携带，返回的时候提取 res.data
    return new Promise((resolve, reject) => {
      axios
        .get(url, { params })
        .then(res => {
          // .then 代表成功
          resolve(res.data)
        })
        .catch(err => {
          // .catch 代表发送请求失败, 可以统一的做一些错误的处理
          reject(err)
        })
    })
  },
  post(url, query) {
    // 发起post请求，接收参数（请求体要求k=v&k=v）并携带，返回的时候提取 res.data
    return new Promise((resolve, reject) => {
      axios
        .post(url, qs.stringify(query))
        .then(res => {
          // .then 代表成功
          resolve(res.data)
        })
        .catch(err => {
          // .catch 代表发送请求失败, 可以统一的做一些错误的处理
          reject(err)
        })
    })
  }
}
