import React, { Component } from 'react';
import { Modal, Form, Input, Button, Row, Col,Select,Upload,message } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { znEnReg , phoneReg , emailReg } from '@/utils/reg'
import { UploadOutlined } from '@ant-design/icons';
const { Item } = Form
const {Option}=Select
const { TextArea } = Input
interface IProps {
    // warningContactStore?: any;
    editFlag:number
    editRecord?:any,
    editModalVisible:boolean,
    hideEdit:any,
}
interface IState {

}

class AddOrEdit extends Component<IProps,IState> {
    formRef: React.RefObject<FormInstance>
    constructor(props: IProps){
      super(props)
      this.formRef = React.createRef<FormInstance>()
    }

    submit=async(values:any)=>{
        //提交,创建/编辑
        this.props.hideEdit()
    }

    handleCancel = () => {
        this.formRef.current?.resetFields()
        this.props.hideEdit()
    }

    render(){  
        const {editModalVisible, editRecord, editFlag}=this.props
        const layout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
        };
        const tailLayout = {
            wrapperCol: { span: 14 , offset: 9 },
        };
        const modalProps={
            visible:editModalVisible,
            centered:true,
            closable:false,
            footer:null,
            width:1100,
            title:editFlag?"编辑校友单位":'创建校友单位',
            onCancel:this.handleCancel,
            destroyOnClose:true,
        }
        const uploadProps = {
            beforeUpload: (file:any) => {
              if (file.type !== 'image/png') {
                message.error(`${file.name} is not a png file`);
              }
            //   return file.type === 'image/png' ? true : Upload.LIST_IGNORE;
            return file.type === 'image/png' ? true : false;
            },
            onChange: (info:any) => {
              console.log(info.fileList);
            },
          };
        return(
            <div>
                <Modal {...modalProps} >
                    <Form ref={this.formRef} {...layout} initialValues={editRecord} onFinish={this.submit} >
                        <Row>
                            <Col span={8}>
                                <Item label="企业名称" name="companyName"rules={[
                                        { required: true, message: '请填写校友企业名称' },
                                        { pattern: znEnReg , message:'请输入中文或英文' }
                                    ]} >
                                    {editFlag?
                                        <span>{editRecord.companyName}</span>
                                        :
                                        <Input placeholder="请输入校友企业名称" />
                                    }
                                </Item>
                            </Col>
                            <Col span={8}>
                                <Item label="企业性质" name="companyType"
                                    rules={[ { required: true, message: '请选择企业性质' },]}
                                >
                                    <Select placeholder="请选择企业性质">
                                        <Option value={0}>企业性质</Option>
                                    </Select>
                                </Item>
                            </Col>
                            <Col span={8}>
                                <Item label="主要所在城市" name="companyCity" >
                                    <Select placeholder="请选择所在城市">
                                        <Option value={0}>所在城市</Option>
                                    </Select>
                                </Item>
                            </Col>

                            <Col span={16}>
                                <Item label="企业图片" name="companyPic" labelCol={{span: 3}} wrapperCol={{span: 20}} >
                                    {/* TODO 照片墙形式？或者有值就显示没值就这个 */}
                                <Upload {...uploadProps}>
                                    <Button icon={<UploadOutlined />}>Upload png only</Button>
                                </Upload>
                                </Item>
                            </Col>
                            <Col span={8}>
                                <Item label="所属行业" name="belongArea" >
                                    <Select placeholder="请选择所属行业" >
                                        <Option value={0}>所属行业</Option>
                                    </Select>
                                </Item>
                            </Col>

                            <Col span={24}>
                                <Item label="企业主要地址" name="companyAddress" labelCol={{span: 2}} wrapperCol={{span: 21}} >
                                    <Input placeholder="请输入企业主要地址" />
                                </Item>
                            </Col>

                            <Col span={8}>
                                <Item label="企业负责人" name="companyPrincipal" >
                                    <Input placeholder="请输入企业负责人" />
                                </Item>
                            </Col>
                            <Col span={8}>
                                <Item label="联系电话" name="companyPhone"
                                    // rules={[{ pattern: phoneReg , message:'请输入正确格式的手机号' }]}
                                >
                                    <Input placeholder="请输入企业联系电话" />
                                </Item>
                            </Col>
                            <Col span={8}>
                                <Item label="联系邮箱" name="companyEmail"
                                    rules={[ { pattern: emailReg , message:'请输入正确格式的邮箱地址' }]}
                                >
                                    <Input placeholder="请输入企业联系邮箱" />
                                </Item>
                            </Col>

                            <Col span={24}>
                                <Item label="企业描述" name="companyDescription" labelCol={{span: 2}} wrapperCol={{span: 21}} >
                                    <TextArea showCount maxLength={300} />
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