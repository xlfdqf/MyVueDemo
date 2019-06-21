// 封装axios
import axios from 'axios';
import QS from 'qs';
import store from '@/store/index.js';
import { Message } from 'element-ui';  //element库的消息提示，可以不用

// 环境的切换
// if (process.env.NODE_ENV == 'development') { //开发
// 	axios.defaults.baseURL = '/api';}
// else if (process.env.NODE_ENV == 'debug') { //测试
// 	axios.defaults.baseURL = 'https://www.ceshi.com';
// }
// else if (process.env.NODE_ENV == 'production') { //线上
// 	axios.defaults.baseURL = 'https://www.production.com';
// }

// 请求超时时间
axios.defaults.timeout = 15000;

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器
axios.interceptors.request.use(
  config => {
      // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
      // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
      const token = store.state.token;
      token && (config.headers.Authorization = token);
      return config;
  },
  error => {
      return Promise.error(error);
  });
// 响应拦截器
axios.interceptors.response.use(
  response => {
      if (response.status === 200) {
          return Promise.resolve(response);
      } else {
          return Promise.reject(response);
      }
  },
  // 服务器状态码不是200的情况
  error => {
      if (error.response.status) {
          switch (error.response.status) {
              // 401: 未登录
              // 未登录则跳转登录页面，并携带当前页面的路径
              // 在登录成功后返回当前页面，这一步需要在登录页操作。
              case 401:
                  router.replace({
                      path: '/login',
                      query: { redirect: router.currentRoute.fullPath }
                  });
                  break;
              // 403 token过期
              // 登录过期对用户进行提示
              // 清除本地token和清空vuex中token对象
              // 跳转登录页面
              case 403:
              Message({
                      message: '登录过期，请重新登录',
                      duration: 1000,
                      forbidClick: true
                  });
                  // 清除token
                  localStorage.removeItem('token');
                  store.commit('loginSuccess', null);
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
              Message({
                      message: '网络请求不存在',
                      duration: 1500,
                      forbidClick: true
                  });
              break;
              // 其他错误，直接抛出错误提示
              default:
              Message({
                      message: error.response.data.message,
                      duration: 1500,
                      forbidClick: true
                  });
          }
          return Promise.reject(error.response);
      }
  }
);

 export function get(url, params){
  return new Promise((resolve, reject) =>{
      axios.get(url, {
          params: params
      })
      .then(res => {
          resolve(res.data);
      })
      .catch(err => {
        if(!err.response){
          console.log('请求错误');
          Message({
            showClose: true,
            message: '请求错误',
            type: 'error'
        });
        }else{
          reject(err.data);
          console.log(err.response, '异常2');
        }
      })
  });
}

export function post(url, params) {
  return new Promise((resolve, reject) => {
      axios.post(url, QS.stringify(params))
      .then(res => {
          resolve(res.data);
      })
      .catch(err => {
        if(!err.response){
          console.log('请求错误');
          Message({
            showClose: true,
            message: '请求错误',
            type: 'error'
        });
        }else{
          reject(err.data);
          console.log(err.response, '异常2');
        }
      })
  });
}
