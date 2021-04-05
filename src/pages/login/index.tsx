import {Component} from 'react';
import { Link } from 'react-router-dom';
import { Input, Button , Form, message , Cascader } from 'antd';
import { UserOutlined , LockOutlined } from '@ant-design/icons';
import menuData from '@/components/Layout/SiderBar/menuData'
import { observer, inject } from 'mobx-react'
import { UserStore } from '@/stores/userRelated/userStore';
import styles from './index.module.less';
import {addressData} from '@/utils/staticData'
const {Item} =Form

interface IProps {
  userStore: UserStore;
  history?: any,
}
interface IState {
  loading: boolean,
}
@inject('userStore')
@observer
class Login extends Component<IProps,IState>{
  constructor(props:IProps){
    super(props)

  }
  state:IState={
    loading: false,
  }

  onFinish=async(values:any)=>{
    const {userStore:{handelLogin}} = this.props
    console.log('finishValues:', values);
    //验证账号
    this.setState({loading:true})
    const response=await handelLogin(values) 
    this.setState({loading:false})

    if(response.success){
      message.success(response.msg)
      this.props.history.push('/dashboard/index')
      // this.props.history.push(menuData[0].children[0].path)
    }else{
      message.error(response.msg)
    }   
  }

  onFinishFailed=(errorInfo:any)=>{
    console.log('Failed:', errorInfo);
  }

  render(){

    const tailLayout = {
      wrapperCol: { offset:10 , span: 14 },
    };

    return(
      <div className={styles.pageCenter}>
        <div className={styles.loginBox}>
          <div className={styles.loginForm}>
            <h2>管理员登录</h2> <br />
            <Form wrapperCol={{ span: "24"}} onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}  >
              <Item name="username" rules={[{ required: true, message: '请输入您的账号' }]} >
                <Input size="large" placeholder="请输入您的账号" prefix={<UserOutlined />} />
              </Item>
              <Item name="password" rules={[{ required: true, message: '请输入您的密码' }]}  >
                <Input.Password size="large" placeholder="请输入您的密码" prefix={<LockOutlined />} />
              </Item>
              <Item  >
                验证码？
              </Item>
              {/* <Item label="省市地址" name="provinceId" htmlFor="provinceIdOther" rules={[{ required: true, message: '请选择省市地址' }]}>
                <Cascader options={addressData} placeholder="请选择省市地址" allowClear onChange={(value, selectedOptions)=>{
                  console.log('value, selectedOptions及string分别是',value, selectedOptions,value.join(' '))
                }}/>
              </Item> */}
              <Item wrapperCol={{ span: "24"}} >
                <Button style={{width:'100%',height:'42px',fontSize:'17px',marginTop:'3px',marginBottom:'-10px'}} type="primary" htmlType="submit" loading={this.state.loading}>登录</Button>
              </Item>
            </Form>
          </div>
        </div>
        </div>
    )
  }
};

export default Login;