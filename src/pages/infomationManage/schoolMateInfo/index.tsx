import React, { Component } from 'react';
import { Button, Table, Modal, Form, Input, message, Select } from 'antd';
import { FormInstance } from 'antd/lib/form';
import SearchPanel from '@/components/SearchFormComp'
import FilterPopover from '@/components/FilterPopover'
import styles from './index.module.less';
import { observer, inject } from 'mobx-react'
const { Item } = Form
const { Option } = Select
interface IState {
  loading: boolean,
  pageNum: number,
  pageSize: number,
  total?:number,
  searchVal?: any,
  defaultValue:any[],
  checkedValue:any[],
}
interface IProps {
  history?: any,
}
class SchoolMateInfoManage extends Component<IProps, IState>{
  searchRef: React.RefObject<FormInstance>;
  constructor(props:IProps){
    super(props)
    this.searchRef = React.createRef();
  }
  defaultValue=['学号', '姓名', '性别', '院系', '专业','班级', '毕业年份']
  state:IState = {
    loading: false,
    pageNum: 1,
    pageSize: 5,
    total:10,
    searchVal:{},  
    defaultValue:this.defaultValue,
    checkedValue:sessionStorage.getItem("schoolMatesCols")? JSON.parse(sessionStorage.getItem("schoolMatesCols")||"[]") :  this.defaultValue ,
    
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

  //表头筛选选中与否
  handleCheckChange=(data:any)=>{
    this.setState({checkedValue:data})
  }

  render() {
    const {pageNum,pageSize,loading,total,checkedValue }=this.state
    let searchProps={
      handleReset:this.handleReset,
      handleQuery:this.handleQuery,
      onRef:(Ref:any)=> this.searchRef=Ref,
      formItems: [
        {
          el:'input',
          name:'id',
          label:"学号",
          placeholder:"请输入校友学号",
        },
        {el:'input',label: '姓名' ,name:'name',placeholder: '请输入校友姓名',},
        {
          el:'select',
          name:'gender',
          label:"性别",
          placeholder:"请选择性别",
          style:{width: 174},
          selectOptions:[
            { label: '女' ,value: 0 },
            { label: '男' ,value: 1 },
          ],
          selectField: {
            label: 'label',
            value: 'value'
          }
        },
        {
          el:'select',
          name:'nationality',
          label:"民族",
          placeholder:"请选择民族",
          style:{width: 174},
          selectOptions:[
            { label: '汉族' ,value: 1 },
            { label: '其他族' ,value: 2 },
          ],
          selectField: {
            label: 'label',
            value: 'value'
          }
        },
        // {
        //   el:'select',
        //   name:'faculty',
        //   label:"学院",
        //   placeholder:"请选择学院",
        //   style:{width: 174},
        //   selectOptions:[
        //     { label: '信息学院' ,value: 1 },
        //     { label: '其他学院' ,value: 2 },
        //   ],
        //   selectField: {
        //     label: 'label',
        //     value: 'value'
        //   }
        // },
        {
          el:'select',
          name:'major',
          label:"专业",
          placeholder:"请选择专业",
          style:{width: 174},
          selectOptions:[
            { label: '数字媒体技术' ,value: 1 },
            { label: '其他专业' ,value: 2 },
          ],
          selectField: {
            label: 'label',
            value: 'value'
          }
        },
        {
          el:'select',
          name:'yearOfGraduation',
          label:"毕业年份",
          placeholder:"请选择毕业年份",
          style:{width: 174},
          selectOptions:[
            { label: '2021' ,value: 1 },
            { label: '2020' ,value: 2 },
          ],
          selectField: {
            label: 'label',
            value: 'value'
          }
        },
      ],
    }
    const plainOptions = [
      { id:1, label: '学号', value: '学号', disabled: false},
      { id:2, label: '姓名', value: '姓名', disabled: false},
      { id:3, label: '性别', value: '性别', disabled: false},
      { id:4, label: '民族', value: '民族', disabled: false},
      { id:5, label: '院系', value: '院系', disabled: false},
      { id:6, label: '专业', value: '专业', disabled: false},
      { id:7, label: '班级', value: '班级', disabled: false},
      { id:8, label: '毕业年份', value: '毕业年份', disabled: false},
      { id:9, label: '生源地', value: '生源地', disabled: false},
      { id:10, label: '联系方式(手机号)', value: '联系方式(手机号)', disabled: false},
      { id:10, label: '联系方式(邮箱)', value: '联系方式(邮箱)', disabled: false},
      // { id:11, label: '就业标志', value: '更新时间', disabled: false},
    ];

    let filterProps={
      itemName:"schoolMatesCols",
      defaultValue:checkedValue,
      plainOptions,
      handleCheckChange:this.handleCheckChange,
    }

    let dataSource=[{
      id:'1',
      name:'qy',
      gender:0,
      nationality:'汉族',
      faculty:'信息学院',
      major:'数字媒体技术',
      class:'2',
      yearOfGraduation:'2021',
      birthplace:'江苏省溧阳市',
      contactPhone:'11',
      contactEmail:'222',
    }]

     //表格部分
     const columns = [
      {
        title: '学号',
        key: 'id',
        dataIndex: 'id',
      },
      {
        title: '姓名',
        key: 'name',
        dataIndex: 'name',
      },{
        title: '性别',
        key: 'gender',
        dataIndex: 'gender',
        render:(text:any)=>{
          switch(text){
            case 0: return '女';
            case 1: return '男';
            default: return text;
          }
        }
      },{
        title: '民族',
        key: 'nationality',
        dataIndex: 'nationality',
      },{
        title: '院系',
        key: 'faculty',
        dataIndex: 'faculty',
      },{
        title: '专业',
        key: 'major',
        dataIndex: 'major',
      },{
        title: '班级',
        key: 'class',
        dataIndex: 'class',
      },{
        title: '毕业年份',
        key: 'yearOfGraduation',
        dataIndex: 'yearOfGraduation',
      },{
        title: '生源地',
        key: 'birthplace',
        dataIndex: 'birthplace',
      },
      {
        title: '联系方式(手机号)',
        key: 'contactPhone',
        dataIndex: 'contactPhone',
      },{
        title: '联系方式(邮箱)',
        key: 'contactEmail',
        dataIndex: 'contactEmail',
      },
      {
        title: '操作',
        key: 'action',
        render:(text:any, record:any, index:number)=>{
          return <span>
          <Button type="link" onClick={()=>{this.props.history.push('/infoManage/schoolMateInfoDetail')}}>查看详情</Button>
          <Button type="link" onClick={()=>{}}>编辑</Button>
          <Button type="link" style={{color:'red'}} onClick={()=>{}}>删除</Button> 
          </span>
        }
      },
    ].filter((item)=>{
      return checkedValue.includes(item.title) || item.title==='操作'
    });

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
            添加校友
          </Button>
          <Button type='primary' onClick={()=>{}}>批量导入?</Button>
          <Button type='primary' onClick={()=>{}} style={{marginLeft:'10px'}}>批量导出?</Button>
          </div>

          <FilterPopover {...filterProps} />
        </div>
        <div className={styles.searchTable}>
          <Table {...listProps}/>
        </div>
      </div>
    )
  }
};

export default SchoolMateInfoManage;