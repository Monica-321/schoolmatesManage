import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import * as store from '@/stores';
import { Provider } from "mobx-react";
import routes from './config';
class Router extends React.Component{
  render(){
    return(
      <Provider {...store}>
        <HashRouter>   
          <Switch>
            {
              routes.map((item,index)=>{
                if(item.children&&item.children.length>0){
                  return (
                    <Route key={`item${index}`} path={item.path} component={
                      ()=>{
                        return (
                          <item.component>
                            {
                              item.children.map((cItem,cIndex)=>{
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
      </Provider>
    )
  }
}
export default Router;