import React, {FC,useState} from 'react';
import { Layout, Menu, Breadcrumb ,ConfigProvider } from 'antd';
import {Redirect} from 'react-router-dom';
import TopBar from './TopBar';
import SiderBar from './SiderBar';
// import Bread from './Bread'
import MenuData from '@/components/Layout/SiderBar/menuData'
import styles from './index.module.less'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

interface IProps {
  children: any;
  router?:any;
  // data:[any];
  getInfo():{
    authority:[any],
    userName:string
  };
  defaultCollapsed:boolean;
}
  const BasicLayoutSider: FC<IProps> = props => {
    const {router,defaultCollapsed} = props;
    const [collapsed, setCollapsed] = useState(defaultCollapsed);
    const siderBarProps = {
      collapsed,
      // data,
      data:props.getInfo().authority,
      router,
    }
    return(
      <Layout>
        <TopBar  // {...topBarProps}
        ></TopBar>
      <Layout>
        {/* {keys?null:<Redirect to="/404" />} */}
        <SiderBar {...siderBarProps} />
        <Layout style={{ padding: '0 24px 24px' }}>
        <ConfigProvider input={{autoComplete: 'off'}}>
            <Content className={styles.content} >
              {props.children}
            </Content>
          </ConfigProvider>
        </Layout>
      </Layout>
    </Layout>
    )
  }

export default BasicLayoutSider;