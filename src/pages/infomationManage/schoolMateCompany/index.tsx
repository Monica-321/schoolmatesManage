import React, { Component } from 'react';
import { Button, Table, Modal, Form, Input, message, Select } from 'antd';
import { FormInstance } from 'antd/lib/form';
import styles from './index.module.less';
import SearchPanel from '@/components/SearchFormComp'
import InfoModal from '@/components/InfoModal'
import AddOrEdit from './addOrEdit'
import BatchExportModal from './batchExport'
import {companyTypesData} from '@/utils/staticData'
import { observer, inject } from 'mobx-react'
const { Item } = Form
const { Option } = Select
interface IState {
  loading: boolean,
  pageNum: number,
  pageSize: number,
  total?:number,
  searchVal?: any, 
  selectedRowKeys:any[],
  deleteModalVisible:boolean,
  deleteRecord?:any,
  editModalVisible:boolean,
  editRecord?:any,
  editFlag:number,
  batchExportVisible:boolean,
  // batchImportVisible:boolean,
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
    selectedRowKeys:[],
    deleteModalVisible:false,
    deleteRecord:{},
    editModalVisible:false ,
    editRecord:{},
    editFlag:0,
    batchExportVisible:false,
    // batchImportVisible:false,
  }
  componentDidMount() {
    this.getTableData()
  }

  //获取表格数据
  getTableData=async()=>{
    
  }
  refreshData = () => {
    // @ts-ignore
    this.searchRef.handleReset()
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
  //弹出编辑/创建框
  showEdit=async(record:any)=>{
    this.setState({editRecord:record,editModalVisible:true,editFlag:1})
  }

  //删除
  goDelete=()=>{
    const { deleteRecord }=this.state
      message.success(`"${deleteRecord.name}"已删除！`)
      this.getTableData()
      this.setState({deleteModalVisible:false})
  }
  //批量导出
  batchExport=()=>{
    if (!this.state.selectedRowKeys.length) {
      message.warn('请先选择需要导出的校友单位数据')
      return
    }
    this.setState({batchExportVisible: true})
  }

  render() {
    const {pageNum,pageSize,loading,total,selectedRowKeys , deleteModalVisible , deleteRecord ,
      editModalVisible, editRecord , editFlag , batchExportVisible  }=this.state
    let searchProps={
      handleReset:this.handleReset,
      handleQuery:this.handleQuery,
      onRef:(Ref:any)=> this.searchRef=Ref,
      formItems: [
        {
          el:'input',
          name:'companyId',
          label:"企业编号",
          placeholder:"请输入企业编号",
        },
        {el:'input',label: '企业名称' ,name:'companyName',placeholder: '请输入企业名称',},
        {
          el:'select',
          name:'companyType',
          label:"企业性质",
          placeholder:"请选择企业性质",
          style:{width: 174},
          selectOptions:companyTypesData,
          selectField: {
            label: 'label',
            value: 'value'
          }
        },
        {
          el:'select',
          name:'companyCity',
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
        },
        // {el:'input',label: '企业相关负责校友' ,name:'relatedSchoolMate',placeholder: '请输入',},
      ]
    }

    //fake
    let dataSource=[{
      companyId:'1',
      companyName:'qy企业',
      companyType:2,
      companyCity:'江苏省溧阳市',
      belongArea:'行业',
    }]

     //表格部分
     const columns = [
      {
        title: '企业编号',
        key: 'companyId',
        dataIndex: 'companyId',
      },
      {
        title: '企业名称',
        key: 'companyName',
        dataIndex: 'companyName',
      },{
        title: '企业性质',
        key: 'companyType',
        dataIndex: 'companyType',
        render:(text:any)=>{
          //TODO 数组那个没用
          switch(text){
            case 1: return '国有企业';
            case 2: return '三资企业';
            case 3: return '其他企业';
            default: return text;
          }
        }
      },{
        title: '主要所在城市',
        key: 'companyCity',
        dataIndex: 'companyCity',
      },{
        title:'所属行业',
        key:'belongArea',
        dataIndex:'belongArea',
      },
      {
        title: '操作',
        key: 'action',
        render:(text:any, record:any, index:number)=>{
          return <span>
          <Button type="link" onClick={()=>{this.props.history.push(`/infoManage/schoolCompanyDetail?id=${record.companyId}`)}}>查看详情</Button>
          <Button type="link" onClick={()=>{this.setState({editRecord:record,editModalVisible:true}) }}>编辑</Button>
          <Button type="link" style={{color:'red'}} onClick={()=>this.setState({deleteModalVisible:true,deleteRecord:record})}>删除</Button> 
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

    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys:any,selectedRows:any)=>{
          console.log('selectedRowKeys changed: ', selectedRowKeys);
          this.setState({ selectedRowKeys });
      },
    }
    let listProps:any={
      rowKey:'companyId',
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
        <p>是否确认删除"{deleteRecord.companyName}"校友企业？</p>
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

    return (
      <div className={styles.pageCenter}>
        <div className={styles.searchPanel}>
          <SearchPanel {...searchProps}/>
        </div>
        <div className={styles.tableBeforeNode}>
          <div>
          <Button style={{margin:'0 10px 25px 10px'}} onClick={()=>{this.setState({editRecord:{},editModalVisible:true,editFlag:0}) }} >
            添加校友单位
          </Button>
          {/* <Button type='primary' onClick={()=>{}}>批量导入?</Button> */}
          <Button type='primary' onClick={this.batchExport} style={{marginLeft:'10px'}}>批量导出</Button>
          </div>
        </div>
        <div className={styles.searchTable}>
          <Table {...listProps}/>
        </div>
        <InfoModal {...deleteModalProps}></InfoModal>
        <AddOrEdit {...editModalProps} />
        <BatchExportModal {...exportModalProps}/>

      </div>
    )
  }
};

export default SchoolCompanyManage;