import React, { Component } from 'react';
import { Button, Table, Modal, Form, Input, message, Select } from 'antd';
import { FormInstance } from 'antd/lib/form';
import styles from './index.module.less';
import SearchPanel from '@/components/SearchFormComp'
import { observer, inject } from 'mobx-react'
const { Item } = Form
const { Option } = Select
interface IState {
  loading: boolean,
  pageNum: number,
  pageSize: number,
  total?:number,
  searchVal?: any,
}
interface IProps {
  history?: any,
}
class SchoolCompanyManage extends Component<IProps, IState>{
  searchRef: React.RefObject<FormInstance>;
  constructor(props:IProps){
    super(props)
    this.searchRef = React.createRef();
  }
  state: IState = {
    loading: false,
    pageNum: 1,
    pageSize: 5,
    total:10,
    searchVal:{}, 
  }
  componentDidMount() {
    this.getTableData()
  }

  //获取表格数据
  getTableData=async()=>{
    
  }
  
  //重置
  handleReset=()=>{
    this.setState({pageNum: 1,searchVal:{}},()=>{
      this.getTableData()
    })
  }

  //查询
  handleQuery=(params:any)=>{
    console.log("表单的请求参数为：",params)
    this.setState({pageNum: 1,searchVal:params},()=>{
      this.getTableData()
    })
  }

  render() {
    const {pageNum,pageSize,loading,total, }=this.state
    let searchProps={
      handleReset:this.handleReset,
      handleQuery:this.handleQuery,
      onRef:(Ref:any)=> this.searchRef=Ref,
      formItems: [
        {
          el:'input',
          name:'id',
          label:"企业编号",
          placeholder:"请输入企业编号",
        },
        {el:'input',label: '企业名称' ,name:'name',placeholder: '请输入企业名称',},
        {
          el:'select',
          name:'type',
          label:"企业性质",
          placeholder:"请选择企业性质",
          style:{width: 174},
          selectOptions:[
            { label: '国有企业' ,value: 0 },
            { label: '三资企业' ,value: 1 },
            { label: '其他企业' ,value: 2 },
          ],
          selectField: {
            label: 'label',
            value: 'value'
          }
        },
        {
          el:'select',
          name:'city',
          label:"企业所在城市",
          placeholder:"请选择企业所在城市",
          style:{width: 174},
          selectOptions:[
            { label: '一个级联地点选择' ,value: 1 },
            { label: '其他' ,value: 2 },
          ],
          selectField: {
            label: 'label',
            value: 'value'
          }
        }]
    }

    let dataSource=[{
      id:'1',
      name:'qy企业',
      city:'江苏省溧阳市',
    }]

     //表格部分
     const columns = [
      {
        title: '企业编号',
        key: 'id',
        dataIndex: 'id',
      },
      {
        title: '企业名称',
        key: 'name',
        dataIndex: 'name',
      },{
        title: '企业性质',
        key: 'type',
        dataIndex: 'type',
        render:(text:any)=>{
          switch(text){
            case 0: return '国有企业';
            case 1: return '三资企业';
            case 2: return '其他企业';
            default: return text;
          }
        }
      },{
        title: '所在城市',
        key: 'city',
        dataIndex: 'city',
      },
      {
        title: '操作',
        key: 'action',
        render:(text:any, record:any, index:number)=>{
          return <span>
          <Button type="link" onClick={()=>{}}>编辑</Button>
          <Button type="link" style={{color:'red'}} onClick={()=>{}}>删除</Button> 
          </span>
        }
      },
    ]

    let pagination={
      current:pageNum,
      pageSize,
      total,
      showSizeChanger:true,
      pageSizeOptions:[5,10,20],
      showQuickJumper:true,
      showTotal:() => `共 ${total} 条数据`,
      onChange:(pageNum:number, pageSize:number)=>{
        console.log("更改页码和页面数目为，",pageNum,pageSize)
        this.setState({pageNum,pageSize})
        this.getTableData()
      },
    }

    let listProps:any={
      rowKey:'id',
      columns,
      // dataSource:[],
      dataSource,
      pagination,
      loading,
      
    }

    return (
      <div className={styles.pageCenter}>
        <div className={styles.searchPanel}>
          <SearchPanel {...searchProps}/>
        </div>
        <div className={styles.tableBeforeNode}>
          <div>
          <Button style={{margin:'0 10px 25px 10px'}} onClick={()=>{}} >
            添加校友单位
          </Button>
          <Button type='primary' onClick={()=>{}}>批量导入?</Button>
          <Button type='primary' onClick={()=>{}} style={{marginLeft:'10px'}}>批量导出?</Button>
          </div>
        </div>
        <div className={styles.searchTable}>
          <Table {...listProps}/>
        </div>
        </div>
    )
  }
};

export default SchoolCompanyManage;