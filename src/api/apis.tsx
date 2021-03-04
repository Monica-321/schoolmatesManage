/**
 * api url、请求方式、数据类型定义配置项
 */
const api = '/apiServer';
const Api:any = {
  
    //登陆注册、个人中心
    loginApi: `POST ${api}/login`, 
    logoutApi: `GET ${api}/logout`, 
    registerApi: `POST ${api}/register`, 
    modifyInfoApi:`POST ${api}/user/update`,
    
    //项目管理
    projectsQuery:`GET ${api}/project`,
    projectCreate:`POST ${api}/project/create`,
    projectModify:`POST ${api}/project/update`,
    projectDelete:`POST ${api}/project/delete`,

    modulesQuery: `GET ${api}/module`,
    modulecreate: `POST ${api}/module/create`,
    moduleupdate: `POST ${api}/module/update`,
    moduledelete: `POST ${api}/module/delete`,
    moduleList: `GET ${api}/module/list`,
    /* api管理 */
    apiList:`${api}/api`, // api列表
    apiCreate:`POST ${api}/api/create`, // 创建api
    apiUpdate:`POST ${api}/api/update`, // 修改api
    apiDelete:`POST ${api}/api/delete`, // 删除api
    projectSelect:`${api}/project/list`, // 项⽬下拉列表查询
    moduleSelect:`${api}/module/list`, // 模块下拉列表查询

}

export default Api