import Routes from './routes';

const {
  Login,
  // Register,
  Layout,
  DashBoard,
  SystemSetting,
  InfomationManage,
  // Log,
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
  //注册
  // {
  //   path:"/register",
  //   component:Register.Register,
  // },
  //首页
  {
    path:"/dashboard",
    component:Layout.Master,
    collapsed:true,
    children: [
      {
        path: '/index',
        component: DashBoard.IndexPage,
      },
    ],
    
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
    ]
  },
  // // 操作日志
  // {
  //   path: '/log',
  //   component: Layout.Master,
  //   children: [
  //     {
  //       path: '/accountLog',
  //       component: Log.AccountLog,
  //     },
  //   ],
  // },
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
    {
      path:'/companyAnalysis',
      component:DataAnalysis.CompanyAnalysis,
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
    // {
    //   path:'/otherMedia',
    //   component:MediaCenter.OtherMedia,
    // },
  ]
},
  //404
  {
    path:"/404",
    component:Error.Error,
  },

];

export default routes;