import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import { Provider } from "mobx-react";
import RootStore from "@/stores";
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import data from '@/components/Layout/SiderBar/menuData'
import routes from './config';
class Router extends React.Component{
  render(){
    let store: any = RootStore;
    // const data = JSON.parse(localStorage.getItem('Authority')||'[]') //菜单吧
    return(
      <Provider {...store}>
        <ConfigProvider locale={zhCN}>
          <HashRouter>   
            <Switch>
              {
                routes.map((item:any,index:number)=>{
                  if(item.children&&item.children.length>0){
                    return (
                      <Route key={`item${index}`} path={item.path} component={
                        (router:any)=>{
                          return (
                            <item.component router={router} defaultCollapsed={item.collapsed?item.collapsed:false} data={data}>
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
            </Switch>
          </HashRouter>
        </ConfigProvider>
      </Provider>
    )
  }
}
export default Router;