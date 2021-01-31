import BasicLayoutSider from '@/components/Layout/basicLayoutSider'
import BasicLayout from '@/components/Layout/basicLayout'
import Login from '@/pages/login/index';
import Register from '@/pages/register/index';
import Dashboard from '@/pages/dashboard/index';
import ModifyInfo from '@/pages/dashboard/modifyInfo/index'
import ProjectsManage from '@/pages/mockApiService/projectsManage/index'
import ModulesManage from '@/pages/mockApiService/modulesManage/index'
import ApisManage from '@/pages/mockApiService/apisManage/index'
import PageNotFound from '@/pages/pageNotFound'

//菜单路由辅助测试
import Item1 from '@/pages/otherService/item1/index'

const Routes = {
  //按模块组织
  Layout:{
    Basic:BasicLayout,
    Master:BasicLayoutSider,
  },

  Login:{
    Login,
  },
  Register:{
    Register,
  },
  Dashboard:{
    Dashboard,  //首页
    ModifyInfo, //个人信息修改
    MockApiService:{  //mockapi服务
      ProjectsManage, //项目管理
      ModulesManage, //模块管理
      ApisManage, //api管理
      
    },

    OtherService:{  
      Item1, 
    },

  },
  PageNotFound:{
    PageNotFound,
  }
};

export default Routes;