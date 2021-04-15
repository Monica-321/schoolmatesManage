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
    schoolCompanyStore?: any;
    editFlag:any;
    // editRecord?:any,
    // editModalVisible:boolean,
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
            const {schoolCompanyStore:{schoolCompanyDetail}}=this.props
            this.formRef.current?.setFieldsValue(schoolCompanyDetail)
        }else{
            this.formRef.current?.resetFields()
        }
    }
    submit=async(values:any)=>{
        const { editFlag }=this.props
        const { schoolCompanyStore: {schoolCompanyDetail,goschoolCompaniesCreate,goschoolCompaniesModify} } = this.props
        //处理values
        let params={...values}
        params.companyCity=params.companyCity.join(' ')
        //判断编辑还是创建
        switch(editFlag){
            case 'add': 
                {
                var res=await goschoolCompaniesCreate(params)
                break;}
            case 'edit': 
                {
                params._id=schoolCompanyDetail._id
                var res=await goschoolCompaniesModify(params)
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
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
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
            title:editFlag==='edit'?"编辑校友单位":'创建校友单位',
            onCancel:this.handleCancel,
            destroyOnClose:true,
        }
        // const uploadProps = {
        //     beforeUpload: (file:any) => {
        //       if (file.type !== 'image/png') {
        //         message.error(`${file.name} is not a png file`);
        //       }
        //     //   return file.type === 'image/png' ? true : Upload.LIST_IGNORE;
        //     return file.type === 'image/png' ? true : false;
        //     },
        //     onChange: (info:any) => {
        //       console.log(info.fileList);
        //     },
        //   };
        return(
            <div>
                <Modal {...modalProps} >
                    <Form ref={this.formRef} {...layout} onFinish={this.submit} >
                        <Row>
                            <Col span={8}>
                                <Item label="企业名称" name="companyName"rules={[
                                        { required: true, message: '请填写校友企业名称' },
                                        { pattern: znEnReg , message:'请输入中文或英文' }
                                    ]} >
                                    {/*     企业名称可更改否？
                                    editFlag==='edit'?
                                        <span>{editRecord.companyName}</span>
                                        : */}
                                        <Input placeholder="请输入校友企业名称" />
                                    
                                </Item>
                            </Col>
                            <Col span={8}>
                                <Item label="企业性质" name="companyType"
                                    rules={[ { required: true, message: '请选择企业性质' },]}
                                >
                                    <Select placeholder="请选择企业性质">
                                    {
                                        companyTypesData.map((item: any) => <Option value={item.value} key={item.value}>{item.label}</Option>)
                                    }
                                    </Select>
                                </Item>
                            </Col>
                            <Col span={8}>
                                <Item label="企业规模" name="companySize"
                                    rules={[ { required: true, message: '请选择企业规模' },]}
                                >
                                    <Select placeholder="请选择企业规模">
                                    {
                                        companySizeList.map((item: any) => <Option value={item.value} key={item.value}>{item.label}</Option>)
                                    }
                                    </Select>
                                </Item>
                            </Col>
                            <Col span={8}>
                                <Item label="所在城市" name="companyCity"
                                    rules={[ { required: true, message: '请选择主要所在城市' },]}
                                >
                                <Cascader
                                    placeholder="请选择主要所在城市"
                                    options={addressData}
                                    className='inputMarginB'
                                />
                                </Item>
                            </Col>

                            {/* <Col span={16}>
                                <Item label="企业图片" name="companyPic" labelCol={{span: 3}} wrapperCol={{span: 20}} >
                                <Upload {...uploadProps}>
                                    <Button icon={<UploadOutlined />}>Upload png only</Button>
                                </Upload>
                                </Item>
                            </Col> */}
                            {/* <Col span={8}>
                                <Item label="所属行业" name="belongArea" >
                                    <Select placeholder="请选择所属行业" >
                                        <Option value={0}>所属行业</Option>
                                    </Select>
                                </Item>
                            </Col> */}

                            <Col span={16}>
                                <Item label="企业地址" name="companyAddress" labelCol={{span: 3}} wrapperCol={{span:20}} >
                                    <Input placeholder="请输入企业地址" />
                                </Item>
                            </Col>

                            <Col span={8}>
                                <Item label="企业网址" name="companyWebsite" >
                                    <Input placeholder="请输入企业网址" />
                                </Item>
                            </Col>
                            <Col span={8}>
                                <Item label="联系电话" name="companyPhone"
                                    rules={[
                                        // { pattern: phoneReg , message:'请输入正确格式的手机号' },    //可能还有座机TODO
                                        { required: true, message: '请填写校友企业联系电话' },
                                    ]}
                                >
                                    <Input placeholder="请输入企业联系电话" />
                                </Item>
                            </Col>
                            <Col span={8}>
                                <Item label="联系邮箱" name="companyEmail"
                                    rules={[ 
                                        { pattern: emailReg , message:'请输入正确格式的邮箱地址' },
                                        { required: true, message: '请填写校友企业联系邮箱' },
                                    ]}
                                >
                                    <Input placeholder="请输入企业联系邮箱" />
                                </Item>
                            </Col>

                            <Col span={24}>
                                <Item label="企业描述" name="companyDescription" labelCol={{span: 2}} wrapperCol={{span: 21}} >
                                    <TextArea showCount maxLength={400} placeholder="请输入企业描述"/>
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