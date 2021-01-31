import React, {FC} from 'react'
import { Button, Dropdown, Input, Layout, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from '../index.module.less';
import { Link } from 'react-router-dom';
const { Header } = Layout;
interface IProps {
  history?: any;
}

const TopBar: FC<IProps> = props => {
  const username=sessionStorage.getItem("username") || ""
  const menu = (
    <Menu>
      <Menu.Item className={styles.dropdownItem}>
       <Link to='../dashboard/modifyinfo' >
          个人信息修改
          </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to='../login' style={{color:'red'}}>
          登出
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className={styles.header} id="topBar">
        <div className={styles.logo}>接口管理平台</div>
        {/* <Input.Search />  */}
        <div className={styles.user}>
          <Dropdown overlay={menu}>
              <span style={{color:'white',cursor:'pointer'}}>
                  {username} <DownOutlined />
              </span>
          </Dropdown>
        </div>
    </Header>
  );
}

export default TopBar;
