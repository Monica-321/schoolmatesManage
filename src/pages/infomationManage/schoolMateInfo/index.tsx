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
import {politicalStatusData,nationList,addressData,majorMap,majorList,industryMap,industryList,graduateChoiceList} from '@/utils/staticData'
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
  // editRecord?:any,
  editFlag:any,
  batchExportVisible:boolean,
  batchImportVisible:boolean,
}
interface IProps {
  schoolMateStore?:any,
  history?: any,
}
@inject('schoolMateStore')
@observer
class SchoolMateInfoManage extends Component<IProps, IState>{
  searchRef: React.RefObject<FormInstance>;
  constructor(props:IProps){
    super(props)
    this.searchRef = React.createRef();
  }
  defaultValue=['学号', '姓名', '性别','就读身份', '院系', '专业','班级', '毕业年份']
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
    // editRecord:{},
    editFlag:'add',
    batchExportVisible:false,
    batchImportVisible:false,
  }

  componentDidMount() {
    //TODO 有些提前要查询的
    this.getTableData()
  }

  //获取表格数据
  getTableData=async()=>{
    const { schoolMateStore: { fetchTableData } } = this.props
    const {pageNum, pageSize, searchVal} = this.state
    let params:any = {
      pageNum,
      pageSize,
      ...searchVal
    }
    this.setState({loading: true})
    //TODO 传参
    await fetchTableData({})
    this.setState({loading: false})
    
  }
  
  //重置
  handleReset=()=>{
    this.setState({pageNum: 1,searchVal:{},selectedRowKeys: [],},()=>{
      this.getTableData()
    })
  }

  //查询
  handleQuery=(params:any)=>{
    //处理一下某些参数，比如城市那些、还有生日，以及是否精确查询？？
    // console.log("表单的请求参数为：",params)
    this.setState({pageNum: 1,searchVal:params,selectedRowKeys: [],},()=>{
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
  openEditModal = async(record: any,editFlag:any) => {
    // let handleRecord={...record}
    if(editFlag==='edit'){
      const {id}=record
      const {schoolMateStore: { fetchDetail }}=this.props
      await fetchDetail({id:id},true)
    }
    // 处理下编辑数据以适应填写框
    this.setState({
      editModalVisible: true,
      // curId: id,
      // editRecord:record,
      editFlag:editFlag,
    })
  }
  hideEditModal = () => {
    this.setState({
      editModalVisible: false,
      // editRecord:{},
    })
  }

  //删除
  goDelete=async()=>{
    const { schoolMateStore: {goschoolMatesDelete} } = this.props
    const { deleteRecord }=this.state
    //注意传参 TODO
    let params={}
    const res=await goschoolMatesDelete(params)
    if(res.success){
      message.success(`"${deleteRecord.name}"已删除！`)
      this.getTableData()
      this.setState({deleteModalVisible:false})
    }
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
    const {schoolMateStore}=this.props
    const {schoolMatesTableData}=schoolMateStore
    const{total,list}=schoolMatesTableData
    const {pageNum,pageSize,loading,checkedValue, selectedRowKeys , deleteModalVisible , deleteRecord ,
    editModalVisible, editFlag , batchExportVisible , batchImportVisible }=this.state
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
          selectOptions:nationList,
          selectField: {
            label: 'label',
            value: 'value'
          }
        },
        {
          el:'select',
          name:'educationStatus',
          label:"就读身份",
          placeholder:"请选择就读身份",
          style:{width: 174},
          selectOptions:[
            { label: '本科生' ,value: 0 },
            { label: '硕士' ,value: 1 },
          ],
          selectField: {
            label: 'label',
            value: 'value'
          },
        },
        {
          el:'select',
          name:'yearOfEnrollment',
          label:"入学年份",
          placeholder:"请选择入学年份",
          style:{width: 174},
          selectOptions:[
            { label: '2017' ,value: '2017' },
            { label: '2016' ,value: '2016' },
            { label: '2015' ,value: '2015' },
            { label: '2014' ,value: '2014' },
            { label: '2013' ,value: '2013' },
          ],  //TODO 注意与身份的联动
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
            { label: '2021' ,value: '2021' },
            { label: '2020' ,value: '2020' },
            { label: '2019' ,value: '2019' },
            { label: '2018' ,value: '2018' },
            { label: '2017' ,value: '2017' },
            { label: '2016' ,value: '2016' },
          ],  //TODO 注意与身份的联动
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
        {
          el:'cascader',
          name:'homeTown',
          label:"籍贯",
          placeholder:"请选择籍贯",
          style:{width: 174},
          cascaderOptions:addressData
        },
        {
          el:'cascader',
          name:'srcPlace',
          label:"生源地",
          placeholder:"请选择生源地",
          style:{width: 174},
          cascaderOptions:addressData,
        },
        {
          el:'cascader',
          name:'dstPlace',
          label:"去向城市",
          placeholder:"请选择去向城市",
          style:{width: 174},
          cascaderOptions:addressData,
        },
        {
          el:'select',
          name:'major',
          label:"专业",
          placeholder:"请选择专业",
          style:{width: 174},
          selectOptions:majorList,  //TODO 注意与身份的联动
          selectField: {
            label: 'label',
            value: 'value'
          }
        },
        {
          el:'select',
          name:'graduateChoice',
          label:"毕业去向",
          placeholder:"请选择毕业去向",
          style:{width: 174},
          selectOptions:graduateChoiceList,
          selectField: {
            label: 'label',
            value: 'value'
          }
        },
        {
          el:'select',
          name:'workArea',
          label:"从事行业",
          placeholder:"请选择从事行业",
          style:{width: 174},
          selectOptions:industryList,
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
      { id:5, label: '就读身份', value: '就读身份', disabled: false},
      { id:6, label: '政治面貌', value: '政治面貌', disabled: false},
      { id:7, label: '院系', value: '院系', disabled: false},
      { id:8, label: '专业', value: '专业', disabled: false},
      { id:9, label: '班级', value: '班级', disabled: false},
      { id:10, label: '入校年份', value: '入校年份', disabled: false},
      { id:11, label: '毕业年份', value: '毕业年份', disabled: false},
      { id:12, label: '籍贯', value: '籍贯', disabled: false},
      { id:13, label: '生源地', value: '生源地', disabled: false},
      { id:14, label: '去向城市', value: '去向城市', disabled: false},
      { id:15, label: '联系手机', value: '联系手机', disabled: false},
      { id:16, label: '联系邮箱', value: '联系邮箱', disabled: false},
      { id:17, label: '毕业去向', value: '毕业去向', disabled: false},
      { id:18, label: '从事行业', value: '从事行业', disabled: false},
    ];

    let filterProps={
      itemName:"schoolMatesCols",
      defaultValue:checkedValue,
      plainOptions,
      handleCheckChange:this.handleCheckChange,
    }

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
        title: '籍贯',
        key: 'homeTown',
        dataIndex: 'homeTown',
      },{
        title: '生源地',
        key: 'srcPlace',
        dataIndex: 'srcPlace',
      },{
        title: '去向城市',
        key: 'dstPlace',
        dataIndex: 'dstPlace',
      },{
        title: '就读身份',
        key: 'educationStatus',
        dataIndex: 'educationStatus',
        render:(text:any)=>{
          switch(text){
            case 0: return '本科生';
            case 1: return '硕士';
            default: return text;
          }
        }
      },{
        title: '院系',
        key: 'faculty',
        dataIndex: 'faculty',
      },{
        title: '专业',
        key: 'major',
        dataIndex: 'major',
        render:(text:any)=>{
          return majorMap[text] || text
        }
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
        title: '毕业去向',
        key: 'graduateChoice',
        dataIndex: 'graduateChoice',
      },{
        title: '从事行业',
        key: 'workArea',
        dataIndex: 'workArea',
        render:(text:any)=>{
          return industryMap[text]||text
          // industryList.map((item:any)=>{
          //   if(text===item.value){
          //     return item.label
          //   }
          // })  //TODO
        }
      },
      {
        title: '操作',
        key: 'action',
        // fixed: 'right',
        width:240,
        render:(text:any, record:any, index:number)=>{
          return <span>
            {/* TODO 学号或者_id都唯一 */}
          <Button type="link" onClick={()=>{this.props.history.push(`/infoManage/schoolMateInfoDetail?id=${record.id}`)}}>查看详情</Button>
          <Button type="link" onClick={
            // this.setState({editRecord:record,editModalVisible:true}) 
            this.openEditModal.bind(this,record,'edit')
            }>编辑</Button>
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
      rowKey:'_id',
      columns,
      dataSource:list,
      pagination,
      loading,
      rowSelection,
      // scroll: { x: 1000 },   //?没有滚动
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
      // editRecord,
      schoolMateStore,
      hideEdit:this.hideEditModal,
      fetchData: this.refreshData,
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
          <Button style={{margin:'0 10px 25px 10px'}} onClick={
            // this.setState({editRecord:{},editModalVisible:true,editFlag:0}) 
            this.openEditModal.bind(this,{},'add')
          }>
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
        {editModalVisible && <AddOrEdit {...editModalProps} /> }
        <BatchExportModal {...exportModalProps}/>
        <BatchImportModal {...importModalProps}/>
      </div>
    )
  }
};

export default SchoolMateInfoManage;