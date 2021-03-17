import React from 'react'
import { Form, Input, Button } from 'antd'
import { FormInstance, Rule } from 'antd/lib/form'
import styles from './styles.module.less'
import {pwdReg} from '@/utils/reg'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'

const FORM_LAYOUT = {
    wrapperCol: {span: 19},
    labelCol: {span: 5}
}

interface IState {
    
}
interface IProp {
    
}
export default class PasswdSetting extends React.Component<IProp,IState> {
    formRef: React.RefObject<FormInstance>
    constructor(prop: IProp){
        super(prop)
        this.formRef = React.createRef<FormInstance>()
    }
    async update(){
        
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
        if (value && value === formVals.old ) {
            throw new Error('新密码不能与原密码相同，请确认')
        }
        if(value.length>20 || value.length<8)throw new Error('新密码已超出系统要求的“8~20个”字符限制，请确认')
        if(!pwdReg.test(value)){
            throw new Error('密码输入信息错误，请确认')
        }
    }
    confirmValidator = async (rule: Rule, value: string)=>{
        if(!value||value.length === 0){
            throw new Error('请输入确认密码信息')
        }
        let formVals = this.formRef.current?.getFieldsValue()
        if (value && value === formVals.old ) {
            throw new Error('新密码不能与原密码相同，请确认')
        }
        if(value.length>20|| value.length<8)throw new Error('确认密码已超出系统要求的“8~20个”字符限制，请确认')
        let newPwd = this.formRef.current?.getFieldValue('new')
        if(newPwd !== value){
            throw new Error('确认密码输入信息错误，请确认')
        }
    }
    render(){
        return(<>
            <div className={styles.content}>
                <Form ref={this.formRef} {...FORM_LAYOUT}>
                    <Form.Item label='原密码' name="old"
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
                    <Form.Item label='新密码' name="new"
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
                    <Form.Item label='确认密码' name="confirm"
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
                            <Button type="primary" onClick={()=>{this.update()}}>更新</Button>
                        </div>
                    </div>
                </Form>
            </div>
        </>)
    }
}
