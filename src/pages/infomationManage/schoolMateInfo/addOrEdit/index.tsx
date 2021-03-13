import React, { Component } from 'react';
import { Modal, Form, Input, Button, Row, Col,Select } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { znEnReg , phoneReg , emailReg } from '@/utils/reg'
const { Item } = Form
const {Option}=Select
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
            wrapperCol: { span: 15 , offset: 9 },
        };
        const modalProps={
            visible:editModalVisible,
            centered:true,
            closable:false,
            footer:null,
            width:930,
            title:editFlag?"编辑校友":'创建校友',
            onCancel:this.handleCancel,
            destroyOnClose:true,
        }
        return(
            <div>
                <Modal {...modalProps} >
                    <Form ref={this.formRef} {...layout} initialValues={editRecord} onFinish={this.submit} >
                        <Row>
                            <Col span={8}>
                                <Item label="学号" name="id"rules={[
                                        { required: true, message: '请填写学号' },
                                        // { pattern: znEnReg , message:'请输入中文或英文' }
                                    ]} >
                                    {editFlag?
                                        <span>{editRecord.id}</span>
                                        :
                                        <Input placeholder="请输入校友学号" />
                                    }
                                </Item>
                            </Col>
                            <Col span={8}>
                                <Item label="姓名" name="name"
                                    rules={[
                                        { required: true, message: '请填写校友姓名' },
                                        { pattern: znEnReg , message:'请输入中文或英文' }
                                    ]}
                                >
                                    <Input placeholder="请输入校友姓名" />
                                </Item>
                            </Col>
                            <Col span={8}>
                                <Item label="性别" name="gender"
                                    rules={[ { required: true, message: '请选择校友性别' },]}
                                >
                                    <Select placeholder="请选择校友性别">
                                        <Option value={0}>女</Option>
                                        <Option value={1}>男</Option>
                                    </Select>
                                </Item>
                            </Col>
                            <Col span={8}>
                                <Item label="民族" name="nationality" >
                                    <Select placeholder="请选择民族">
                                        <Option value={0}>民族</Option>
                                    </Select>
                                </Item>
                            </Col>
                            <Col span={8}>
                                <Item label="政治面貌" name="politicalStatus" >
                                    <Select placeholder="请选择政治面貌">
                                        <Option value={0}>政治面貌</Option>
                                    </Select>
                                </Item>
                            </Col>
                            <Col span={8}>
                                <Item label="生源地" name="sourcePlace" >
                                    <Select placeholder="请选择生源地">
                                        <Option value={0}>生源地</Option>
                                    </Select>
                                </Item>
                            </Col>
                            <Col span={8}>
                                <Item label="籍贯" name="homeTown" >
                                    <Select placeholder="请选择籍贯">
                                        <Option value={0}>籍贯</Option>
                                    </Select>
                                </Item>
                            </Col>
                            <Col span={8}>
                                <Item label="院系" name="faculty" >
                                    <Select disabled defaultValue={0} >
                                        <Option value={0}>信息学院</Option>
                                    </Select>
                                </Item>
                            </Col>
                            <Col span={8}>
                                <Item label="专业" name="major" >
                                    <Select placeholder="请选择专业">
                                        <Option value={0}>专业</Option>
                                    </Select>
                                </Item>
                            </Col>
                            <Col span={8}>
                                <Item label="班级" name="majorClass" >
                                    <Input placeholder="请输入班级" />
                                </Item>
                            </Col>
                            <Col span={8}>
                                <Item label="入学年份" name="yearOfEnrollment" >
                                    <Select placeholder="请选择入学年份" >
                                        <Option value={0}>入学年份</Option>
                                    </Select>
                                </Item>
                            </Col>
                            <Col span={8}>
                                <Item label="毕业年份" name="yearOfGraduation" >
                                    <Select placeholder="请选择毕业年份" >
                                        <Option value={0}>毕业年份</Option>
                                    </Select>
                                </Item>
                            </Col>
                            <Col span={8}>
                                <Item label="联系手机" name="contactPhone"
                                    rules={[{ pattern: phoneReg , message:'请输入正确格式的手机号' }]}
                                >
                                    <Input placeholder="请输入校友联系手机" />
                                </Item>
                            </Col>
                            <Col span={8}>
                                <Item label="联系邮箱" name="contactEmail"
                                    rules={[ { pattern: emailReg , message:'请输入正确格式的邮箱地址' }]}
                                >
                                    <Input placeholder="请输入校友联系邮箱" />
                                </Item>
                            </Col>
                            <Col span={8}>
                                <Item label="现从事行业" name="workArea" >
                                    <Select placeholder="请选择目前从事行业" >
                                        <Option value={0}>从事行业</Option>
                                    </Select>
                                </Item>
                            </Col>
                        </Row>
                        
                        <Item {...tailLayout} >
                            <Button type="primary" htmlType='submit' className="mr10">确认</Button>
                            <Button onClick={this.handleCancel}>取消</Button>
                        </Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}
export default AddOrEdit;