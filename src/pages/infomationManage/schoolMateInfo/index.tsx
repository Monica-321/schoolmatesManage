import React, { Component } from 'react';
import { Button, Table, Modal, Form, Input, message, Select } from 'antd';
import { FormInstance } from 'antd/lib/form';
import SearchPanel from '@/components/SearchFormComp'
import FilterPopover from '@/components/FilterPopover'
import styles from './index.module.less';
import InfoModal from '@/components/InfoModal'
import AddOrEdit from './addOrEdit'
import BatchExportModal from './batchExport'
import BatchImportModal from './batchImport'
import {politicalStatusData} from '@/utils/staticData'
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
  selectedRowKeys:any[],
  deleteModalVisible:boolean,
  deleteRecord?:any,
  editModalVisible:boolean,
  editRecord?:any,
  editFlag:number,
  batchExportVisible:boolean,
  batchImportVisible:boolean,
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
    selectedRowKeys:[],
    deleteModalVisible:false,
    deleteRecord:{},
    editModalVisible:false ,
    editRecord:{},
    editFlag:0,
    batchExportVisible:false,
    batchImportVisible:false,
  }

  componentDidMount() {
    this.getTableData()
  }

  //获取表格数据
  getTableData=async()=>{
    
  }
  
  //重置
  handleReset=()=>{
    this.setState({pageNum: 1,pageSize: 10,searchVal:{},selectedRowKeys: [],},()=>{
      this.getTableData()
    })
  }

  //查询
  handleQuery=(params:any)=>{
    console.log("表单的请求参数为：",params)
    this.setState({pageNum: 1,pageSize: 10,searchVal:params,selectedRowKeys: [],},()=>{
      this.getTableData()
    })
  }

  refreshData = () => {
    // @ts-ignore
    this.searchRef.handleReset()
  }

  //表头筛选选中与否
  handleCheckChange=(data:any)=>{
    this.setState({checkedValue:data})
  }

  //弹出编辑/创建框
  showEdit=async(record:any)=>{
    this.setState({editRecord:record,editModalVisible:true,editFlag:1})
  }

  //删除
  goDelete=()=>{
    // const { warningSetStore: {goTurnOnOrOff} } = this.props
    const { deleteRecord }=this.state
    // let params={ id : closeRecord.id ,status:0}
    // const res=await goTurnOnOrOff(params)
    // if(res.success){
      message.success(`"${deleteRecord.name}"已删除！`)
      this.getTableData()
      this.setState({deleteModalVisible:false})
    // }
  }

  //批量导出
  batchExport=()=>{
    if (!this.state.selectedRowKeys.length) {
      message.warn('请先选择需要导出的校友数据')
      return
    }
    this.setState({batchExportVisible: true})
  }

  //批量导入
  batchImport=()=>{
    this.setState({batchImportVisible: true})
  }

  render() {
    const {pageNum,pageSize,loading,total,checkedValue, selectedRowKeys , deleteModalVisible , deleteRecord ,
    editModalVisible, editRecord , editFlag , batchExportVisible , batchImportVisible }=this.state
    let searchProps={
      handleReset:this.handleReset,
      handleQuery:this.handleQuery,
      onRef:(Ref:any)=> this.searchRef=Ref,
      formItems: [  //映射替换
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
        {
          el:'select',
          name:'yearOfEnrollment',
          label:"入学年份",
          placeholder:"请选择入学年份",
          style:{width: 174},
          selectOptions:[
            { label: '2017' ,value: 1 },
            { label: '2018' ,value: 2 },
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
        {
            el:'select',
            name:'politicalStatus',
            label:"政治面貌",
            placeholder:"请选择政治面貌",
            style:{width: 174},
            selectOptions:politicalStatusData,
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
          name:'homeTown',
          label:"籍贯",
          placeholder:"请选择籍贯",
          style:{width: 174},
          selectOptions:[
            { label: '选择地区啦' ,value: 1 },
          ],
          selectField: {
            label: 'label',
            value: 'value'
          }
        },
        {
          el:'select',
          name:'sourcePlace',
          label:"生源地",
          placeholder:"请选择生源地",
          style:{width: 174},
          selectOptions:[
            { label: '选择地区啦' ,value: 1 },
          ],
          selectField: {
            label: 'label',
            value: 'value'
          }
        },
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
          name:'workArea',
          label:"现从事行业",
          placeholder:"请选择从事行业",
          style:{width: 174},
          selectOptions:[
            { label: '行业' ,value: 1 },
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
      { id:5, label: '政治面貌', value: '政治面貌', disabled: false},
      { id:6, label: '院系', value: '院系', disabled: false},
      { id:7, label: '专业', value: '专业', disabled: false},
      { id:8, label: '班级', value: '班级', disabled: false},
      { id:9, label: '入校年份', value: '入校年份', disabled: false},
      { id:10, label: '毕业年份', value: '毕业年份', disabled: false},
      { id:11, label: '生源地', value: '生源地', disabled: false},
      { id:12, label: '籍贯', value: '籍贯', disabled: false},
      { id:13, label: '联系手机', value: '联系手机', disabled: false},
      { id:14, label: '联系邮箱', value: '联系邮箱', disabled: false},
      // { id:11, label: '就业标志', value: '更新时间', disabled: false},
      { id:15, label: '现从事行业', value: '现从事行业', disabled: false},
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
      nationality:'汉族', //映射
      politicalStatus:'共青团员', //映射
      sourcePlace:'江苏省无锡市', //映射，选择省市
      faculty:'信息学院',
      major:'数字媒体技术',
      majorClass:'2',
      yearOfEnrollment:'2017',
      yearOfGraduation:'2021',
      homeTown:'江苏省溧阳市', //映射，选择省市
      contactPhone:'11',
      contactEmail:'222',
      workArea:'信息技术行业',  //映射
    }]

     //表格部分,要映射
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
        title: '政治面貌',
        key: 'politicalStatus',
        dataIndex: 'politicalStatus',
      },{
        title: '生源地',
        key: 'sourcePlace',
        dataIndex: 'sourcePlace',
      },{
        title: '籍贯',
        key: 'homeTown',
        dataIndex: 'homeTown',
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
        key: 'majorClass',
        dataIndex: 'majorClass',
      },{
        title: '入校年份',
        key: 'yearOfEnrollment',
        dataIndex: 'yearOfEnrollment',
      },{
        title: '毕业年份',
        key: 'yearOfGraduation',
        dataIndex: 'yearOfGraduation',
      },
      {
        title: '联系手机',
        key: 'contactPhone',
        dataIndex: 'contactPhone',
      },{
        title: '联系邮箱',
        key: 'contactEmail',
        dataIndex: 'contactEmail',
      },{
        title: '现从事行业',
        key: 'workArea',
        dataIndex: 'workArea',
      },
      {
        title: '操作',
        key: 'action',
        render:(text:any, record:any, index:number)=>{
          return <span>
          <Button type="link" onClick={()=>{this.props.history.push(`/infoManage/schoolMateInfoDetail?id=${record.id}`)}}>查看详情</Button>
          <Button type="link" onClick={()=>{this.setState({editRecord:record,editModalVisible:true}) }}>编辑</Button>
          <Button type="link" style={{color:'red'}} onClick={()=>this.setState({deleteModalVisible:true,deleteRecord:record})}>删除</Button> 
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
      // pageSizeOptions:[5,10,20],
      showQuickJumper:true,
      showTotal:() => `共 ${total} 条数据`,
      onChange:(pageNum:number, pageSize:number)=>{
        // console.log("更改页码和页面数目为，",pageNum,pageSize)
        this.setState({pageNum,pageSize},()=>{
          this.getTableData()
        })
      },
    }
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys:any,selectedRows:any)=>{
          console.log('selectedRowKeys changed: ', selectedRowKeys);
          this.setState({ selectedRowKeys });
      },
    }
    let listProps:any={
      rowKey:'id',
      columns,
      // dataSource:[],
      dataSource,
      pagination,
      loading,
      rowSelection,
    }

    let deleteModalProps={
      visible:deleteModalVisible,
      title: "",
      children:<div>
        <p>是否确认删除"{deleteRecord.name}"校友？</p>
        <p style={{color:'red',fontSize:'11px',margin:'10px auto'}}>注：删除后将无法恢复，需手动再添加！</p>
      </div>,
      handleOk:this.goDelete,
      handleCancel: ()=>{
        this.setState({deleteModalVisible:false})
      },
    }

    let editModalProps={
      editFlag,
      editRecord,
      // warningContactStore ,
      hideEdit:()=>{
        this.setState({editRecord:{},editModalVisible:false},()=>{
          this.getTableData()
        })
      },
      editModalVisible,
    }

    let exportModalProps = {
      // Store,
      hideModal:()=> this.setState({ batchExportVisible: false,selectedRowKeys: []}),
      afterExport:() => this.refreshData(),
      batchExportVisible,
      selectedRowKeys,
    }
    let importModalProps = {
      // Store,
      hideModal:()=> this.setState({ batchImportVisible: false}),
      afterImport:() => this.refreshData(),
      batchImportVisible,
    }

    return (
      <div className={styles.pageCenter}>
        <div className={styles.searchPanel}>
          <SearchPanel {...searchProps}/>
        </div>
        <div className={styles.tableBeforeNode}>
          <div>
          <Button style={{margin:'0 10px 25px 10px'}} onClick={()=>{this.setState({editRecord:{},editModalVisible:true,editFlag:0}) }} >
            添加校友
          </Button>
          <Button type='primary' onClick={this.batchImport}>批量导入</Button>
          <Button type='primary' onClick={this.batchExport} style={{marginLeft:'10px'}}>批量导出</Button>
          </div>

          <FilterPopover {...filterProps} />
        </div>
        <div className={styles.searchTable}>
          <Table {...listProps}/>
        </div>
        <InfoModal {...deleteModalProps}></InfoModal>
        <AddOrEdit {...editModalProps} />
        <BatchExportModal {...exportModalProps}/>
        <BatchImportModal {...importModalProps}/>
      </div>
    )
  }
};

export default SchoolMateInfoManage;