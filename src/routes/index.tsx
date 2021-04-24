import React from 'react';
import {BrowserRouter, HashRouter,Redirect, Route, Switch} from 'react-router-dom';
import { Provider } from "mobx-react";
import RootStore from "@/stores";
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
// import alldata from '@/components/Layout/SiderBar/menuData'
import routes from './config';
class Router extends React.Component{
  getInfo(){
    const {userStore} = RootStore;
    const {
      authority,
      userName
    } = userStore;
    const newAuthority = authority.length>0?authority:JSON.parse(localStorage.getItem('Authority')||'[]');
    const newUserName = userName!==''?userName:localStorage.getItem('userName')||'';
    return {
      authority:newAuthority,
      userName:newUserName
    };
  }
  render(){
    let store: any = RootStore;
    // const data = JSON.parse(localStorage.getItem('Authority')||'[]') //菜单
    return(
      <Provider {...store}>
        <ConfigProvider locale={zhCN}>
          <BrowserRouter>   
            <Switch>
              {
                routes.map((item:any,index:number)=>{
                  if(item.children&&item.children.length>0){
                    return (
                      <Route key={`item${index}`} path={item.path} component={
                        (router:any)=>{
                          return (
                            <item.component router={router} defaultCollapsed={item.collapsed?item.collapsed:false} getInfo={this.getInfo}>
                              {
                                item.children.map((cItem:any,cIndex:number)=>{
                                  return (
                                    <Route key={`cItem${cIndex}`} exact path={`${item.path}${cItem.path}`} component={cItem.component} />
                                  )
                                })
                              }
                            </item.component>
                          )
                        }                   
                      }/>
                    )          
                  }else{
                    return (
                      <Route key={`item${index}`} exact path={item.path} component={item.component} />               
                    )
                  }
                })
              }
              <Redirect from="*" to="/404"></Redirect> 
            </Switch>
          </BrowserRouter>
        </ConfigProvider>
      </Provider>
    )
  }
}
export default Router;