import {Component} from 'react';
import { Link } from 'react-router-dom';
import { Input, Button , Form } from 'antd';
import { UserOutlined , LockOutlined } from '@ant-design/icons';
import styles from './index.module.less';
const {Item} =Form

interface IProps {
  // loginStore: LoginStore;
  history?: any,
}
interface IState {
  loading: boolean,
}

class Login extends Component<IProps,IState>{
  constructor(props:IProps){
    super(props)

  }
  state:IState={
    loading: false,
  }

  onFinish=(values:any)=>{
    //TODO 验证账号
    console.log('Success:', values);  //values为表单内容的数组
    //TODO 成功就跳转首页
      sessionStorage.setItem("username",values.username)
      this.props.history.push('/dashboard/index')
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
            <h2>账号登录</h2> <br />
            <Form wrapperCol={{ span: "24"}} onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}  >
              <Item name="username" rules={[{ required: true, message: '请输入您的账号' }]} >
                <Input placeholder="请输入您的账号" prefix={<UserOutlined />} />
              </Item>
              <Item name="password" rules={[{ required: true, message: '请输入您的密码' }]}  >
                <Input.Password placeholder="请输入您的密码" prefix={<LockOutlined />} />
              </Item>
              <Item {...tailLayout} >
                <Link to='/register'>没有账号？去注册</Link>
              </Item>
              <Item wrapperCol={{ span: "24"}} >
                <Button style={{width:'100%',height:'40px',fontSize:'16px'}} type="primary" htmlType="submit">登录</Button>
              </Item>
            </Form>
          </div>
        </div>
        </div>
    )
  }
};

export default Login;