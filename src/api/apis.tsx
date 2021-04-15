/**
 * api url、请求方式、数据类型定义配置项
 */
// const api = '/mockApi';
const api = '/api';
const Api:any = {
  
    //登陆登出
    loginApi: `POST ${api}/schoolAdmins/login`,
    logoutApi: `POST ${api}/schoolAdmins/logout`,

    //管理员账户管理
    adminsQuery:`POST ${api}/schoolAdmins/adminsList`,
    adminsCreate:`POST ${api}/schoolAdmins/adminsCreate`,
    adminsModify:`POST ${api}/schoolAdmins/adminsUpdate`,
    adminsDelete:`POST ${api}/schoolAdmins/adminsDelete`,
    toOnOrOff:`GET ${api}/schoolAdmins/adminsToOnOrOff`,
    //个人设置
    getUserInfo:`POST ${api}/schoolAdmins/getUserInfo`,
    modifyUserInfo:`POST ${api}/schoolAdmins/modifyUserInfo`,
    modifyUserPwd:`POST ${api}/schoolAdmins/modifyUserPwd`,
    
    //校友信息管理
    schoolMatesQuery:`POST ${api}/schoolMates/schoolMatesList`,
    schoolMatesIdCheck:`GET ${api}/schoolMates/schoolMatesIdCheck`,
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
    getGenderRate:`GET ${api}/dataAnalysis/getGenderRate`,
    getEducationRate:`GET ${api}/dataAnalysis/getEducationRate`,
    getMajorNum:`GET ${api}/dataAnalysis/getMajorNum`,
    getPoliticalSta:`GET ${api}/dataAnalysis/getPoliticalSta`,
    //毕业去向分析
    getGraduateOption:`GET ${api}/dataAnalysis/getGraduateOption`,

    getCompanyIndus:`GET ${api}/dataAnalysis/getCompanyIndus`,

    getCompanyScale:`GET ${api}/dataAnalysis/getCompanyScale`,
    getCompanyRank:`GET ${api}/dataAnalysis/getCompanyRank`,
    
    //……

}

export default Api