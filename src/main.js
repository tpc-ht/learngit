import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import { Message } from 'element-ui'
import 'normalize.css/normalize.css'
//import '@/styles/element-variables.scss'
import '@/styles/index.scss' // global css
import './icons' // icon
// import 'element-ui/lib/theme-default/index.css'
// import 'element-ui/lib/theme-chalk/index.css' 
import './assets/theme/theme-green/index.css'

import store from './vuex/store'
import Vuex from 'vuex'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import routes from './routes'
import VueRouter from 'vue-router'
import 'font-awesome/css/font-awesome.min.css'
import axios from 'axios'
import $axios from "./common/axios"
import VueAxios from 'vue-axios'
import md5 from 'js-md5';
import api from "./api/api";
import filterUtl from "./common/js/filter";
import util from "./common/js/util";
//定义多个过滤器
Vue.prototype.$filterUtl = filterUtl;
Vue.prototype.$util = util;

Vue.prototype.$api = api;

import local from "./api/index";

Vue.prototype.$local = local;
Vue.prototype.$axios = $axios;
Vue.prototype.$md5 = md5;

Vue.use(VueAxios, axios)
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

//NProgress.configure({ showSpinner: false });

const router = new VueRouter({
	mode: 'history',
	routes
})
router.beforeEach((to, from, next) => {
  // NProgress.start();
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

let vue = new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')


