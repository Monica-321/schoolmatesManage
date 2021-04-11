import React, { Component } from 'react';
import { Button, Table, Modal, Form, Input, message, Select,Descriptions } from 'antd';
import styles from '../index.module.less';
import { observer, inject } from 'mobx-react'
import {companyTypesData}from '@/utils/staticData'
const { Item } = Descriptions
const { Option } = Select
interface IState {
  loading: boolean,
  // detailID:String,
}
interface IProps {
  schoolCompanyStore?:any,
  history?: any,
  location?: any;
}
@inject('schoolCompanyStore')
@observer
class SchoolCompanyDetail extends Component<IProps, IState>{

  state: IState = {
    loading: false,
    // detailID:'',
  }

  componentDidMount() {
    const {location: {search}} = this.props
     //从url获取id
     const id = search && search.split('=')[1]
     console.log('objectid为',id)
     //请求该条数据信息
     this.getDetail(id)
  }
   
   getDetail=async(id:any)=>{
    const { schoolCompanyStore: { fetchDetail } } = this.props
    //传id获取对应详情
    let params:any = {_id:id}
    // this.setState({loading: true})
    await fetchDetail(params,false)
    // this.setState({loading: false})
  }


  render() {
    const { schoolCompanyStore: { schoolCompanyDetail } } = this.props
    const {companyId,companyName,companyType,companySize,companyCity,companyPic,belongArea,companyAddress,companyWebsite,companyPhone,companyEmail,companyDescription}=schoolCompanyDetail
    return (
      <div className={styles.pageCenter}>
      <Descriptions title={<span style={{fontSize:'23px'}}>校友企业详情</span>} bordered 
        style={{width:'95%',margin:'35px 0 30px 0'}} 
        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        contentStyle={{fontSize:'19px'}}
        labelStyle={{width:'20%',fontSize:'19px'}}
        >
          {/* TODO 没有数据的话替换成'/'，还要注意映射 */}
        {/* <Item label="企业编号">{companyId}</Item> */}
        <Item label="企业名称" span={2}>{companyName}</Item>
        <Item label="企业性质" span={2}>
          {
            companyTypesData.map((item:any)=>{
              if(companyType===item.value){
                return item.label
              }
            })
        }
        </Item>
        <Item label="企业规模" span={2}>{companySize}</Item>
        <Item label="主要所在城市" span={2}>{companyCity}</Item>
        {/* <Item label="企业图片" span={2}>{companyPic}</Item> */}
        {/* <Item label="所属行业" span={2}>{belongArea}</Item> */}
        <Item label="企业主要地址" span={4}>{companyAddress?companyAddress:'/'}</Item>
        <Item label="企业网址" span={4}>
          {/* 是否搞超链接 */}
          {companyWebsite?
          <a href={companyWebsite}>{companyWebsite}</a>
          :'/'
          }
        </Item>
        <Item label="联系电话" span={2}>{companyPhone?companyPhone:'/'}</Item>
        <Item label="联系邮箱" span={2}>
        {/* TODO 有邮件服务的话跳转发送邮件 */}
        {companyEmail?
          <a href='##'>{companyEmail}</a>
          :'/'
        }
        </Item>
        <Item label="企业描述" span={4}>{companyDescription?companyDescription:'/'}</Item>
      </Descriptions>
      <Button style={{fontSize:'17px',height:'35px'}} onClick={()=>{this.props.history.goBack()}} >返回</Button>
      </div>
    )
  }
};

export default SchoolCompanyDetail;