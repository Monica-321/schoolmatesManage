import {Component} from 'react';
import { Layout, Menu, Breadcrumb ,ConfigProvider } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import TopBar from './TopBar';
import SiderBar from './SiderBar';
import Bread from './Bread'
import styles from './index.module.less'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

// interface IProps {
//   children?: any;
//   router?:any;
// }
class BasicLayoutSider extends Component{
  constructor(props:any){
    super(props);
    console.log(props)
  }
  render(){
    return(
      <Layout>
        <TopBar ></TopBar>
      <Layout>
        <SiderBar 
        // keys={this.props.children}
        ></SiderBar>
        <Layout style={{ padding: '0 24px 24px' }}>
          {/* <Bread></Bread> */}
            <Content className={styles.content} >
              {this.props.children}
            </Content>
        </Layout>
      </Layout>
    </Layout>
    )
  }
};

export default BasicLayoutSider;