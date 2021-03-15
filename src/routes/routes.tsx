import Login from '@/pages/login';
// import Register from '@/pages/register';
// import findPwdStep1 from '@/pages/login/findPwd/step1';
// import findPwdStep2 from '@/pages/login/findPwd/step2';
// import findPwdStep3 from '@/pages/login/findPwd/step3';
import Layout from '@/components/Layout/basicLayoutSider';

import IndexPage from '@/pages/dashboard'

import SchoolMateInfoManage from '@/pages/infomationManage/schoolMateInfo';
import SchoolMateInfoDetail from '@/pages/infomationManage/schoolMateInfo/detail';
import SchoolCompanyManage from '@/pages/infomationManage/schoolMateCompany';
import SchoolCompanyDetail from '@/pages/infomationManage/schoolMateCompany/detail';

import BasicAnalysis from '@/pages/dataAnalysis/basicAnalysis'
import GraduateAnalysis from '@/pages/dataAnalysis/graduateAnalysis'
// import DonateAnalysis from '@/pages/dataAnalysis/donateAnalysis'
import CompanyAnalysis from '@/pages/dataAnalysis/companyAnalysis'

import GraduateMedia from '@/pages/mediaCenter/graduateMedia'
import OtherMedia from '@/pages/mediaCenter/otherMedia'

// import RoleManage from '@/pages/systemSetting/roleManage';
import AccountLog from '@/pages/log/accountLog';
import Error from '@/pages/pageNotFound';


const Routes = {
  Layout:{
    Master:Layout,
  },
  // 登录模块
  Login:{
    Login,
    // findPwdStep1,
    // findPwdStep2,
    // findPwdStep3,
	// Register,
  },
  //首页？
  DashBoard:{
	IndexPage,

  },
  // 系统设置？？分超级管理员、普通管理员？
  // SystemSetting: {
    // RoleManage,      // 角色管理？
    // AccountManage,   // 账号管理
    // PersonalSetting, // 个人设置
    // SystemConfig     // 系统配置？
  // },
  // 信息管理
  InfomationManage: {
    SchoolMateInfoManage,     // 校友信息管理
    SchoolMateInfoDetail,   // 校友信息详情
	  // 校友单位信息管理 及详情？
    SchoolCompanyManage,     // 校友单位信息管理
    SchoolCompanyDetail,   // 校友单位信息详情
  },
  // 操作日志？超级
  Log: {
    AccountLog,       // 账号日志
  },
  // 数据分析统计
  DataAnalysis: {
    BasicAnalysis, //基本信息分析统计
    GraduateAnalysis, //毕业去向分析统计
    // DonateAnalysis, //校友捐赠分析统计
    CompanyAnalysis,  //校友企业分析
  },
  // 数字影像管理
  MediaCenter: {
    GraduateMedia, //毕业影像
	  OtherMedia, //其他影像
  },
  //其他校友服务？？
  Error:{
    Error
  }
};

export default Routes;