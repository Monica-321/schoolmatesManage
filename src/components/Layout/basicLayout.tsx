import {Component} from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import TopBar from './TopBar';
import Bread from './Bread';
import styles from './index.module.less'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class BasicLayout extends Component{
  render(){
    return(
      <Layout>
        <TopBar ></TopBar>
        <Layout style={{ padding: '24px' }}>
          {/* <Bread></Bread> */}
          <Content className={styles.content}>
              {this.props.children}
          </Content>
        </Layout>
    </Layout>
    )
  }
};

export default BasicLayout;