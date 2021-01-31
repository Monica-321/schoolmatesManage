import {Component} from 'react';
import { Link } from 'react-router-dom';
import { Input, Button , Form, message } from 'antd';
import { UserOutlined , LockOutlined } from '@ant-design/icons';
import styles from './index.module.less';
const {Item} =Form

interface IProps {
  // loginStore: LoginStore;
  history?: any;
}
interface IState {
  // loading: boolean;
}
class Register extends Component<IProps,IState>{
  constructor(props:IProps){
    super(props)
  }
  state:IState={

  }

  goLogin=()=>{
    console.log('跳转登录页');
    this.props.history.push('./login')
  }

  onFinish=(values:any)=>{
    console.log('Success:', values);  //values为表单内容的数组
    //TODO 验证账号是否注册成功
    message.success(`您的账号：${values.username} 注册成功！即将跳转登录页...`)
    //TODO 跳转登录页
    this.goLogin()
  }

  onFinishFailed=(errorInfo:any)=>{
    console.log('Failed:', errorInfo);
  }

  render(){
    const regUsername = /^[\w]{6,18}$/;//用户名 6--18位数字,字母,下划线_
    const regPwd = /^[\W\da-zA-Z_]{6,20}$/;//密码 6--20位数字,字母,任意字符

    return(
      <div className={styles.pageCenter}>
        <div className={styles.loginBox}>
          <div className={styles.loginForm}>
            <h2>账号注册</h2> <br />
            <Form wrapperCol={{ span: "24"}} onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}  >
              <Item name="username" rules={[
                { required: true, message: '请输入您的账号' },
                { pattern: regUsername , message: '请输入6-18位包含数字、字母或下划线的用户名'},
                ]} >
                <Input  placeholder="请输入您的账号" prefix={<UserOutlined className="site-form-item-icon" />} />
              </Item>
              <Item name="password" rules={[
                { required: true, message: '请输入您的密码' },
                { pattern : regPwd , message: '请输入6-20位包含数字、字母或任意字符的密码'},
                ]}  >
                <Input.Password  placeholder="请输入您的密码" prefix={<LockOutlined />} />
              </Item>
              <Item name="passwordConfirm" rules={[
                { required: true, message: '请二次确认您的密码' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('两次输入的密码不一致！');
                  },
                }),
                ]}  >
                <Input.Password placeholder="请二次确认您的密码" prefix={<LockOutlined />} />
              </Item>
              <Item wrapperCol={{ span: "24"}} >
                <Button style={{width:'100%',height:'40px',fontSize:'16px'}} type="primary" htmlType="submit">注册</Button>
              </Item>
            </Form>
          </div>
        </div>
        </div>
    )
  }
};

export default Register;