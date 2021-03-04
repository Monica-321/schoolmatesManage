/**
 * 根据api url动态生成request方法
 */
import request from '@/services/request';
import api from './apis';
// const applyApi = "/api/mock";
const applyApi = "";
const gen = (params:any) => {
  let url = applyApi + params;
  let method:any = 'GET';
  const paramsArray = params.split(' ')
  if (paramsArray.length === 2) {
    method = paramsArray[0]
    url = applyApi + paramsArray[1]
  } 
  return function(data: any) {
    if(data && data.responseType==="blob"){ //导出excel表格
      const responseType = "blob";
      delete data.responseType;
      return request(url,{
        [method==='GET'?'params':'data']:data,
        method,
        responseType
      })
    }else{
      return request(url,{
        [method==='GET'?'params':'data']:data,
        method,
      })  
    } 
  }
}  
const APIFunction:any = {}
for (const key in api) {
  APIFunction[key] = gen(api[key])
} 
export default APIFunction;