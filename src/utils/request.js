import axios from 'axios'
import {  Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
// import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据，后面会提到
// 创建一个axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url =基本url +请求url
  timeout: 5000, // 请求超时时间
  // headers :{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},
})

// request interceptor
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么

    if (store.getters.token) {
      // 让每个请求携带令牌
      // ['Authorization']是一个自定义头信息键
      // 请根据实际情况修改一下
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    // 处理请求错误
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(

  /**
  *通过自定义代码确定请求状态这里只是一个例子
  *你也可以通过HTTP状态码来判断状态
  **/
  response => {
    // 如果自定义代码不是200，则判断为错误。
    if (response.data.code !== 200) {
      Message({
        message: response.data.message || 'Error',
        type: 'error',
        duration:  2000
      })

      // 403:需要登录或者重新登录;
      if (response.data.code === 403) {
        // to re-login
        // MessageBox.confirm('您已经登出，您可以取消以停留在此页面，或再次登录', '确认注销', {
        //   confirmButtonText: 'Re-Login',
        //   cancelButtonText: 'Cancel',
        //   type: 'warning'
        // }).then(() => {
          //去除token
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
            // location.reload();
          // })
      }
      //抛出错误
      return Promise.reject(new Error (response.data.message || 'Error'));
    } else {
      //等于200都算成功
      return response
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
