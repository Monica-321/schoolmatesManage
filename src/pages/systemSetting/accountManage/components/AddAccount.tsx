import React, { Component } from 'react';
import { Modal, Form, Input, Select, Button, message } from 'antd';
import { znEnNumReg, enNumUnderlineReg, phoneReg, emailReg } from '@/utils/reg';
import { FormInstance, Rule } from 'antd/lib/form';
const { Item } = Form
const { Option } = Select;

interface IProps {

  visibleAdd?: boolean;
  hideModal?: any;
  fetchData?: any;
}
interface IState {
  loading: boolean;
  loadingNext: boolean;
  accountType?: any;
  isStep1: boolean;
}
class AddAccount extends Component<IProps,IState> {
  formRef: React.RefObject<FormInstance>
  constructor(prop: IProps){
    super(prop)
    this.formRef = React.createRef<FormInstance>()
  }
  state = {
    loading: false,
    loadingNext: false,
    accountType: null,
    isStep1: true
  }
  
  changeType = (val: any) => {
    if(this.state.accountType === val) return
    this.setState({
      accountType: val
    })
    this.formRef.current?.resetFields()
    this.formRef.current?.setFieldsValue({type: val})
  }

  goStep2 = () => {
    if (this.state.accountType) {
      this.setState({
        isStep1: false
      })
    } else {
      message.error('请先选择帐号类型')
    }
  }

  handleCancel = () => {
    this.setState({
      accountType: null,
      isStep1: true
    })
    this.formRef.current?.resetFields()
    this.props.hideModal()
  }

  submit = (isNext: boolean) => {
    this.formRef.current?.validateFields()

  }

  setNext = () => {
    let initialValues: any = {}
    let {type, roleIds, groupIds, roleIdCustomer, customerId} = this.formRef.current?.getFieldsValue()
    if (type === 1) {
      initialValues = {
        type: 1,
        name: '', 
        username: '', 
        phone: '', 
        email: '', 
        roleIds, 
        groupIds, 
      }
    } else {
      initialValues = {
        type: 2,
        name: '', 
        username: '', 
        phone: '', 
        email: '', 
        roleIdCustomer, 
        customerId
      }
    }
    this.formRef.current?.setFieldsValue(initialValues)
  }

  render() {
    const {loading, loadingNext, accountType, isStep1} = this.state
    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    const tailLayout = {
      wrapperCol: { offset: 6, span: 16 },
    };
    const { visibleAdd, } = this.props
    const accountTypes = [{name:'超级管理员', id: 1}, {name:'管理员', id: 2}]
  
    return (
      <div>
        <Modal
          title="创建帐号"
          centered
          visible={visibleAdd}
          onCancel={this.handleCancel}
          width={530}
          closable={false}
          maskClosable={false}
          getContainer={false}
          footer={null}
        >
          <Form {...layout} ref={this.formRef}>
            {
              isStep1 && (
                <Item label="帐号类型" name="type" rules={[{ required: true, message: '请选择帐号类型' }]} validateTrigger="onBlur">
                  <Select placeholder="请选择帐号类型" allowClear onChange={this.changeType}>
                    {
                      accountTypes.map(item => <Option value={item.id} key={item.id}>{item.name}</Option>)
                    }
                  </Select>
                </Item>
              )
            }
            {!isStep1 && accountType && (
              <div>
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
                <Item label="用户名" name="username" 
                  validateTrigger="onBlur"
                  rules={[
                    { required: true, message: '请输入用户名' },
                    { validator: async (rule: Rule, value: string) => {
                        if (value && !enNumUnderlineReg.test(value) ) {
                          throw new Error('用户名输入信息错误，请确认');
                        } else if (value && value.length > 12 ) {
                          throw new Error('用户名已超出系统要求的“12个”字符限制，请确认');
                        }
                      }
                    }
                  ]}>
                  <Input placeholder='请输入用户名' allowClear autoComplete='off'/>
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
              </div>
            )}  
            <Item {...tailLayout}>
              {isStep1 && <Button type="primary" onClick={this.goStep2} className="mr10">确认</Button>}
              {!isStep1 && <Button type="primary" onClick={this.submit.bind(this, false)} loading={loading} className="mr10">确认</Button>}
              {!isStep1 && <Button type="primary" onClick={this.submit.bind(this, true)} loading={loadingNext} style={{marginLeft:'10px'}}>继续添加</Button>}
              <Button onClick={this.handleCancel} style={{marginLeft:'10px'}}>取消</Button>
            </Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default AddAccount;