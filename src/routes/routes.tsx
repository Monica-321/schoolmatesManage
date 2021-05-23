import Login from '@/pages/login';
import Layout from '@/components/Layout/basicLayoutSider';
import AccountManage from '@/pages/systemSetting/accountManage';
import PersonalSetting from '@/pages/systemSetting/personalSetting';

import SchoolMateInfoManage from '@/pages/infomationManage/schoolMateInfo';
import SchoolMateInfoDetail from '@/pages/infomationManage/schoolMateInfo/detail';
import SchoolCompanyManage from '@/pages/infomationManage/schoolMateCompany';
import SchoolCompanyDetail from '@/pages/infomationManage/schoolMateCompany/detail';
import SchoolPostsManage from '@/pages/infomationManage/schoolNews';

import BasicAnalysis from '@/pages/dataAnalysis/basicAnalysis'
import GraduateAnalysis from '@/pages/dataAnalysis/graduateAnalysis'

import GraduateMedia from '@/pages/mediaCenter/graduateMedia'

import Error from '@/pages/pageNotFound';

const Routes = {
  Layout:{
    Master:Layout,
  },
  // 登录模块
  Login:{
    Login,
  },
  //系统设置
  SystemSetting: {
    AccountManage,   // 账号管理
    PersonalSetting, // 个人设置
  },
  // 信息管理
  InfomationManage: {
    SchoolMateInfoManage,     // 校友信息管理
    SchoolMateInfoDetail,   // 校友信息详情
    SchoolCompanyManage,     // 校友单位信息管理
    SchoolCompanyDetail,   // 校友单位信息详情
    SchoolPostsManage,//活动公告
  },
  // 数据分析统计
  DataAnalysis: {
    BasicAnalysis, //基本信息分析统计
    GraduateAnalysis, //毕业去向分析统计
  },
  // 数字影像管理
  MediaCenter: {
    GraduateMedia, //毕业影像
  },
  Error:{
    Error
  }
};

export default Routes;