import React, { Component } from 'react';
import { Button, Table, Modal, Form, Input,Tooltip, message, Select ,Row,Col} from 'antd';
import { FormInstance } from 'antd/lib/form';
import styles from './index.module.less';
import SearchPanel from '@/components/SearchFormComp'
import InfoModal from '@/components/InfoModal'
import AddOrEdit from './addOrEdit'
import { observer, inject } from 'mobx-react'
const { Item } = Form
const { Option } = Select
interface IState {
  loading: boolean,
  pageNum: number,
  pageSize: number,
  total?:number,
  searchVal?: any, 
  deleteModalVisible:boolean,
  deleteRecord?:any,
  editModalVisible:boolean,
  editRecord?:any,
  editFlag:any,
  detailModalVisible:boolean,
  detailRecord?:any;
}
interface IProps {
  schoolPostStore?:any,
  history?: any,
}
@inject('schoolPostStore')
@observer
class SchoolPostsManage extends Component<IProps, IState>{
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
    deleteModalVisible:false,
    deleteRecord:{},
    editModalVisible:false ,
    editRecord:{},
    editFlag:'add',
    detailModalVisible:false,
    detailRecord:{},
  }
  componentDidMount() {
    this.getTableData()
  }

  //获取表格数据
  getTableData=async()=>{
    const { schoolPostStore: { fetchTableData } } = this.props
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
    this.setState({pageNum: 1,searchVal:{}},()=>{
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
    this.setState({pageNum: 1,searchVal:{...params}},()=>{
      this.getTableData()
    })
  }
  //弹出编辑/创建框
  openEditModal = async(record: any,editFlag:any) => {
    if(editFlag==='edit'){
      const {_id}=record
      const {schoolPostStore: { fetchDetail }}=this.props
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
    const { schoolPostStore: {goschoolPostsDelete} } = this.props
    const { deleteRecord }=this.state
    //注意传参 TODO
    let params={_id:deleteRecord._id}
    const res=await goschoolPostsDelete(params)
    if(res.success){
      message.success(`"${deleteRecord.title}"已删除！`)
      this.setState({ pageNum: 1,}, () => {
        this.getTableData()
      })
      this.setState({deleteModalVisible:false})
    }else{
      message.error(res.msg)
    }
  }

  render() {
    const {schoolPostStore}=this.props
    const {schoolPostsTableData}=schoolPostStore
    const{total,list}=schoolPostsTableData
    const {pageNum,pageSize,loading , deleteModalVisible , deleteRecord ,
      editModalVisible, editRecord , editFlag , detailModalVisible ,detailRecord }=this.state
    let searchProps={
      handleReset:this.handleReset,
      handleQuery:this.handleQuery,
      onRef:(Ref:any)=> this.searchRef=Ref,
      formItems: [
        {
          el:'input',
          name:'title',
          label:"公告标题",
          placeholder:"请输入公告标题",
        },
      ]
    }

     //表格部分
     const columns = [
      {
        title: '公告标题',
        key: 'title',
        dataIndex: 'title',
      },{
        title: '活动时间',
        key: 'time',
        dataIndex: 'time',
        render:(text:any)=>(
          text? text:'/'
        )
      },{
        title: '活动地址',
        key: 'address',
        dataIndex: 'address',
        render:(text:any)=>(
          text?(
          text.length > 15
          ? <Tooltip placement="topLeft" title={text}>
              {text.substr(0, 15)}...
            </Tooltip>
          : text
          ):'/'
        )
      },
      {
        title: '活动正文',
        key: 'context',
        dataIndex: 'context',
        render:(text:any)=>(
          text && text.length > 15
          ? <Tooltip placement="topLeft" title={text}>
              {text.substr(0, 15)}...
            </Tooltip>
          : text
        )
      },
      {
        title: '参与方式',
        key: 'method',
        dataIndex: 'method',
        render:(text:any)=>(
          text?(
          text.length > 15
          ? <Tooltip placement="topLeft" title={text}>
              {text.substr(0, 15)}...
            </Tooltip>
          : text
          ):'/'
        )
      },
      {
        title: '操作',
        key: 'action',
        render:(text:any, record:any, index:number)=>{
          return <span>
          <Button type="link" onClick={()=>this.setState({detailModalVisible:true,detailRecord:record})}>查看详情</Button>
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
        // console.log("更改页码和页面数目为，",pageNum,pageSize)
        this.setState({pageNum,pageSize},()=>{
          this.getTableData()
        })
       
      },
    }

    let listProps:any={
      rowKey:'_id',
      columns,
      dataSource:list,
      pagination,
      loading,
    }

    let deleteModalProps={
      visible:deleteModalVisible,
      title: "",
      children:<div>
        <p>是否确认删除此活动公告？</p>
        <p style={{color:'red',fontSize:'11px',margin:'10px auto'}}>注：删除后将无法恢复，需手动再添加！</p>
      </div>,
      handleOk:this.goDelete,
      handleCancel: ()=>{
        this.setState({deleteModalVisible:false})
      },
    }

    let detailModalProps={
      visible:detailModalVisible,
      title: "活动公告详情",
      width:1000,
      children:<div>
      <Row className={styles.detailShow} >
        <Col span={12}>
          <strong>公告标题：</strong>
          {detailRecord.title}
        </Col>
        <Col span={12}>
          <strong>活动时间：</strong>
          {detailRecord.time}
        </Col>
        <Col span={24}>
          <strong>活动地址：</strong>
          {detailRecord.address}
        </Col>
        <Col span={24}>
          <strong>活动正文：</strong>
          {detailRecord.context}
        </Col>
        <Col span={24}>
          <strong>参与方式：</strong>
          {detailRecord.method}
        </Col>
      </Row>
      </div>,
      isConfirmBtn:false,
      isCancelBtn:false,
      isCloseBtn:true,
      handleCancel: ()=>{
        this.setState({detailModalVisible:false})
      },
    }

    let editModalProps={
      editFlag,
      schoolPostStore ,
      hideEdit:this.hideEditModal,
      fetchData: this.refreshData,
    }

    return (
      <div className={styles.pageCenter}>
        <div className={styles.searchPanel}>
          <SearchPanel {...searchProps}/>
        </div>
        <div className={styles.tableBeforeNode}>
          <div>
          <Button style={{margin:'0 10px 25px 10px'}} onClick={this.openEditModal.bind(this,{},'add')} >
            添加活动公告
          </Button>
          </div>
        </div>
        <div className={styles.searchTable}>
          <Table {...listProps}/>
        </div>
        <InfoModal {...detailModalProps}></InfoModal>
        <InfoModal {...deleteModalProps}></InfoModal>
        {editModalVisible && <AddOrEdit {...editModalProps} />}
      </div>
    )
  }
};

export default SchoolPostsManage;