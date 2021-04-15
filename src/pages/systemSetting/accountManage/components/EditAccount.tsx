import React, { Component } from 'react';
import { Modal, Form, Input, Select, Button, message } from 'antd';
import { znEnNumReg, phoneReg, emailReg } from '@/utils/reg';
import { FormInstance, Rule } from 'antd/lib/form';
const { Item } = Form
interface IProps {
  accountStore?:any,
  visibleEdit?: boolean;
  // curId?: any;
  hideModal?: any;
  fetchData?: any;
  action:string;
  editRecord?:any;
}
interface IState {
  loading: boolean;
}
class EditAccount extends Component<IProps,IState> {
  formRef: React.RefObject<FormInstance>
  constructor(prop: IProps){
    super(prop)
    this.formRef = React.createRef<FormInstance>()
  }
  state = {
    loading: false,
  }

  componentDidMount() {
    const {editRecord } = this.props
    this.formRef.current?.setFieldsValue(editRecord)
  }
  
  handleCancel = () => {
    this.formRef.current?.resetFields()
    this.props.hideModal()
  }

  submit = async(values:any) => {
    this.formRef.current?.validateFields()
    const { action,editRecord } = this.props
    const {accountStore:{goAdminsCreate,goAdminsModify}}=this.props
    if(action==='add'){
      //TODO 传参，默认普通管理员、启用状态，密码也默认123456a
      const params={
        identity:1,
        status:1,
        ...values,
      }
      const res=await goAdminsCreate(params)
      if(res.success){
        message.success(res.msg)
        this.props.hideModal()
        this.props.fetchData()
      }else{
        message.error(res.msg)
      }
    }else{
      //TODO 传参，普通管理员,id也传一下以找到此数据
      const params={
        _id:editRecord._id,
        ...values
      }
      const res=await goAdminsModify(params)
      if(res.success){
        message.success(res.msg)
        this.props.hideModal()
        this.props.fetchData()
      }else{
        message.error(res.msg)
      }
    }
  }

  render() {
    const {loading} = this.state
    const { action,editRecord } = this.props
    const {identity, username,phone,email} = editRecord

    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    const tailLayout = {
      wrapperCol: { offset: 6, span: 16 },
    };
    return (
      <div>
        <Modal
          getContainer={false}
          title={action==='edit' ? '编辑帐号' : '创建帐号'}
          centered
          visible={true}
          onCancel={this.handleCancel}
          width={530}
          closable={false}
          maskClosable={false}
          footer={null}
        >
          <Form {...layout} ref={this.formRef} onFinish={this.submit} >
          {action==='edit' ?
          <Item label="用户名" required>
            <span>{username}</span>
          </Item>
          :
          <Item label="用户名" name="username"
              validateTrigger="onBlur" 
              rules={[
                { required: true, message: '请输入用户名' },
                { validator: async (rule: Rule, value: string) => {
                    if (value && !znEnNumReg.test(value) ) {
                      throw new Error('帐号姓名输入信息错误，请确认');
                    } else if (value && value.length > 10 ) {
                      throw new Error('帐号姓名已超出系统要求的10个字符限制，请确认');
                    }
                  }
                }
              ]}>
              <Input placeholder='请输入用户名' allowClear autoComplete='off'/>
            </Item>            
          }
            <Item label="账户类型" required>
              {/* 超级管理员不能被编辑和平台添加 */}
              <span>管理员</span>
            </Item>
            <Item label="手机号" name="phone" 
              validateTrigger="onBlur"
              rules={[
                { required: true, message: '请输入手机号'},
                { pattern:phoneReg, message: '手机号输入信息错误，请确认' }
              ]}>
              <Input placeholder="请输入手机号" allowClear/>
            </Item>
            <Item label="邮箱地址" name="email" 
              validateTrigger="onBlur"
              rules={[
                { required: true, message: '请输入邮箱地址'},
                { validator: async (rule: Rule, value: string) => {
                    if (value && !emailReg.test(value) ) {
                      throw new Error('邮箱地址输入信息错误，请确认');
                    } else if (value && value.length > 50 ) {
                      throw new Error('邮箱地址已超出系统要求的“50个”字符限制，请确认');
                    }
                  }
                }
              ]}>
              <Input placeholder="请输入邮箱地址" allowClear/>
            </Item>
            <Item {...tailLayout}>
              <Button type="primary" htmlType="submit" loading={loading} >确认</Button>
              <Button onClick={this.handleCancel} style={{marginLeft:'10px'}}>取消</Button>
            </Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default EditAccount;