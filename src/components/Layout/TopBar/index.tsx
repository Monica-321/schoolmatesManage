import React, {FC} from 'react'
import { Button, Dropdown, Input, Layout, Menu , message} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from '../index.module.less';
import topbarImg from "@/assets/topbarImg.png";
import { useHistory } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
const { Header } = Layout;
interface IProps {
  userStore?: any;
  history?: any;
}

const TopBar: FC<IProps> = props => {
  const {userStore:{userName,handelLogout}}=props
  // const userInfo=JSON.parse(localStorage.getItem("userInfo")|| "") 
  // const userName=JSON.parse(localStorage.getItem("userName")|| "") 
  const history = useHistory();
  async function logout(){
    const response=await handelLogout()
    if(response.success){
      message.success(response.msg)
      setTimeout(()=>{
        localStorage.clear()
        sessionStorage.clear()
        history.push('../')
      },1200)
    }else{
      message.error(response.msg)
    }
  }
  const menu = (
    <Menu>
      {/* <Menu.Item className={styles.dropdownItem}>
        <Button type="link" style={{color:'#474747'}} onClick={()=>{history.push('../dashboard/modifyinfo')}} >个人信息修改</Button>
      </Menu.Item> */}
      <Menu.Item>
        <Button type="link" style={{color:'red'}} onClick={logout} >登出</Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className={styles.header} id="topBar">
        <div className={styles.logo}>
          <img src={topbarImg} height="70%" alt="校友信息管理平台"></img>
        </div>
        {/* <Input.Search />  */}
        <div className={styles.user}>
          <Dropdown overlay={menu} placement="bottomCenter">
              <Button type="link" style={{fontSize:'16px',fontWeight:600}}>
                  {userName} <DownOutlined />
              </Button>
          </Dropdown>
        </div>
    </Header>
  );
}

export default inject('userStore')(observer(TopBar));
