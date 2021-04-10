import React, { Component } from 'react';
import { Table, Button, Switch, Tooltip, message } from 'antd';
import SearchPanel from '@/components/SearchFormComp'
import InfoModal from '@/components/InfoModal'
import EditAccount from './components/EditAccount'
import styles from './index.module.less';
import { observer, inject } from 'mobx-react'
interface IProps {
  accountStore?:any,
  history?: any;
}
interface IState {
  hasBtnAdd: boolean;
  hasBtnEdit: boolean;
  // hasBtnRST: boolean;
  hasBtnOPEN_CLOSE: boolean;
  loading: boolean;
  pageNum: number;
  pageSize: number;
  searchVal?: any;
  visibleAdd: boolean;
  visibleEdit: boolean;
  curId?: string;
  deleteModalVisible:boolean,
  deleteRecord?:any,
  action:string,
  editRecord:any,
}

@inject('accountStore')
@observer
class AccountManage extends Component<IProps,IState> {
  private searchRef: React.RefObject<HTMLDivElement>;
  constructor(prop: IProps){
    super(prop)
    this.searchRef = React.createRef();
  }
  state = {
    hasBtnAdd: true,
    hasBtnEdit: true,
    // hasBtnRST: true,  //重置密码
    hasBtnOPEN_CLOSE: true,
    loading: false,
    pageNum: 1,
    pageSize: 10,
    searchVal: {},
    visibleAdd: false,
    visibleEdit: false,
    curId: '',
    deleteModalVisible:false,
    deleteRecord:{},
    action:'',
    editRecord:{},
  }
  componentDidMount() {
    this.getAccountList()
  }
  getAccountList = async ()=> {
    const { accountStore: { fetchTableData } } = this.props
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
  refreshData = () => {
    // @ts-ignore
    this.searchRef.handleReset()
  }
  handleReset = () => {
    this.setState({
      pageNum: 1,
      pageSize: 10,
      searchVal: {}
    }, () => {
      this.getAccountList()
    }) 
  }
  handleQuery = (params: any) =>{
    this.setState({
      pageNum: 1,
      searchVal: {...params}
    }, () => {
      this.getAccountList()
    })
  }
  goDelete = async () => {
    const { accountStore: {goAdminsDelete} } = this.props
    const { deleteRecord }=this.state
    //注意传参 TODO
    let params={}
    const res=await goAdminsDelete(params)
    if(res.success){
      // @ts-ignore
      message.success(`"${deleteRecord.username}"删除成功！`)
      this.getAccountList()
      this.setState({deleteModalVisible:false})
    }else{
      message.error(res.msg)
    }
  }
  changeStatus = async (checked: boolean,record:any) => {
    const { accountStore: {goOnOrOff} } = this.props
    let params={
      // id:record.id,
      // status:checked?1:0
    }
    await goOnOrOff(params)
    //TODO 目前不产生提醒
    this.getAccountList()
  }
  openEditModal = async(record: any,action:string) => {

    this.setState({
      visibleEdit: true,
      // curId: id,
      editRecord:record,
      action:action,
    },()=>{
      console.log("editRecord,action分别为",this.state.editRecord,this.state.action)
    })
  }
  // openAddModal = () => {
  //   this.setState({
  //     visibleAdd: true,
  //   })
  // }
  // hideAddModal = () => {
  //   this.setState({
  //     visibleAdd: false,
  //   })
  // }
  hideEditModal = () => {
    this.setState({
      visibleEdit: false,
      editRecord:{},
    })
  }
  render(){
    const { accountStore }=this.props
    const {adminsTableData} = accountStore
    // const tableData = {
    //   total:22,
    //   list:[
    //     {
    //       name:'账户名1',
    //       username:'用户名1',
    //       identity:0,
    //       status:0,
    //     },
    //     {
    //       name:'账户名2',
    //       username:'用户名2',
    //       identity:1,
    //       status:1,
    //     },
    //     {
    //       name:'账户名3',
    //       username:'用户名3',
    //       identity:1,
    //       status:0,
    //     }
    //   ]
    // }
    const { total, list } = adminsTableData
    const {pageNum,pageSize,deleteModalVisible , deleteRecord , visibleAdd, curId, visibleEdit, loading , action,editRecord} = this.state
    const columns = [
    // {
    //   key: 'name',
    //   title: '账户名称',
    //   dataIndex: 'name'
    // }, 
    {
      key: 'username',
      title: '用户名',
      dataIndex: 'username',
    }, {
      key: 'identity',
      title: '账户类型',
      dataIndex: 'identity',
      render:(text:any, record: any)=>{
        switch(text){
          case 0: return '超级管理员' ;
          case 1: return '管理员';
          default:return text;
        }
      }
    },  
    // {
    //   key: 'createTime',
    //   title: '创建时间',
    //   dataIndex: 'createTime',
    //   // sorter: true,
    // }, 
    {
      key: 'status',
      title: '启用状态',
      dataIndex: 'status',
      render: (text:any, record: any) => {
        return (
          <Switch defaultChecked={!!text} disabled={ record.identity===0 } onChange={(checked:boolean)=>{this.changeStatus(checked,record)} } />
        )
      }
    },
    {
      key: 'phone',
      title: '关联手机号',
      dataIndex: 'phone',
    }, 
    {
      key: 'email',
      title: '关联邮箱号',
      dataIndex: 'email',
    }, 
    {
      title: '操作',
      key: 'action',
      render: (text: any, record: any) => (
        <div className="linkBtnWrap">
          {/* 重置密码功能？ */}
          {record.identity===1 && <Button type="link" onClick={this.openEditModal.bind(this,record,'edit')}>编辑</Button>}
          {record.identity===1 && <Button type="link" style={{color:'red'}} onClick={()=>this.setState({deleteModalVisible:true,deleteRecord:record})}>删除</Button>}
        </div>
      )
    }]
    let pagination = {
      current: pageNum,
      pageSize: pageSize,
      total,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal() {
        return `共 ${total} 条数据`
      },
      onChange:(pageNum:number, pageSize:number)=>{
        // console.log("更改页码和页面数目为，",pageNum,pageSize)
        this.setState({pageNum,pageSize},()=>{
          this.getAccountList()
        })
      },
    }
    let listProps:any = {
      rowKey: "_id",
      dataSource: list,
      columns,      
      pagination,
      loading
    }
    let searchProps:any = {
      handleQuery: this.handleQuery,
      handleReset: this.handleReset,
      onRef: (ref: any) => this.searchRef = ref,
      formItems: [
        {el:'input',label: '用户名' ,name:'username',placeholder: '用户名',},
        {
          el:'select',
          name:'identity',
          label:"账户类型",
          placeholder:"请选择账户类型",
          style:{width: 174},
          selectOptions:[
            { label: '超级管理员' ,value: 0 },
            { label: '管理员' ,value: 1 },
          ],
          selectField: {
            label: 'label',
            value: 'value'
          }
        },
      ],
    }
    let deleteModalProps={
      visible:deleteModalVisible,
      title: "",
      children:
      <div>
        {/* @ts-ignore */}
        <p>是否确认删除"{deleteRecord.username}"管理员？</p>
        <p style={{color:'red',fontSize:'11px',margin:'10px auto'}}>注：删除后将无法恢复，需手动再添加！</p>
      </div>,
      handleOk:this.goDelete,
      handleCancel: ()=>{
        this.setState({deleteModalVisible:false})
      },
    }
    // let addModalProps = {

    //   hideModal: this.hideAddModal,
    //   fetchData: this.refreshData,
    //   visibleAdd
    // }
    let EditModalProps = {
      accountStore,
      hideModal: this.hideEditModal,
      fetchData: this.refreshData,
      // visibleEdit,
      // curId,
      action,
      editRecord,
    }
    return (
      <div className={styles.pageCenter}>
        <div className={styles.searchPanel}>
          <SearchPanel {...searchProps}/>
        </div>
        <div className={styles.tableBeforeNode}>
          <Button type="primary"onClick={this.openEditModal.bind(this,{},'add')} className='mb10'>创建帐号</Button>
        </div>
        <div className={styles.searchTable}>
          <Table {...listProps}/>
        </div>
        <InfoModal {...deleteModalProps}></InfoModal>
        {/* <AddAccount {...addModalProps}/> */}
        {visibleEdit && <EditAccount {...EditModalProps}/>}
      </div>
    );
  }
}
export default AccountManage;
