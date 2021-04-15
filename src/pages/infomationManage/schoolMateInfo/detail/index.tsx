import React, { Component } from 'react';
import { Button, Spin, message, Select,Descriptions } from 'antd';
import styles from '../index.module.less';
import {majorMap,industryMap} from '@/utils/staticData'
import { observer, inject } from 'mobx-react'
const { Item } = Descriptions
const { Option } = Select
interface IState {
  loading: boolean,
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
  }

  componentDidMount() {
   const {location: {search}} = this.props
    //从url获取id学号
    const id = search && search.split('=')[1]
    // console.log('id为',id)
    //请求该条数据信息
    this.getDetail(id)
  }

  getDetail=async(id:any)=>{
    const { schoolMateStore: { fetchDetail } } = this.props
    //传id获取对应详情
    let params:any = {id}
    // this.setState({loading: true})
    await fetchDetail(params,false)
    // this.setState({loading: false})
  }

  render() {
    const { schoolMateStore: { schoolMateDetail } } = this.props
    const {id,name,gender,nationality,birthDate,faculty,educationStatus,politicalStatus,
      homeTown,srcPlace,dstPlace,yearOfEnrollment,yearOfGraduation,major,majorClass,graduateChoice,
      contactPhone,contactEmail,contactAddress,workArea,job,companyRank,companySize,salary}=schoolMateDetail
    return (
      <div className={styles.pageCenter}>
        {/* <Spin spinning={this.state.loading} style={{width:'100%'}}> */}
      <Descriptions title={<span style={{fontSize:'23px'}}>校友信息详情</span>} bordered 
        style={{width:'95%',margin:'35px 0 30px 0'}} 
        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        contentStyle={{fontSize:'19px'}}
        labelStyle={{fontSize:'19px'}}
        >
          {/* TODO 没有数据的话替换成'/'?，还要注意映射 */}
        <Item label="学号">{id}</Item>
        <Item label="姓名">{name}</Item>
        <Item label="性别">{gender===0?'女':'男'}</Item>
        <Item label="民族">{nationality}</Item>
        <Item label="出生日期">{birthDate}</Item>
        <Item label="政治面貌">{politicalStatus}</Item>
        <Item label="籍贯" span={2}>{homeTown}</Item>
        <Item label="生源地" span={2}>{srcPlace} </Item>
        <Item label="去向城市" span={2}>{dstPlace} </Item>
        <Item label="就读身份">{educationStatus==='0'?'本科生':'硕士'}</Item>
        <Item label="院系">{faculty}</Item>
        <Item label="专业">{majorMap[major]}</Item>
        <Item label="班级">{majorClass}</Item>
        <Item label="入学年份">{yearOfEnrollment}</Item>
        <Item label="毕业年份">{yearOfGraduation}</Item>
        <Item label="毕业去向">{graduateChoice}</Item>
        <Item label="联系手机">{contactPhone?contactPhone:'/'}</Item>
        <Item label="联系邮箱"  span={2}>
          {/* TODO 有校友服务的话?跳转发送邮件？ */}
          <a href='##'>{contactEmail?contactEmail:'/'}</a>
        </Item>
        {/* <Item label="通讯地址"  span={4}>{contactAddress}</Item> */}
        <Item label="工作行业"  span={2}>{workArea?industryMap[workArea]:'/'}</Item>
        <Item label="工作岗位"  span={2}>{job?job:'/'}</Item>
        <Item label="公司排名"  span={2}>{companyRank?companyRank:'/'}</Item>
        <Item label="公司规模"  span={2}>{companySize?companySize:'/'}</Item>
        <Item label="毕业薪资"  span={2}>{salary?salary:'/'}</Item>
      </Descriptions>
      <Button style={{fontSize:'17px',height:'35px'}} onClick={()=>{this.props.history.goBack()}} >返回</Button>
      {/* </Spin> */}
      </div>
    )
  }
};

export default SchoolMateInfoDetail;