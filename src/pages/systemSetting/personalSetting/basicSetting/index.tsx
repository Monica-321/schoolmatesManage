import React from 'react'
import { Form, Input, Button, message, Tooltip } from "antd";
import { FormInstance, Rule } from 'antd/lib/form';
import styles from './styles.module.less'
import { inject, observer } from 'mobx-react';
// import { PersonalSettingStore } from '@/stores/systemSetting/personalSettingStore';
// import { LoginStore } from '@/stores/login/loginStore';
import { emailReg } from '@/utils/reg';

const FORM_LAYOUT = {
    wrapperCol: {span: 19},
    labelCol: {span: 5}
}

interface IProps{
    // personalSettingStore: PersonalSettingStore,
    // loginStore?: LoginStore
}

const validEmail = async (rules: Rule, value: string)=>{
    if(!value||!value.length)return  //判空已交由antd form处理
    if(value.length>50)throw new Error('邮箱地址已超出系统要求的“50个”字符限制，请确认')
    if(!emailReg.test(value)) throw new Error('邮箱地址信息输入信息错误，请确认')
}

export default class BasicSetting extends React.Component<IProps> {
    nameRule: Array<Rule>
    phoneRule: Array<Rule>
    emailRule: Array<Rule>
    formRef: React.RefObject<FormInstance>
    constructor(prop: IProps){
        super(prop)
        this.formRef = React.createRef<FormInstance>()
        this.nameRule = [
            {required: true, message: "请输入员工姓名"},
            // {validator: },
        ]
        this.phoneRule = [
            {required: true, message: '请输入手机号'},
            // {validator: }
        ]
        this.emailRule = [
            {required: true, message: '请输入邮箱地址信息'},
            {validator: validEmail}
        ]
    }
    async update(){
        
    }
    accountInfo ={
        username:'username',
        name:'name',
        phone:'13777877712',
        email:'1236544@add.com',
        admin:1,
        roleName:'管理员'
    }
    setForm(){
        let accountInfo =this.accountInfo
        let values = {
            name: accountInfo.name,
            phone: accountInfo.phone,
            email: accountInfo.email
        }
        this.formRef.current?.resetFields()
        this.formRef.current?.setFieldsValue(values)
    }
    render(){
        let accountInfo =this.accountInfo
        return(<>
            <div className={styles.content}>
                <Form ref={this.formRef} {...FORM_LAYOUT}>
                    <Form.Item label='账户名称'>
                        <span>{accountInfo.name}</span>
                    </Form.Item>
                    <Form.Item label='用户名'><Input defaultValue={accountInfo.username} placeholder="请输入用户名"/></Form.Item>
                    <Form.Item label='手机号'   name="phone" rules={this.phoneRule} validateTrigger="onBlur"><Input placeholder="请输入手机号信息"/></Form.Item>
                    {/* <Form.Item label='邮箱地址' name="email" rules={this.emailRule} validateTrigger="onBlur"><Input placeholder="请输入邮箱地址信息"/></Form.Item> */}
                    <Form.Item label='账户类型'><span>{accountInfo.roleName}</span></Form.Item>
                    <div className="ant-row ant-form-item">
                        <div className="ant-col ant-col-5"/>
                        <div className="ant-col ant-col-24 ant-form-item-control">
                            <Button type="primary" onClick={()=>{this.update()}}>更新</Button>
                        </div>
                    </div>
                </Form>
            </div>
        </>)
    }
}
