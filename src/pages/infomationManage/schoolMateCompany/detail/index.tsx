import React, { Component } from 'react';
import { Button, Table, Modal, Form, Input, message, Select,Descriptions } from 'antd';
import styles from '../index.module.less';
import { observer, inject } from 'mobx-react'
const { Item } = Descriptions
const { Option } = Select
interface IState {
  loading: boolean
}
interface IProps {
  history?: any,
  location?: any;
}
class SchoolCompanyDetail extends Component<IProps, IState>{

  state: IState = {
    loading: false
  }

  componentDidMount() {
    const {location: {search}} = this.props
     //从url获取id
     const id = search && search.split('=')[1]
     console.log('id为',id)
     //请求该条数据信息
 
   }
 

  render() {
    const fakeData={
      companyId:'1',
      companyName:'qy企业',
      companyType:2,
      companyCity:'江苏省溧阳市',
      companyPic:'',
      belongArea:'信息行业',
      companyAddress:'地址',
      companyPrincipal:'企业负责人',
      companyPhone:'联系电话',
      companyEmail:'联系邮箱',
      companyDescription:'xxxxxxxx描述xxxxxxxxxxx',
    }
    const {companyId,companyName,companyType,companyCity,companyPic,belongArea,companyAddress,companyPrincipal,companyPhone,companyEmail,companyDescription}=fakeData
    return (
      <div className={styles.pageCenter}>
      <Descriptions title={<span style={{fontSize:'23px'}}>校友企业详情</span>} bordered 
        style={{width:'95%',margin:'35px 0 30px 0'}} 
        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        contentStyle={{fontSize:'19px'}}
        labelStyle={{fontSize:'19px'}}
        >
          {/* TODO 没有数据的话替换成'/'，还要注意映射 */}
        <Item label="企业编号">{companyId}</Item>
        <Item label="企业名称">{companyName}</Item>
        <Item label="企业性质">{companyType}</Item>
        <Item label="主要所在城市">{companyCity}</Item>
        <Item label="企业图片" span={2}>{companyPic}</Item>
        <Item label="所属行业" span={2}>{belongArea}</Item>
        <Item label="企业主要地址" span={4}>{companyAddress}</Item>
        <Item label="企业负责人">{companyPrincipal}</Item>
        <Item label="联系电话">{companyPhone}</Item>
        <Item label="联系邮箱"  span={2}>
          {/* TODO 有邮件服务的话跳转发送邮件 */}
          <a href='##'>{companyEmail}</a>
        </Item>
        <Item label="企业描述" span={4}>{companyDescription}</Item>
      </Descriptions>
      <Button style={{fontSize:'17px',height:'35px'}} onClick={()=>{this.props.history.goBack()}} >返回</Button>
      </div>
    )
  }
};

export default SchoolCompanyDetail;