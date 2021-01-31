import Routes from './routes';

const {
  Login,
  Register,
  Layout,
  Dashboard,
  PageNotFound,
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
  {
    path:"/register",
    component:Register.Register,
  },
  //工作台
  {
    path:"/dashboard",
    component:Layout.Basic,
    children:[
      //工作台首页
      {
        path:'/index',
        component:Dashboard.Dashboard,
      },
      //个人信息修改
      {
        path:'/modifyinfo',
        component:Dashboard.ModifyInfo,
      },
    ]
  },
  //mockapi服务
  {
    path:"/mockapiservice",
    component:Layout.Master,
    children:[
      //项目管理-列表页
      {
        path:'/projectsmanage',
        component:Dashboard.MockApiService.ProjectsManage,
      },
      //项目管理-创建/修改项目页
      // {
      //   path:'/projectsmanage/addproject',
      //   component:Dashboard.MockApiService.ProjectsAdd,
      // },

      //模块管理-列表页
      {
        path:'/modulesmanage',
        component:Dashboard.MockApiService.ModulesManage,
      },

      //api管理-列表页
      {
        path:'/apismanage',
        component:Dashboard.MockApiService.ApisManage,
      },

    ]
  },
  //other服务-菜单路由辅助测试
  {
    path:"/other",
    component:Layout.Master,
    children:[
      //项目管理-列表页
      {
        path:'/item1',
        component:Dashboard.OtherService.Item1,
      },
    ]
  },
  //404
  {
    path:"/404",
    component:PageNotFound.PageNotFound,
  },

];

export default routes;