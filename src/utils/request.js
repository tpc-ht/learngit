import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
const qs = require('qs');
import local from "../api/index";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 15000, // request timeout
  headers:{['Content-Type']:'application/x-www-form-urlencoded'},
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (config.data && config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
        config.data = qs.stringify(config.data);
    }
    // var token = localStorage.getItem("token");
    // if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response
    if (response.status === 200 || response.status === 1) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 20000) {
      Message({
        message: res.msg || '错误',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(res.msg || 'error')
    } else {
      return res
    }
    return res
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.msg,
      type: 'error',
      duration: 5 * 1000
    })
    // if (error.response === undefined) {
    //   return Promise.reject(error);
    // }
    // if (error.response.status) {
    //   console.log(error.response.status);
    //   switch (error.response.status) {
    //     // 401: 未登录
    //     // 未登录则跳转登录页面，并携带当前页面的路径
    //     // 在登录成功后返回当前页面，这一步需要在登录页操作。
    //     case 401:
    //       localStorage.removeItem('token');
    //       localStorage.setItem('beforeLoginUrl', router.currentRoute.fullPath);
    //       router.replace({
    //         path: '/login/login',
    //         query: { redirect: router.currentRoute.fullPath }
    //       });
    //       break;
    //     // 403 token过期
    //     // 登录过期对用户进行提示
    //     // 清除本地token和清空vuex中token对象
    //     // 跳转登录页面
    //     case 403:
    //       Message({
    //         message: '登录过期，请重新登录',
    //         duration: 1000,
    //         forbidClick: true
    //       });
    //       // 清除token
    //       localStorage.removeItem('token');
    //       store.commit('loginSuccess', null);
    //       localStorage.setItem('beforeLoginUrl', router.currentRoute.fullPath);
    //       // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
    //       setTimeout(() => {
    //         router.replace({
    //           path: '/login',
    //           query: {
    //             redirect: router.currentRoute.fullPath
    //           }
    //         });
    //       }, 1000);
    //       break;
    //     // 404请求不存在
    //     case 404:
    //       Message({
    //         message: '网络请求不存在',
    //         duration: 1500,
    //         forbidClick: true
    //       });
    //       break;
    //     // 其他错误，直接抛出错误提示
    //     default:
    //       /*router.replace({
    //           path: '/login/login',
    //           query: { redirect: router.currentRoute.fullPath }
    //       });*/
    //       Message({
    //         message: error.response.data.message,
    //         duration: 1500,
    //         forbidClick: true
    //       });
    //   }
    //   return Promise.reject(error.response);
    // }
     return Promise.reject(error)
  }
)



export default service
