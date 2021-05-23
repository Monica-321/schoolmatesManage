import Routes from './routes';

const {
  Login,
  Layout,
  SystemSetting,
  InfomationManage,
  DataAnalysis,
  MediaCenter,
  Error,
} = Routes;

const routes = [
  //初始页
  {
    path: '/',
    redirect: '/login',
    component: Login.Login,
  },
  //登录
  {
    path:"/login",
    component:Login.Login,
  },
  //InfomationManage
  {
    path:"/infoManage",
    component:Layout.Master,
    children:[
      {
        path:'/schoolMateInfoManage',
        component:InfomationManage.SchoolMateInfoManage,
      },
      {
        path:'/schoolMateInfoDetail',
        component:InfomationManage.SchoolMateInfoDetail,
      },
      {
        path:'/schoolCompanyManage',
        component:InfomationManage.SchoolCompanyManage,
      },
      {
        path:'/schoolCompanyDetail',
        component:InfomationManage.SchoolCompanyDetail,
      },
      {
        path:'/schoolPostsManage',
        component:InfomationManage.SchoolPostsManage,
      },
    ]
  },
  //DataAnalysis
  {
    path:"/dataAnalysis",
    component:Layout.Master,
    children:[
      {
        path:'/basicAnalysis',
        component:DataAnalysis.BasicAnalysis,
      },
      {
        path:'/graduateAnalysis',
        component:DataAnalysis.GraduateAnalysis,
      },
    ]
  },
  //MediaCenter
  {
    path:"/mediaCenter",
    component:Layout.Master,
    children:[
      {
        path:'/graduateMedia',
        component:MediaCenter.GraduateMedia,
      },
    ]
  },
  {
    path:"/systemSettings",
    component:Layout.Master,
    children:[
      {
        path:'/accountManage',
        component:SystemSetting.AccountManage,
      },
      {
        path:'/personalSetting',
        component:SystemSetting.PersonalSetting,
      },
    ]
  },
  //404
  {
    path:"/404",
    component:Error.Error,
  },
];

export default routes;