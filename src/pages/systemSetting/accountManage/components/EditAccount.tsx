import React, { Component } from 'react';
import { Modal, Form, Input, Select, Button, message } from 'antd';
import { znEnNumReg, phoneReg, emailReg } from '@/utils/reg';
import { FormInstance, Rule } from 'antd/lib/form';
const { Item } = Form
const { Option } = Select;

interface IProps {
  visibleEdit?: boolean;
  curId?: any;
  hideModal?: any;
  fetchData?: any;
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
    
    this.formRef.current?.setFieldsValue({})
  }
  
  handleCancel = () => {
    this.formRef.current?.resetFields()
    this.props.hideModal()
  }

  submit = () => {
    this.formRef.current?.validateFields()
  }

  render() {
    const {loading} = this.state
    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    const tailLayout = {
      wrapperCol: { offset: 6, span: 16 },
    };
    const { curId, } = this.props
    const accountDetail={
      type:'',
      username:'username',
    }
    const {type, username} = accountDetail

    return (
      <div>
        <Modal
          getContainer={false}
          title={curId ? '编辑帐号' : '创建帐号'}
          centered
          visible={true}
          onCancel={this.handleCancel}
          width={530}
          closable={false}
          maskClosable={false}
          footer={null}
        >
          <Form {...layout} ref={this.formRef}>
            <Item label="帐号姓名" name="name"
              validateTrigger="onBlur" 
              rules={[
                { required: true, message: '请输入帐号姓名' },
                { validator: async (rule: Rule, value: string) => {
                    if (value && !znEnNumReg.test(value) ) {
                      throw new Error('帐号姓名输入信息错误，请确认');
                    } else if (value && value.length > 10 ) {
                      throw new Error('帐号姓名已超出系统要求的“10个”字符限制，请确认');
                    }
                  }
                }
              ]}>
              <Input placeholder='请输入帐号姓名' allowClear autoComplete='off'/>
            </Item>
            <Item label="用户名" required>
              <span>{username}</span>
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
              <Button type="primary" onClick={this.submit} loading={loading} >确认</Button>
              <Button onClick={this.handleCancel} style={{marginLeft:'10px'}}>取消</Button>
            </Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default EditAccount;