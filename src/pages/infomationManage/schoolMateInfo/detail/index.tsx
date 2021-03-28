import React, { Component } from 'react';
import { Button, Table, Modal, Form, Input, message, Select,Descriptions } from 'antd';
import styles from '../index.module.less';
import { observer, inject } from 'mobx-react'
const { Item } = Descriptions
const { Option } = Select
interface IState {
  loading: boolean,
  detailID:String,
}
interface IProps {
  schoolMateStore?:any,
  history?: any,
  location?: any;
}
@inject('schoolMateStore')
@observer
class SchoolMateInfoDetail extends Component<IProps, IState>{

  state: IState = {
    loading: false,
    detailID:'',
  }

  componentDidMount() {
   const {location: {search}} = this.props
    //从url获取id
    const id = search && search.split('=')[1]
    console.log('id为',id)
    this.setState({detailID:id})
    //请求该条数据信息

    this.getDetail()
  }

  getDetail=async()=>{
    const { schoolMateStore: { fetchDetail } } = this.props
    //传id获取对应详情
    let params:any = {id:this.state.detailID}
    // this.setState({loading: true})
    //TODO 传参
    await fetchDetail({})
    // this.setState({loading: false})
  }

  render() {
    //fake
    const fakeData={
      id:'1',
      name:'qy',
      gender:0,
      nationality:'汉族', //映射
      birthDate:'1999-03-21',  //标准日期格式
      politicalStatus:'共青团员', //映射
      sourcePlace:'江苏省无锡市', //映射，选择省市
      faculty:'信息学院',
      major:'数字媒体技术',
      majorClass:2,
      yearOfEnrollment:'2017',
      yearOfGraduation:'2021',
      homeTown:'江苏省溧阳市', //映射，选择省市
      contactPhone:'11',
      contactEmail:'222',
      contactAddress:'xxxxxxx',
      workArea:'信息技术行业',  //映射
      workCompany:'xxxxxx单位',
    }
    const {id,name,gender,nationality,birthDate,politicalStatus,sourcePlace,faculty,major,majorClass,
      yearOfEnrollment,yearOfGraduation,homeTown,contactPhone,contactEmail,contactAddress,workArea,workCompany}=fakeData
    return (
      <div className={styles.pageCenter}>
      <Descriptions title={<span style={{fontSize:'23px'}}>校友信息详情</span>} bordered 
        style={{width:'95%',margin:'35px 0 30px 0'}} 
        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        contentStyle={{fontSize:'19px'}}
        labelStyle={{fontSize:'19px'}}
        >
          {/* TODO 没有数据的话替换成'/'，还要注意映射 */}
        <Item label="学号">{id?id:'/'}</Item>
        <Item label="姓名">{name}</Item>
        <Item label="性别">{gender}</Item>
        <Item label="民族">{nationality}</Item>
        <Item label="出生日期">{birthDate}</Item>
        <Item label="政治面貌">{politicalStatus}</Item>
        <Item label="籍贯" span={2}>{homeTown}</Item>
        <Item label="生源地" span={2}>{sourcePlace} </Item>
        <Item label="院系">{faculty}</Item>
        <Item label="专业">{major}</Item>
        <Item label="班级">{majorClass}</Item>
        <Item label="入学年份">{yearOfEnrollment}</Item>
        <Item label="毕业年份">{yearOfGraduation}</Item>
        <Item label="联系手机">{contactPhone}</Item>
        <Item label="联系邮箱"  span={2}>
          {/* TODO 有校友服务的话跳转发送邮件 */}
          <a href='##'>{contactEmail}</a>
        </Item>
        <Item label="通讯地址"  span={4}>{contactAddress}</Item>
        <Item label="现工作行业"  span={2}>{workArea}</Item>
        <Item label="现工作单位"  span={2}>{workCompany}</Item>
      </Descriptions>
      <Button style={{fontSize:'17px',height:'35px'}} onClick={()=>{this.props.history.goBack()}} >返回</Button>
      </div>
    )
  }
};

export default SchoolMateInfoDetail;