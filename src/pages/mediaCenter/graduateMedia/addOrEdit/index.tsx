import React, { Component } from 'react';
import { Modal, Form, Input, Button, Row, Col,Select,Upload,message,Cascader } from 'antd';
import { FormInstance } from 'antd/lib/form';
import Axios from 'axios';
import { znEnReg , phoneReg , emailReg } from '@/utils/reg'
import { UploadOutlined } from '@ant-design/icons';
import {companyTypesData,addressData,companySizeList,majorList}from '@/utils/staticData'
const { Item } = Form
const {Option}=Select
const { TextArea } = Input
interface IProps {
    graduateMediaStore:any,
    // editModalVisible:boolean,
    hideEdit:any,
    fetchData?: any;
}
interface IState {
    fileList?:any,
    upLoading:boolean,
    uploadFlag:boolean,
}

class AddOrEdit extends Component<IProps,IState> {
    formRef: React.RefObject<FormInstance>
    constructor(props: IProps){
      super(props)
      this.formRef = React.createRef<FormInstance>()
    }
    state:IState={
        fileList:[],
        upLoading:false,
        uploadFlag:false,
    }
    componentDidMount(){
        // TODO 比如灵活的年份数据，及可能的专业数据
    }
    submit=async(values:any)=>{
        if(!this.state.uploadFlag){
        //     message.warn('请上传影像')
        // }else{
        const { graduateMediaStore:{createGraduateMedia}}=this.props
        // console.log('提交影像的表单数据',values)
        var myFile = values.img.fileList[0].originFileObj;
        var formData = new FormData();
        formData.append('file', myFile);
        this.setState({
            upLoading: true
        })
        Axios({
            method: 'post',
            url: 'http://localhost:3002/api/graduateMedia/graduateMediaUp',
            data: formData,
            headers: { "Content-Type": "multipart/form-data"}
        }).then((res:any) => {
            // console.log('上传成功data',res.data)
            const {success,msg,data}=res
            let params={...values}
            delete params.img
            params.img={...data}
            // console.log('添加影像的参数',params)
            if(success){
                createGraduateMedia(params).then((response:any)=>{
                    if(response.success){
                        message.success(response.msg)
                        this.props.hideEdit()
                        this.props.fetchData()
                    }else{
                        message.error(response.msg)
                    }
                    this.setState({
                        upLoading: false
                    })
                })
                
            }else{
                message.error(msg)
            }
        })
        }
    }

    handleCancel = () => {
        this.formRef.current?.resetFields()
        this.props.hideEdit()
    }

    render(){  
        const {uploadFlag}=this.state
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
            width:800,
            title:"添加/更新毕业影像",
            onCancel:this.handleCancel,
            destroyOnClose:true,
        }
        const uploadProps = {
            // 原来组件直接上传
            // action: 'http://localhost:3002/api/graduateMedia/graduateMediaUp',   //TODO 跨域问题
            maxCount:1,
            accept:"image/png, image/jpeg",
            beforeUpload: (file:any,fileList:any) => {
                // TODO 判断文件类型、大小啥的是否符合规范？
                if(fileList.length<=0){
                    message.error(`请上传影像`);
                    this.setState({uploadFlag:true})
                }else{
                    if (file.type === 'image/png' || file.type === 'image/jpeg' ) {
                        this.setState({uploadFlag:false})
                    }else{
                        message.error(`${file.name} 非png或jpeg格式`);
                        this.setState({uploadFlag:true})
                    }
                }
            return false;   //不立刻上传
            },
            onChange: async(info:any) => {
                console.log(info.fileList);
                if(info.fileList.length<=0){
                    message.error(`请上传影像`);
                    this.setState({uploadFlag:true})
                }
                this.setState({
                    fileList: info.fileList
                })
            },
          };
        return(
            <div>
                <Modal {...modalProps} >
                    <Form ref={this.formRef} {...layout} onFinish={this.submit} >
                        <Row>
                            <Col span={21} offset={1}>
                                <div style={{color:'red',marginBottom:'15px'}}>注意：原班级存在毕业影像时，此次操作将替换原有影像！</div>
                            </Col>
                            <Col span={12}>
                                <Item label="就读身份" name="educationStatus" rules={[
                                        { required: true, message: '请选择就读身份' },
                                    ]} >
                                    <Select placeholder="请选择就读身份">
                                        <Option value='0'>本科生</Option>
                                        <Option value='1'>硕士</Option>
                                    </Select>
                                </Item>
                            </Col>
                            <Col span={12}>
                                {/* TODO 注意与救度身分的联动 */}
                                <Item label="毕业年份" name="yearOfGraduation" rules={[
                                        { required: true, message: '请选择毕业年份' },
                                    ]}  >
                                    <Select placeholder="请选择毕业年份" >
                                        {/* TODO */}
                                        <Option value="2021">2021</Option>
                                        <Option value="2020">2020</Option>
                                        <Option value="2019">2019</Option>
                                        <Option value="2018">2018</Option>
                                        <Option value="2017">2017</Option>
                                        <Option value="2016">2016</Option>
                                    </Select>
                                </Item>
                            </Col>
                            <Col span={12}>
                                <Item label="专业" name="major" rules={[
                                        { required: true, message: '请选择专业' },
                                    ]}  >
                                    <Select placeholder="请选择专业" >
                                        {/* TODO 联系本科或硕士 */}
                                    {
                                        majorList.map((item: any) => <Option value={item.value} key={item.value}>{item.label}</Option>)
                                    }
                                    </Select>
                                </Item>
                            </Col>
                            <Col span={12}>
                                <Item label="班级" name="majorClass" rules={[
                                        { required: true, message: '请输入班级' },
                                    ]}  >
                                    {/* TODO 输入还是选择？ */}
                                    <Input placeholder="请输入班级" />
                                </Item>
                            </Col>

                            <Col span={24}>
                                <Item label="毕业影像" name="img" labelCol={{span: 3}} wrapperCol={{span: 20}}rules={[
                                        { required: true, message: '请添加影像' },
                                    ]}>
                                <Upload {...uploadProps}>
                                    <Button icon={<UploadOutlined />}>请上传png或jpeg图像</Button>
                                </Upload>
                                
                                </Item>
                                {uploadFlag && <p style={{color:'red',margin:'-20px 0 0 95px'}}>请检查上传影像！</p>}
                            </Col>
                            
                        </Row>
                        
                        <Item {...tailLayout} >
                            <Button type="primary" htmlType='submit' className="mr10" loading={this.state.upLoading}>确认</Button>
                            <Button onClick={this.handleCancel} style={{marginLeft:'20px'}}>取消</Button>
                        </Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}
export default AddOrEdit;