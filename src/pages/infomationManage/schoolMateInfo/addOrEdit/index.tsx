import React, { Component } from 'react';
import { Modal, Form, Input, Button, Row, Col,Select , message ,Cascader, InputNumber , DatePicker} from 'antd';
import { FormInstance } from 'antd/lib/form';
import { znEnReg , phoneReg , emailReg } from '@/utils/reg'
import moment from 'moment'
import {politicalStatusData,nationList,graduateChoiceList,addressData,majorList,industryMap,industryList,companySizeMap,companyRankMap} from '@/utils/staticData'
const { Item } = Form
const {Option}=Select
interface IProps {
    schoolMateStore?:any,
    editFlag:any,    //0添加1编辑
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
            const {schoolMateStore:{schoolMateDetail}}=this.props
            this.formRef.current?.setFieldsValue(schoolMateDetail)
        }else{
            this.formRef.current?.resetFields()
        }
    }
    checkID=async(event:any)=>{
        // console.log('id',event.target.value)
        const id=event.target.value
        const { schoolMateStore: {checkMateId} } = this.props
        const res=await checkMateId({id})
        if(res.success){
            message.success(res.msg)
        }else{
            message.error(res.msg)
        }
    }
    submit=async(values:any)=>{
        const { editFlag }=this.props
        const { schoolMateStore: {schoolMateDetail,goschoolMatesCreate,goschoolMatesModify} } = this.props
        // 处理values
        let params={...values}
        params.birthDate=moment(params.birthDate).format('YYYY-MM-DD')
        params.homeTown=params.homeTown.join(' ')
        params.srcPlace=params.srcPlace.join(' ')
        params.dstPlace=params.dstPlace.join(' ')
        params.faculty='信息学院'
        // 判断编辑还是创建
        switch(editFlag){
            case 'add': 
                {
                var res=await goschoolMatesCreate(params)
                break;}
            case 'edit': 
                {
                params.id=schoolMateDetail.id
                var res=await goschoolMatesModify(params)
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
        const { editFlag}=this.props
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
            width:1000,
            title:editFlag==='edit'?"编辑校友":'创建校友',
            onCancel:this.handleCancel,
            destroyOnClose:true,
        }
        return(
            <div>
                <Modal {...modalProps} >
                    <Form ref={this.formRef} {...layout} onFinish={this.submit} >
                        <Row>
                            <Col span={8}>
                                <Item label="学号" name="id"rules={[
                                        { required: true, message: '请填写学号' },
                                        // { pattern: znEnReg , message:'请输入中文或英文' }
                                    ]} >
                                    {editFlag==='edit'?
                                        <Input  disabled/>
                                        :
                                        <Input placeholder="请输入校友学号" onBlur={this.checkID.bind(this)} />
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
                                <Item label="民族" name="nationality" rules={[
                                        { required: true, message: '请选择民族' },
                                    ]} >
                                    <Select placeholder="请选择民族">
                                        {
                                            nationList.map((item: any) => <Option value={item.value} key={item.value}>{item.label}</Option>)
                                        }
                                    </Select>
                                </Item>
                            </Col>
                            <Col span={8}>
                                <Item label="出生日期" name="birthDate"  rules={[
                                        { required: true, message: '请选择出生日期' },
                                    ]} >
                                    <DatePicker style={{width:'100%'}} />
                                </Item>
                            </Col>
                            <Col span={8}>
                                <Item label="政治面貌" name="politicalStatus" rules={[
                                        { required: true, message: '请选择政治面貌' },
                                    ]}>
                                    <Select placeholder="请选择政治面貌">
                                    {
                                        politicalStatusData.map((item: any) => <Option value={item.value} key={item.value}>{item.label}</Option>)
                                    }
                                    </Select>
                                </Item>
                            </Col>                          
                            {/* 注意回显时的value */}
                            <Col span={8}>
                                <Item label="籍贯" name="homeTown" rules={[
                                        { required: true, message: '请选择籍贯' },
                                    ]} >
                                <Cascader
                                    placeholder="请选择籍贯"
                                    options={addressData}
                                    className='inputMarginB'
                                />
                                </Item>
                            </Col>
                            <Col span={8}>
                                <Item label="生源地" name="srcPlace" rules={[
                                        { required: true, message: '请选择生源地' },
                                    ]} >
                                    <Cascader
                                        placeholder="请选择生源地"
                                        options={addressData}
                                        className='inputMarginB'
                                    />
                                </Item>
                            </Col>
                            <Col span={8}>
                                <Item label="去向城市" name="dstPlace" rules={[
                                        { required: true, message: '请选择去向城市' },
                                    ]} >
                                    <Cascader
                                        placeholder="请选择去向城市"
                                        options={addressData}
                                        className='inputMarginB'
                                    />
                                </Item>
                            </Col>
                            <Col span={8}>
                                <Item label="就读身份" name="educationStatus" rules={[
                                        { required: true, message: '请选择就读身份' },
                                    ]} >
                                    <Select placeholder="请选择就读身份">
                                        <Option value='0'>本科生</Option>
                                        <Option value='1'>硕士</Option>
                                    </Select>
                                </Item>
                            </Col>
                            <Col span={8}>
                                <Item label="院系" name="faculty" >
                                    <Select disabled defaultValue="信息学院" >
                                        <Option value="信息学院">信息学院</Option>
                                    </Select>
                                </Item>
                            </Col>
                            <Col span={8}>
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
                            <Col span={8}>
                                <Item label="班级" name="majorClass" rules={[
                                        { required: true, message: '请输入班级' },
                                    ]}  >
                                    {/* ?TODO */}
                                    <Input placeholder="请输入班级" />
                                </Item>
                            </Col>
                            <Col span={8}>
                                <Item label="入学年份" name="yearOfEnrollment" rules={[
                                        { required: true, message: '请选择入学年份' },
                                    ]}  >
                                    {/* TODO */}
                                    <Select placeholder="请选择入学年份" >
                                        <Option value="2017">2017</Option>
                                        <Option value="2016">2016</Option>
                                        <Option value="2015">2015</Option>
                                        <Option value="2014">2014</Option>
                                        <Option value="2013">2013</Option>
                                    </Select>
                                </Item>
                            </Col>
                            <Col span={8}>
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
                            <Col span={8}>
                                <Item label="毕业去向" name="graduateChoice" rules={[
                                        { required: true, message: '请选择毕业去向' },
                                    ]}  >
                                    <Select placeholder="请选择毕业去向">
                                    {
                                        graduateChoiceList.map((item: any) => <Option value={item.value} key={item.value}>{item.label}</Option>)
                                    }
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
                            {/* 如果是非就业下面可以不用出现来着 */}
                            <Col span={8}>
                                <Item label="从事行业" name="workArea" >
                                    <Select placeholder="请选择从事行业" >
                                    {
                                        industryList.map((item: any) => <Option value={item.value} key={item.value}>{item.label}</Option>)
                                    }
                                    </Select>
                                </Item>
                            </Col>
                            {/* 岗位、规模、公司排名、薪资？ */}
                            <Col span={8}>
                                <Item label="工作岗位" name="job" >
                                   <Input placeholder="请输入工作岗位" />
                                </Item>
                            </Col>
                            <Col span={8}>
                                <Item label="公司规模" name="companySize" >
                                    <Select placeholder="请选择公司规模" >
                                    {
                                        companySizeMap.map((item: any) => <Option value={item} key={item}>{item}</Option>)
                                    }
                                    </Select>
                                </Item>
                            </Col>
                            <Col span={8}>
                                <Item label="公司排名" name="companyRank" >
                                    <Select placeholder="请选择公司排名" >
                                    {
                                        companyRankMap.map((item: any) => <Option value={item} key={item}>{item}</Option>)
                                    }
                                    </Select>
                                </Item>
                            </Col>
                            <Col span={8}>
                                <Item label="毕业薪资" name="salary" >
                                   <InputNumber style={{width:'100%'}} placeholder="请输入毕业薪资" min={0} max={9999999} />
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