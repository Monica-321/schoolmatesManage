/**
 * api url、请求方式、数据类型定义配置项
 */
// const api = '/mockApi';
const api = '/api';
const Api:any = {
  
    //登陆登出
    loginApi: `POST ${api}/users/login`,
    logoutApi: `POST ${api}/users/logout`,
    
    //校友信息管理
    schoolMatesQuery:`POST ${api}/schoolMates/schoolMatesList`,
    schoolMatesCreate:`POST ${api}/schoolMates/schoolMatesCreate`,
    schoolMatesModify:`POST ${api}/schoolMates/schoolMatesUpdate`,
    schoolMatesDelete:`POST ${api}/schoolMates/schoolMatesDelete`,
    schoolMatesDetail:`GET ${api}/schoolMates/schoolMatesDetail`,
        //批量导入、导出
    
    //校友单位信息管理
    schoolCompaniesQuery:`POST ${api}/schoolCompanies/schoolCompaniesList`,
    schoolCompaniesCreate:`POST ${api}/schoolCompanies/schoolCompaniesCreate`,
    schoolCompaniesModify:`POST ${api}/schoolCompanies/schoolCompaniesUpdate`,
    schoolCompaniesDelete:`POST ${api}/schoolCompanies/schoolCompaniesDelete`,
    schoolCompaniesDetail:`GET ${api}/schoolCompanies/schoolCompaniesDetail`,
        //批量导出

    //基本数据分析
    //毕业去向分析
    //……

}

export default Api