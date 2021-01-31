import React, {FC} from 'react'
import { Breadcrumb, Button, Dropdown, Input, Layout, Menu } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import styles from '../index.module.less';
import { Link } from 'react-router-dom';
const { Sider } = Layout;
const { Item } = Breadcrumb;
interface IProps {
  history?: any;
}

const Bread: FC<IProps> = props => {
  
  return (
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Item>Home</Item>
      <Item>List</Item>
      <Item>App</Item>
    </Breadcrumb>
  );
}

export default Bread;
