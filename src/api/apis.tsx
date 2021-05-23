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
    matesBatchCreation:`POST ${api}/schoolMates/matesBatchCreation`,
    
    //校友单位信息管理
    schoolCompaniesQuery:`POST ${api}/schoolCompanies/schoolCompaniesList`,
    schoolCompaniesCreate:`POST ${api}/schoolCompanies/schoolCompaniesCreate`,
    schoolCompaniesModify:`POST ${api}/schoolCompanies/schoolCompaniesUpdate`,
    schoolCompaniesDelete:`POST ${api}/schoolCompanies/schoolCompaniesDelete`,
    schoolCompaniesDetail:`GET ${api}/schoolCompanies/schoolCompaniesDetail`,
        //批量导出
        
    //活动公告管理
    schoolPostsQuery:`POST ${api}/schoolPosts/schoolPostsList`,
    schoolPostsCreate:`POST ${api}/schoolPosts/schoolPostsCreate`,
    schoolPostsModify:`POST ${api}/schoolPosts/schoolPostsUpdate`,
    schoolPostsDelete:`POST ${api}/schoolPosts/schoolPostsDelete`,
    schoolPostsDetail:`GET ${api}/schoolPosts/schoolPostsDetail`,

    //基本数据分析
    getGenderRate:`GET ${api}/dataAnalysis/getGenderRate`,
    getEducationRate:`GET ${api}/dataAnalysis/getEducationRate`,
    getMajorNum:`GET ${api}/dataAnalysis/getMajorNum`,
    getPoliticalSta:`GET ${api}/dataAnalysis/getPoliticalSta`,
    getHomePlace:`GET ${api}/dataAnalysis/getHomePlace`,
    getSrcPlace:`GET ${api}/dataAnalysis/getSrcPlace`,

    //毕业去向分析
    getGraduateOption:`GET ${api}/dataAnalysis/getGraduateOption`,
    getDstPlace:`GET ${api}/dataAnalysis/getDstPlace`,
    getCompanyIndus:`GET ${api}/dataAnalysis/getCompanyIndus`,

    getCompanyScale:`GET ${api}/dataAnalysis/getCompanyScale`,
    getCompanyRank:`GET ${api}/dataAnalysis/getCompanyRank`,
    
    //数字影像
    getMajorAndClass:`GET ${api}/schoolMates/getMajorAndClass`,
    getClassPics:`POST ${api}/graduateMedia/getClassPics`,
    addGraduateMedia:`POST ${api}/graduateMedia/graduateMediaAdd`,
    deleteGraduateMedia:`POST ${api}/graduateMedia/graduateMediaDelete`,
}

export default Api