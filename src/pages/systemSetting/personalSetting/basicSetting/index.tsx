import React from 'react'
import { Form, Input, Button, message, Tooltip } from "antd";
import { FormInstance, Rule } from 'antd/lib/form';
import styles from './styles.module.less'
import { inject, observer } from 'mobx-react';
// import { PersonalSettingStore } from '@/stores/systemSetting/personalSettingStore';
import { UserStore } from '@/stores/userRelated/userStore';
import { emailReg , phoneReg } from '@/utils/reg';

const FORM_LAYOUT = {
    wrapperCol: {span: 19},
    labelCol: {span: 5}
}

interface IProps{
    userStore: UserStore,
    history?: any,
    // refresh?:any,
}
@inject('userStore')
@observer
export default class BasicSetting extends React.Component<IProps> {
    phoneRule: Array<Rule>
    emailRule: Array<Rule>
    formRef: React.RefObject<FormInstance>
    constructor(prop: IProps){
        super(prop)
        this.formRef = React.createRef<FormInstance>()
        this.phoneRule = [
            {required: true, message: '请输入手机号'},
            {pattern: phoneReg, message: '请输入正确格式的手机号'}
        ]
        this.emailRule = [
            {required: true, message: '请输入邮箱地址信息'},
            {pattern: emailReg, message: '请输入正确格式的邮箱地址'}
        ]
    }
    update=async()=>{
        const {userStore:{updateUserInfo,fetchUserInfo}}=this.props
        //TODO 传参
        const params={ }
        const res=await updateUserInfo(params)
        if(res.success){
            message.success(res.msg)
            await fetchUserInfo({username:localStorage.getItem("userName")})
            this.setForm()
        }else{
            message.error(res.msg)
        }
    }
    setForm(){
        let accountInfo =this.props.userStore.userData
        let values = {
            username: accountInfo.username,
            identity:accountInfo.identity,
            phone: accountInfo.phone,
            email: accountInfo.email
        }
        this.formRef.current?.resetFields()
        this.formRef.current?.setFieldsValue(values)
    }
    render(){
        let accountInfo =this.props.userStore.userData
        return(<>
            <div className={styles.content}>
                <Form ref={this.formRef} {...FORM_LAYOUT} onFinish={this.update}>
                    <Form.Item label='用户名'> <span>{accountInfo.username}</span> </Form.Item>
                    <Form.Item label='账户类型'><span>{accountInfo.identity===1?'管理员':'超级管理员'}</span></Form.Item>
                    <Form.Item label='手机号'   name="phone" rules={this.phoneRule} validateTrigger="onBlur"><Input placeholder="请输入手机号信息"/></Form.Item>
                    <Form.Item label='邮箱地址' name="email" rules={this.emailRule} validateTrigger="onBlur"><Input placeholder="请输入邮箱地址信息"/></Form.Item>
                    <div className="ant-row ant-form-item">
                        <div className="ant-col ant-col-5"/>
                        <div className="ant-col ant-col-24 ant-form-item-control">
                            <Button type="primary" htmlType="submit">更新</Button>
                        </div>
                    </div>
                </Form>
            </div>
        </>)
    }
}
