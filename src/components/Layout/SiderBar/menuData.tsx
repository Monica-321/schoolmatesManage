const menuData = [
  {
    name:'首页',
    url:'/dashboard/index',
  },
  {
    name:'信息管理',
    url:null,
    children:[
      {
        name:"校友信息管理",
        url:"/infoManage/schoolMateInfoManage",
      },
      {
        name:"校友单位信息管理",
        url:"/infoManage/schoolCompanyManage",
      },
    ]
  },
  {
    name:'操作日志',
    url:null,
    children:[
      {
        name:"帐号日志",
        url:"/log/accountLog",
      }
    ]
  },
  {
    name:'数据分析统计',
    url:null,
    children:[
      {
        name:"基本数据分析",
        url:"/dataAnalysis/basicAnalysis",
      },
      {
        name:"毕业去向分析",
        url:"/dataAnalysis/graduateAnalysis",
      },
      {
        name:"校友捐赠分析",
        url:"/dataAnalysis/donateAnalysis",
      },
    ]
  },
  {
    name:'数字影像管理',
    url:null,
    children:[
      {
        name:"毕业影像",
        url:"/mediaCenter/graduateMedia",
      },
      {
        name:"其他影像",
        url:"/mediaCenter/otherMedia",
      },
    ]
  },
];
export default menuData;