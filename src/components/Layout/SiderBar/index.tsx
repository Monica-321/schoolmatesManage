import React, {Component, FC} from 'react'
import { Button, Dropdown, Input, Layout, Menu } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import styles from '../index.module.less';
import { Link } from 'react-router-dom';
import { render } from 'react-dom';
const { Sider } = Layout;
const { SubMenu , Item } = Menu;
interface IProps {
  keys?:any[]
}

// const SiderBar: FC<IProps> = props => {
class SiderBar extends Component<IProps>{

  constructor(props:IProps){
    super(props)
 
  }
  appMenu=JSON.parse(sessionStorage.getItem("appMenu")||'[]')
    // const {pathname} = props.router.location;
    // let selectKey=appMenu.children[0].key //应该根据路由判断选中的key
    // props.keys.map((item)=>{
    //   console.log(item.props.path)
    // })

    state={
      selectKey:this.appMenu.children[0].key || '',
    }
    
  
  render(){
  return (
    <Sider width={200} className="site-layout-background">
        <Menu 
          mode="inline" 
          defaultSelectedKeys={[this.state.selectKey]} 
          style={{ height: '100%', borderRight: 0 , paddingTop:'30%'}}
          onSelect={(e)=>{
            this.setState({selectKey:e.key})
          }}
        >
          {/* 有子菜单的话再重写下 */}
          {
              this.appMenu.children.map((item:any)=>{
                return <Item key={item.key} >
                    <Link to={item.path}>{item.title}</Link>
                    </Item>
              })
          }
        </Menu>
    </Sider>
  );
}
}

export default SiderBar;
