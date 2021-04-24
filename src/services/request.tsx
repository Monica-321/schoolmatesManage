/**
 * 网络请求
 */
import axios from 'axios';
import { message } from 'antd';
// import { EXCLUDE_ERR_CODE, LOGIN_STATUS_ERROR, SUCCESS_CODE } from '@/utils/constant'

const request = axios;
let cancelTokenSource = axios.CancelToken.source()

//请求拦截器
axios.interceptors.request.use(async (config: any) => {
  const token = localStorage.getItem("token")
  const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    'token': token
  };
  config.cancelToken = cancelTokenSource.token  //?啥意思
  return {...config, headers}
  // return config
}, function (error: any) {
  return Promise.reject(error)
});

//响应拦截器
axios.interceptors.response.use((response: any) => {
  const {data} = response
  if (data instanceof Blob) {
    return response
  } else {
    const {msg, success , code} = data
    // console.log("发起一个请求时的response",response)
    if(!success){
      if(data.code){
        switch(data.code){
        case -1:{
            message.error('登录失效，即将跳转登录页…')
            setTimeout(()=>{
              localStorage.clear()
              sessionStorage.clear()
              window.location.href = '../'
            },2000)
          };break;
        case -2:{
            message.error('没有访问权限！')
            // setTimeout(()=>{
              window.location.href = '../404'
            // },2000)
          };break;
        default:break;
        }
        return response.data;
      }
      else{
        return response.data;
      }
    }
    return response.data;
  }
  },(error: any)=>{
    console.log(error,error.code)
    if(error.message === 'cancel'){
      return Promise.resolve({data: null, msg: '', status: 500, success: false})
    }
    message.error(`${error.name}:${error.message}`)
    // if (error.response) {
    //   switch (error.response.status) {
    //     case 401:
    //       {
    //         // console.log(error.response.status,error)
    //         message.error('登录失效，即将跳转登录页…')
    //         setTimeout(()=>{
    //           localStorage.clear()
    //           sessionStorage.clear()
    //           window.location.href = ''
    //         },2500)
    //       };
    //       break;
    //     case 403:
    //       {
    //       // console.log(error.response.status,error)
    //         message.error('没有访问权限');
    //         // 错误页面？
    //       };
    //       break;
    //   }
    // }
    return Promise.reject(error);
  }
);

export default request;