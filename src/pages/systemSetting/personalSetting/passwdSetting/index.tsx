import React from 'react'
import { Form, Input, Button ,message } from 'antd'
import { FormInstance, Rule } from 'antd/lib/form'
import styles from './styles.module.less'
import {pwdReg} from '@/utils/reg'
import { UserStore } from '@/stores/userRelated/userStore';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'

const FORM_LAYOUT = {
    wrapperCol: {span: 19},
    labelCol: {span: 5}
}

interface IState {
    
}
interface IProp {
    userStore: UserStore,
    history?: any,
}
export default class PasswdSetting extends React.Component<IProp,IState> {
    formRef: React.RefObject<FormInstance>
    constructor(prop: IProp){
        super(prop)
        this.formRef = React.createRef<FormInstance>()
    }
    update=async(values:any)=>{
        const {userStore:{userName,updateUserPwd,handelLogout}}=this.props
        //TODO 传参
        const params={username:userName,...values }
        const res=await updateUserPwd(params)
        if(res.success){
            // message.success(res.msg)
            //TODO 重新登录
            setTimeout(message.success('密码已更改，请重新登录…'),2500)
            localStorage.clear()
            sessionStorage.clear()
            window.location.href = '../'
        }else{
            message.error(res.msg)
        }
    }
    oldValidator = async (rule:Rule, value:string)=>{
        if(!value||value.length===0){
            throw new Error('请输入原密码信息')
        }
    }
    newValidator = async (rule:Rule, value:string)=>{
        if(!value||value.length===0){
            throw new Error('请输入新密码信息')
        }
        let formVals = this.formRef.current?.getFieldsValue()
        if (value && value === formVals.oldPwd ) {
            throw new Error('新密码不能与原密码相同，请确认')
        }
        // if(value.length>20 || value.length<6)throw new Error('新密码需限制在6~20个字符')
        if(!pwdReg.test(value)){
            throw new Error('密码需限制在6~20个字符，由英文数字符号至少两种组成')
        }
    }
    confirmValidator = async (rule: Rule, value: string)=>{
        if(!value||value.length === 0){
            throw new Error('请输入确认密码信息')
        }
        let formVals = this.formRef.current?.getFieldsValue()
        if (value && value !== formVals.newPwd ) {
            throw new Error('确认密码需与新密码相同')
        }
        // if(value.length>20|| value.length<6)throw new Error('确认密码需限制在6~20个字符')
        let newPwd = this.formRef.current?.getFieldValue('newPwd')
        if(newPwd !== value){
            throw new Error('密码需限制在6~20个字符，由英文数字符号至少两种组成')
        }
    }
    render(){
        return(<>
            <div className={styles.content}>
                <Form ref={this.formRef} {...FORM_LAYOUT} onFinish={this.update}>
                    <Form.Item label='原密码' name="oldPwd"
                        validateTrigger="onBlur"
                        rules={[{validator: this.oldValidator}]}
                        required
                    >
                        <Input.Password type="password" placeholder="请输入原密码信息"
                            iconRender={(visible:boolean)=>{
                                return (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)
                            }}
                        />
                    </Form.Item>
                    <Form.Item label='新密码' name="newPwd"
                        validateTrigger="onBlur"
                        rules={[{validator: this.newValidator}]}
                        required
                    >
                        <Input.Password type="password" placeholder="请输入新密码信息"
                            iconRender={(visible:boolean)=>{
                                return (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)
                            }}
                        />
                    </Form.Item>
                    <Form.Item label='确认密码' name="confirmPwd"
                        validateTrigger="onBlur"
                        rules={[{validator: this.confirmValidator}]}
                        required
                    >
                        <Input.Password type="password" placeholder="请输入确认密码信息"
                            iconRender={(visible:boolean)=>{
                                return (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)
                            }}
                        />
                    </Form.Item>
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
