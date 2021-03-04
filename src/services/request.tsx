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
  // const token = localStorage.getItem("token")
  // const headers = {
  //   'Content-Type': 'application/json;charset=UTF-8',
  //   'token': token
  // };
  // config.cancelToken = cancelTokenSource.token
  // return {...config, headers}
  return config
}, function (error: any) {
  return Promise.reject(error)
});

//响应拦截器
axios.interceptors.response.use((response: any) => {
  const {data} = response
  if (data instanceof Blob) {
    return response
  } else {
    const {msg, success , result} = data
    // console.log("发起一个请求时的response",response)
    if(!success){
      if(data.result && data.result.code && data.result.code===-1){
          message.error('登录失效，跳转登录页')
          localStorage.clear()
          sessionStorage.clear()
          window.location.href = '../login'
      }
      else{
        return response.data;
      }
    }
    return response.data;
  }
  },(error: any)=>{
    if(error.message === 'cancel'){
      return Promise.resolve({data: null, msg: '', status: 500, success: false})
    }
    message.error('网络错误，请稍后重试')
    return Promise.reject(error);
  }
);

export default request;