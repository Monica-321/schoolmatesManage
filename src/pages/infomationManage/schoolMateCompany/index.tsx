import React, { Component } from 'react';
import { Button, Table, Modal, Form, Input, message, Select } from 'antd';
import { FormInstance } from 'antd/lib/form';
import styles from './index.module.less';
import SearchPanel from '@/components/SearchFormComp'
import InfoModal from '@/components/InfoModal'
import AddOrEdit from './addOrEdit'
import BatchExportModal from './batchExport'
import {companyTypesData,companySizeList,addressData} from '@/utils/staticData'
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
  selectedRows:any[],
  deleteModalVisible:boolean,
  deleteRecord?:any,
  editModalVisible:boolean,
  editRecord?:any,
  editFlag:any,
  batchExportVisible:boolean,
  // batchImportVisible:boolean,
}
interface IProps {
  schoolCompanyStore?:any,
  history?: any,
}
@inject('schoolCompanyStore')
@observer
class SchoolCompanyManage extends Component<IProps, IState>{
  searchRef: React.RefObject<FormInstance>;
  constructor(props:IProps){
    super(props)
    this.searchRef = React.createRef();
  }
  state: IState = {
    loading: false,
    pageNum: 1,
    pageSize: 10,
    total:10,
    searchVal:{},
    selectedRowKeys:[],
    selectedRows:[],
    deleteModalVisible:false,
    deleteRecord:{},
    editModalVisible:false ,
    editRecord:{},
    editFlag:'add',
    batchExportVisible:false,
    // batchImportVisible:false,
  }
  componentDidMount() {
    this.getTableData()
  }

  //获取表格数据
  getTableData=async()=>{
    const { schoolCompanyStore: { fetchTableData } } = this.props
    const {pageNum, pageSize, searchVal} = this.state
    let params:any = {
      pageNum,
      pageSize,
      ...searchVal
    }
    this.setState({loading: true})
    //TODO 传参
    await fetchTableData(params)
    this.setState({loading: false})
  }
  refreshData = () => {
    // @ts-ignore
    this.searchRef.handleReset()
  }
  //重置
  handleReset=()=>{
    this.setState({pageNum: 1,searchVal:{},selectedRowKeys: [],selectedRows:[]},()=>{
      this.getTableData()
    })
  }

  //查询
  handleQuery=(params:any)=>{
    console.log("表单的请求参数为：",params)
    for(let key in params){
      if(params[key]==="" || params[key]===null || params[key]===undefined){
        delete params[key]
      }else if(key==='companyCity'){
        params[key]=params[key].join(' ')
      }
    }
    this.setState({pageNum: 1,searchVal:{...params},selectedRowKeys: [],selectedRows:[]},()=>{
      this.getTableData()
    })
  }
  //弹出编辑/创建框
  openEditModal = async(record: any,editFlag:any) => {
    if(editFlag==='edit'){
      const {_id}=record
      const {schoolCompanyStore: { fetchDetail }}=this.props
      await fetchDetail({_id:_id},true)
    }
    // 处理下编辑数据以适应填写框
    this.setState({
      editModalVisible: true,
      editFlag:editFlag,
    })
  }
  hideEditModal = () => {
    this.setState({
      editModalVisible: false,
    })
  }

  //删除
  goDelete=async()=>{
    const { schoolCompanyStore: {goschoolCompaniesDelete} } = this.props
    const { deleteRecord }=this.state
    //注意传参 TODO
    let params={_id:deleteRecord._id}
    const res=await goschoolCompaniesDelete(params)
    if(res.success){
      message.success(`"${deleteRecord.companyName}"已删除！`)
      this.setState({ pageNum: 1,}, () => {
        this.getTableData()
      })
      this.setState({deleteModalVisible:false})
    }else{
      message.error(res.msg)
    }
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
    const {schoolCompanyStore}=this.props
    const {schoolCompaniesTableData}=schoolCompanyStore
    const{total,list}=schoolCompaniesTableData
    const {pageNum,pageSize,loading,selectedRowKeys,selectedRows , deleteModalVisible , deleteRecord ,
      editModalVisible, editRecord , editFlag , batchExportVisible  }=this.state
    let searchProps={
      handleReset:this.handleReset,
      handleQuery:this.handleQuery,
      onRef:(Ref:any)=> this.searchRef=Ref,
      formItems: [
        // {
        //   el:'input',
        //   name:'companyId',
        //   label:"企业编号",
        //   placeholder:"请输入企业编号",
        // },
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
          name:'companySize',
          label:"企业规模",
          placeholder:"请选择企业规模",
          style:{width: 174},
          selectOptions:companySizeList,
          selectField: {
            label: 'label',
            value: 'value'
          }
        },
        {
          el:'cascader',
          name:'companyCity',
          label:"企业所在城市",
          placeholder:"请选择企业所在城市",
          style:{width: 174},
          cascaderOptions:addressData,
        },
      ]
    }

     //表格部分
     const columns = [
      // {
      //   title: '企业编号',
      //   key: 'companyId',
      //   dataIndex: 'companyId',
      // },
      {
        title: '企业名称',
        key: 'companyName',
        dataIndex: 'companyName',
      },{
        title: '企业性质',
        key: 'companyType',
        dataIndex: 'companyType',
        render:(text:any)=>{
          switch(text){
            case 1: return '国有企业';
            case 2: return '三资企业';
            case 3: return '事业单位';
            case 4: return '其他企业';
            default: return text;
          }
        }
      },{
        title: '企业规模',
        key: 'companySize',
        dataIndex: 'companySize',
      },{
        title: '主要所在城市',
        key: 'companyCity',
        dataIndex: 'companyCity',
      },
      // {
      //   title:'所属行业',
      //   key:'belongArea',
      //   dataIndex:'belongArea',
      // },
      {
        title: '联系电话',
        key: 'companyPhone',
        dataIndex: 'companyPhone',
      },
      {
        title: '联系邮箱',
        key: 'companyEmail',
        dataIndex: 'companyEmail',
      },
      {
        title: '操作',
        key: 'action',
        render:(text:any, record:any, index:number)=>{
          return <span>
          <Button type="link" onClick={()=>{this.props.history.push(`/infoManage/schoolCompanyDetail?id=${record._id}`)}}>查看详情</Button>
          <Button type="link" onClick={this.openEditModal.bind(this,record,'edit')}>编辑</Button>
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
      // pageSizeOptions:[5,10,20],
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
          this.setState({ selectedRowKeys,selectedRows });
      },
    }
    let listProps:any={
      rowKey:'companyName',
      columns,
      // dataSource:[],
      dataSource:list,
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
      // editRecord,
      schoolCompanyStore ,
      hideEdit:this.hideEditModal,
      fetchData: this.refreshData,
      // editModalVisible,
    }

    let exportModalProps = {
      // Store,
      hideModal:()=> this.setState({ batchExportVisible: false,selectedRowKeys: [],selectedRows:[]}),
      afterExport:() => this.refreshData(),
      batchExportVisible,
      // selectedRowKeys,
      selectedRows,
    }

    return (
      <div className={styles.pageCenter}>
        <div className={styles.searchPanel}>
          <SearchPanel {...searchProps}/>
        </div>
        <div className={styles.tableBeforeNode}>
          <div>
          <Button style={{margin:'0 10px 25px 10px'}} onClick={this.openEditModal.bind(this,{},'add')} >
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
        {editModalVisible && <AddOrEdit {...editModalProps} />}
        <BatchExportModal {...exportModalProps}/>

      </div>
    )
  }
};

export default SchoolCompanyManage;