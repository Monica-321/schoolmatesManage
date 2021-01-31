import {Component} from 'react';
import styles from '../index.module.less';
import { Input, Button , Form, message } from 'antd';
const {Item}=Form

interface IProps {
  // loginStore: LoginStore;
  history?: any;
}
interface IState {
  // loading: boolean;
  isAbleToModify:boolean,
}

class ModifyInfo extends Component<IProps,IState>{
  constructor(props:IProps){
    super(props)

  }
  state:IState={
    isAbleToModify:false,
  }

  checkOldPwd=()=>{
    //验证是否是原密码，是就置true
    this.setState({isAbleToModify:true})
  }

  onFinish=(values:any)=>{
    console.log('Success:', values);  //values为表单内容的数组
    //提交账户以及values.newPassword以更改
    //修改成功后
    message.success('密码修改成功！请重新登录…')
    this.props.history.push('../login')
  }

  onFinishFailed=(errorInfo:any)=>{
    console.log('Failed:', errorInfo);
  }


  render(){

    const layout={
      labelCol : { span:3 },
      wrapperCol: { offset:1 , span: 11 },
    }
    const btnLayout = {
      wrapperCol: { offset:4 , span: 7 },
    };

    return(
      <div className={styles.pageCenter}>
        <div className={styles.innerInfoBox}>
          <div className={styles.modifyForm}>
            <h2>个人信息修改</h2> <br />
            <Form {...layout} onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}  >
              <Item name="username" label={<span style={{fontSize:'18px',textAlign:'right'}}>账号</span>}  >
                {/* <Input defaultValue={sessionStorage.getItem("username") || ''}  /> */}
                <span style={{fontSize:'16px'}}> {sessionStorage.getItem("username") || ''}</span>
              </Item>
              <Item name="oldPassword" label={<span style={{fontSize:'18px'}}>原密码</span>} 
                rules={[ { required: true, message: '请输入原密码' }, ]}
              >
                <span style={{display:'flex'}}>
                 <Input placeholder="请输入原密码以验证身份"  />
                 <Button type="primary" onClick={this.checkOldPwd}>验证</Button>
                </span>
              </Item>
              <Item name="newPassword" label={<span style={{fontSize:'18px'}}>新密码</span>}
                rules={[ { required: true, message: '请输入新密码' }, ]}
                //  style={{display:this.state.isAbleToModify? 'inline' :'none'}}
                  >
                    {
                      this.state.isAbleToModify?
                      <Input  placeholder="请输入新密码" />
                      :
                      <span style={{fontSize:'16px'}}> 请先输入原密码以验证身份</span>
                    }
              </Item>
              <Item {...btnLayout}>
                <Button style={{width:'100%',height:'40px',fontSize:'16px',marginTop:'10px'}} type="primary" htmlType="submit">修改</Button>
              </Item>
            </Form>
          </div>
        </div>
      </div>
    )
  }
};

export default ModifyInfo;