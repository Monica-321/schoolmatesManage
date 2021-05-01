import React, { Component } from 'react';
import { Modal, Form, Input, Button, Row, Col,Select,Upload,message,Cascader } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { znEnReg , phoneReg , emailReg } from '@/utils/reg'
import { UploadOutlined } from '@ant-design/icons';
import {companyTypesData,addressData,companySizeList}from '@/utils/staticData'
const { Item } = Form
const {Option}=Select
const { TextArea } = Input
interface IProps {
    schoolPostStore?: any;
    editFlag:any;
    hideEdit:any,
    fetchData?: any;
}
interface IState {

}

class AddOrEdit extends Component<IProps,IState> {
    formRef: React.RefObject<FormInstance>
    constructor(props: IProps){
      super(props)
      this.formRef = React.createRef<FormInstance>()
    }
    componentDidMount(){
        const {editFlag } = this.props
        if(editFlag==='edit'){
            const {schoolPostStore:{schoolPostDetail}}=this.props
            this.formRef.current?.setFieldsValue(schoolPostDetail)
        }else{
            this.formRef.current?.resetFields()
        }
    }
    submit=async(values:any)=>{
        const { editFlag }=this.props
        const { schoolPostStore: {schoolPostDetail,goschoolPostsCreate,goschoolPostsModify} } = this.props
        //处理values
        let params={...values}
        //判断编辑还是创建
        switch(editFlag){
            case 'add': 
                {
                var res=await goschoolPostsCreate(params)
                break;}
            case 'edit': 
                {
                params._id=schoolPostDetail._id
                var res=await goschoolPostsModify(params)
                break;}
        }
        if(res.success){
            message.success(res.msg)
            this.props.hideEdit()
            this.props.fetchData()
        }else{
            message.error(res.msg)
        }
    }

    handleCancel = () => {
        this.formRef.current?.resetFields()
        this.props.hideEdit()
    }

    render(){  
        const {editFlag}=this.props
        const layout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 21 },
        };
        const tailLayout = {
            wrapperCol: { span: 14 , offset: 9 },
        };
        const modalProps={
            visible:true,
            centered:true,
            closable:false,
            footer:null,
            width:1100,
            title:editFlag==='edit'?"编辑活动公告":'创建活动公告',
            onCancel:this.handleCancel,
            destroyOnClose:true,
        }
        return(
            <div>
                <Modal {...modalProps} >
                    <Form ref={this.formRef} {...layout} onFinish={this.submit} >
                        <Row>
                            <Col span={12}>
                                <Item label="公告标题" labelCol={{span: 4}} wrapperCol={{span:19}} name="title"rules={[
                                        { required: true, message: '请填写校友企业名称' },
                                        { pattern: znEnReg , message:'请输入中文或英文' }
                                    ]} >
                                    <Input placeholder="请输入公告标题" />
                                </Item>
                            </Col>
                            <Col span={12}>
                                <Item label="活动时间" name="time"  labelCol={{span: 3}} wrapperCol={{span:19}} >
                                    <Input placeholder="请输入活动时间" />
                                </Item>
                            </Col>

                            <Col span={24}>
                                <Item label="活动地址" name="address" >
                                    <Input placeholder="请输入活动地址" />
                                </Item>
                            </Col>
                            <Col span={24}>
                                <Item label="活动正文" name="context" rules={[
                                        { required: true, message: '请填写活动正文' },
                                    ]}  >
                                    <TextArea showCount autoSize={{ minRows: 2, maxRows: 5 }} maxLength={500} placeholder="请输入活动正文"/>
                                </Item>
                            </Col>
                            <Col span={24}>
                                <Item label="参与方式" name="method" >
                                    <TextArea showCount autoSize={{ minRows: 2, maxRows: 5 }} maxLength={500} placeholder="请输入参与方式"/>
                                </Item>
                            </Col>
                        </Row>
                        
                        <Item {...tailLayout} >
                            <Button type="primary" htmlType='submit' className="mr10">确认</Button>
                            <Button onClick={this.handleCancel} style={{marginLeft:'20px'}}>取消</Button>
                        </Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}
export default AddOrEdit;