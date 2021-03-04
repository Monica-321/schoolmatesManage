import React, {Component, FC} from 'react'
import { Button, Dropdown, Input, Layout, Menu } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import styles from '../index.module.less';
import { Link } from 'react-router-dom';
import IconMap from '@/utils/icon';
const { Sider } = Layout;
const { SubMenu , Item } = Menu;

interface IProps {
  data:[any];
  router:any;
}
interface AuthRoute{
  url?: any
  name?: string
  children?: AuthRoute[]
}class SiderBar extends Component<IProps>{
  state={
    openKey:0,
    selectedKey:0
  }
  //格式化nav数据
  genNavData(authRoute: AuthRoute[]){
    let temp = authRoute.map(item=>{
      let node:any = {}
      node.title = item.name||''
      node.path = item.url||null
      if(item.children&&item.children.length) {
        node.children = this.genNavData(item.children)
      }
      return node
    })
    return temp
  }
  findKey = ()=>{
    const {
      data,
      router
    } = this.props;
    const {pathname} = router.location;
    let keys:any = false;
    const navData = this.genNavData(data);
    navData.forEach((item,i)=>{
      // console.log(item.path,pathname)
      if(item.path&&item.path === pathname){
        localStorage.setItem('localPos',JSON.stringify([item.title]))
        return keys = {
          openKey:[`${i.toString()}`],
          selectedKey:['0']
        }
      }else{
        item.children&&item.children.length>0&&item.children.forEach((cItem:any,cI:number)=>{
          if(pathname.indexOf(cItem.path)>-1){
            // console.log("in")
            localStorage.setItem('localPos',JSON.stringify([item.title, cItem.title]))
            return keys = {
              openKey:[`${i.toString()}`],
              selectedKey:[`${i}-${cI}`]
            }
          }
        });
      }
    });
    return keys;
  };

  render(){  
    const {  data } = this.props;
    const navData = this.genNavData(data);
    const keys = this.findKey();
    return (
    <Sider id="sideBar" trigger={null} collapsible 
    // collapsed={collapsed} 
    width={250}>
        <Menu
          mode="inline"
          theme="dark"
          defaultOpenKeys={keys.openKey}
          defaultSelectedKeys={keys.selectedKey}
          style={{ height: '100%', borderRight: 0 , paddingTop:'15%'}}
        > 
          {
            navData.map((item:any,index:number)=>{
              //无二级导航
              if(item.path){
                return(
                  <Item key={`${index.toString()}`} 
                    title={item.title}
                    icon={
                      <span id={IconMap[item.title]}>
                        <i></i>
                      </span>
                    }
                  >
                   <Link to={item.path}>{item.title}</Link>
                  </Item>
                )
              }else{
                return(
                  <SubMenu
                    key={`${index.toString()}`}
                    title={
                      <span id={IconMap[item.title]}>
                        <i></i>
                        <span className='txt'>{item.title}</span>
                      </span>
                    }
                  >
                    {item.children.map((cItem:any,cIndex:number)=>{
                      return(
                        <Item key={`${index}-${cIndex}`}>
                          <Link to={cItem.path}>{cItem.title}</Link>
                        </Item>
                      )    
                    })}
                  </SubMenu>
                )            
              }
            })
          }
        </Menu>
      </Sider>
    );
}
}

export default SiderBar;
