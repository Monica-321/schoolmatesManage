/**
 * api url、请求方式、数据类型定义配置项
 */
const api = '/mockApi';
// const api = '/api';
const Api:any = {
  
    //登陆注册、个人中心
    loginApi: `POST ${api}/login`,
    logoutApi: `POST ${api}/logout`,
    
    // 管理
    // projectsQuery:`GET ${api}/project`,
    // projectCreate:`POST ${api}/project/create`,
    // projectModify:`POST ${api}/project/update`,
    // projectDelete:`POST ${api}/project/delete`,


}

export default Api