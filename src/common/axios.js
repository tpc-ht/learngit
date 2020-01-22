import Vue from "vue";
import axios from "axios";
import router from "vue-router";
const qs = require('qs');
import local from "../api/index";



//$cookies.set('token','4c208dc8-421f-430f-af91-2f846b093c57');//lc陈绍


  //$cookies.set('token', '3c9e2106-279e-4ffa-8e1a-b079cbae1b1b'); //lc测试服


//localStorage.setItem('token','3c9e2106-279e-4ffa-8e1a-b079cbae1b1b');

//$cookies.set('token', 'a57a3632-d02e-4c3e-9617-1f563f1b441f');

axios.defaults.baseURL = local.http;
// axios.defaults.timeout = 9000;
//设置默认请求头
// axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.headers = {
    "Content-Type": "application/x-www-form-urlencoded",
}

axios.interceptors.request.use(
    config => {
        if (config.data && config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
            //config.data = qs.stringify(config.data);
        }
        var token = sessionStorage.getItem('token');
        if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });


//拦截返回数据
// Add a response interceptor
axios.interceptors.response.use(
    response => {
        if (response.status === 200 || response.status === 1) {
            return Promise.resolve(response);  //return Promise.resolve(response.data);
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是200的情况
    error => {
        if (error.response === undefined) {
            return Promise.reject(error);
        }
        if (error.response.status) {
            console.log(error.response.status);
            switch (error.response.status) {
                // 401: 未登录
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。
                case 401:
                     localStorage.removeItem('token');
                    localStorage.setItem('beforeLoginUrl', router.currentRoute.fullPath);
                    router.replace({
                        path: '/login/login',
                        query: { redirect: router.currentRoute.fullPath }
                    });
                    break;
                    // 403 token过期
                    // 登录过期对用户进行提示
                    // 清除本地token和清空vuex中token对象
                    // 跳转登录页面
                case 403:
                    Toast({
                        message: '登录过期，请重新登录',
                        duration: 1000,
                        forbidClick: true
                    });
                    // 清除token
                    localStorage.removeItem('token');
                    store.commit('loginSuccess', null);
                    localStorage.setItem('beforeLoginUrl', router.currentRoute.fullPath);
                    // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                    setTimeout(() => {
                        router.replace({
                            path: '/login',
                            query: {
                                redirect: router.currentRoute.fullPath
                            }
                        });
                    }, 1000);
                    break;
                    // 404请求不存在
                case 404:
                    Toast({
                        message: '网络请求不存在',
                        duration: 1500,
                        forbidClick: true
                    });
                    break;
                    // 其他错误，直接抛出错误提示
                default:
                    /*router.replace({
                        path: '/login/login',
                        query: { redirect: router.currentRoute.fullPath }
                    });*/
                    Toast({
                        message: error.response.data.message,
                        duration: 1500,
                        forbidClick: true
                    });
            }
            return Promise.reject(error.response);
        }
    }
);


/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export const get = (url, ...params) => {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                    params: params
                })
                .then(res => {
                    resolve(res.data);
                })
                .catch(err => {
                    reject(err.data)
                })
        });
    }
    /**
     * post方法，对应post请求
     * @param {String} url [请求的url地址]
     * @param {Object} params [请求时携带的参数]
     */
export const post = (url, ...params) => {
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(...params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
};




export default axios;
