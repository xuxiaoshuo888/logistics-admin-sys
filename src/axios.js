// import Vue from "vue";
import axios from 'axios';
// import router from "./router";
// import store from './store';
import querystring from 'querystring'

//创建实例 axios.create([config])
const instance = axios.create({
    // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
    baseURL: process.env.NODE_ENV === 'production' ? '' : '/proxy',
    // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
    timeout: 50000,
    // `headers` 是即将被发送的自定义请求头
    transformRequest: [function (data) {
        // 将数据转换为表单数据
        let ret = ''
        for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
    }],
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    // `withCredentials` 表示跨域请求时是否需要使用凭证
    // withCredentials: true,
});
let loading;
//请求拦截器
// instance.interceptors.request.use(
//     config => {
//         // 判断是否存在token，如果存在将每个页面header都添加token
//         // if(store.getters.token!==''){
//         //   config.headers.Authorization= "Bearer "+store.getters.token;
//         // }
//         return config;
//     },
//     error => {
//         //对错误请求做些什么
//         loading = Vue.prototype.$loading({text: "", background: 'rgba(0, 0, 0, 0.3)'});
//         Vue.prototype.$message.info('加载超时');
//         return Promise.reject(error);
//     });
//响应拦截器（返回状态判断）
// instance.interceptors.response.use(
//     res => {
//       loading.close();
//       if(res.data.ret!==0){//非正常
//         // switch (res.data.ret) {
//         //   case '500':Vue.prototype.$message.error(res.data.errmsg);break;
//         //   case '-1':router.push('/error');break;
//         //   default :Vue.prototype.$message.error(res.data.errmsg);
//         // }
//       }
//       else{
//         return res;
//       }
//     },
//     err => {
//       loading.close();
//       if (err.response) {
//         switch (err.response.status) {
//           case 403:
//             router.replace({
//               path: '/loading',
//               //query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
//             });break;
//           case 400:
//             Vue.prototype.$message.error(err.response);
//             router.push('/error')
//         }
//       }
//       return Promise.reject(err)
//     });
export default instance;

