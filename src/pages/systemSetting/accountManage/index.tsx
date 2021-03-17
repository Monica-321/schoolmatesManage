import React, { Component } from 'react';
import { Table, Button, Switch, Tooltip, message } from 'antd';
import SearchPanel from '@/components/SearchFormComp'
import AddAccount from './components/AddAccount'
import EditAccount from './components/EditAccount'
import styles from './index.module.less';
import { observer, inject } from 'mobx-react'
interface IProps {
  //store
  history: any;
}
interface IState {
  hasBtnAdd: boolean;
  hasBtnEdit: boolean;
  hasBtnRST: boolean;
  hasBtnOPEN_CLOSE: boolean;
  loadingTable: boolean;
  pageNum: number;
  pageSize: number;
  sortRule?: string;
  searchVal?: any;
  visibleAdd: boolean;
  visibleEdit: boolean;
  curId?: string;
}
class AccountManage extends Component<IProps,IState> {
  private searchRef: React.RefObject<HTMLDivElement>;
  constructor(prop: IProps){
    super(prop)
    this.searchRef = React.createRef();
  }
  state = {
    hasBtnAdd: true,
    hasBtnEdit: true,
    hasBtnRST: true,  //重置密码
    hasBtnOPEN_CLOSE: true,
    loadingTable: false,
    pageNum: 1,
    pageSize: 10,
    sortRule: 'DESC',
    searchVal: {},
    visibleAdd: false,
    visibleEdit: false,
    curId: '',
  }
  componentDidMount() {
    this.getAccountList()
  }
  getAccountList = async ()=> {
    
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
  resetPwd = async (item: any) => {
    
      message.success(`“${item.name}”账号密码重置成功！`)
  }
  changeStatus = async (item: any) => {
    
  }
  openEditModal = async(id: any) => {

    this.setState({
      visibleEdit: true,
      curId: id
    })
  }
  openAddModal = () => {
    this.setState({
      visibleAdd: true,
    })
  }
  hideAddModal = () => {
    this.setState({
      visibleAdd: false,
    })
  }
  hideEditModal = () => {
    this.setState({
      visibleEdit: false,
    })
  }
  refresh = () => {

  }
  render(){
    const tableData = {
      total:22,
      list:[
        {
          name:'账户名1',
          username:'用户名1',
          type:1,
          status:0,
        },
        {
          name:'账户名2',
          username:'用户名2',
          type:2,
          status:1,
        },
        {
          name:'账户名3',
          username:'用户名3',
          type:2,
          status:0,
        }
      ]
    }
    const { total, list } = tableData
    const {hasBtnAdd, hasBtnEdit, hasBtnRST, hasBtnOPEN_CLOSE, pageNum, pageSize, visibleAdd, curId, visibleEdit, loadingTable} = this.state
    const columns = [{
      key: 'name',
      title: '账户名称',
      dataIndex: 'name'
    }, {
      key: 'username',
      title: '用户名',
      dataIndex: 'username'
    }, {
      key: 'type',
      title: '账户类型',
      dataIndex: 'type',
      render:(text:any, record: any)=>{
        switch(text){
          case 1: return '超级管理员' ;
          case 2: return '管理员';
          default:return text;
        }
      }
    },  {
      key: 'createTime',
      title: '创建时间',
      dataIndex: 'createTime',
      // sorter: true,
    }, {
      key: 'status',
      title: '状态',
      dataIndex: 'status',
      render: (text:any, record: any) => {
        return (
          <Switch defaultChecked={!!text} disabled={ record.type===1 } onChange={this.changeStatus.bind(this, record)} />
        )
      }
    }, {
      title: '操作',
      key: 'action',
      render: (text: any, record: any) => (
        <div className="linkBtnWrap">
          {hasBtnRST && record.type===2 && <Button type="link" onClick={this.resetPwd.bind(this, record)}>重置密码</Button>}
          {hasBtnEdit && record.type===2 && <Button type="link" onClick={this.openEditModal.bind(this, record.id)}>编辑</Button>}
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
      onChange: (pageNum: number) => {
        this.setState({ pageNum }, () => {
          this.getAccountList()
        })
      },
      onShowSizeChange: (current: number, pageSize: number) => {
        this.setState({ pageNum: current,  pageSize }, () => {
          this.getAccountList()
        })
      }
    }
    let listProps:any = {
      dataSource: list,
      columns,
      rowKey: 'id',
      pagination,
      loading: loadingTable,
      onChange: (pagination:any, filters: any, sorter: any) => {
        console.log(sorter, 'sorter')
        let sortRule = sorter.order === 'ascend' ? 'ASC' : (sorter.order === 'descend' ? 'DESC' : undefined)
        this.setState({ sortRule }, () => {
          this.getAccountList()
        })
      }
    }
    let searchProps:any = {
      handleQuery: this.handleQuery,
      handleReset: this.handleReset,
      onRef: (ref: any) => this.searchRef = ref,
      formItems: [
        {el:'input',label: '账户名称' ,name:'accountName',placeholder: '请输入账户名称',},
        {
          el:'select',
          name:'accountType',
          label:"账户类型",
          placeholder:"请选择账户类型",
          style:{width: 174},
          selectOptions:[
            { label: '超级管理员' ,value: 1 },
            { label: '管理员' ,value: 2 },
          ],
          selectField: {
            label: 'label',
            value: 'value'
          }
        },
      ],
    }
    let addModalProps = {

      hideModal: this.hideAddModal,
      fetchData: this.refreshData,
      visibleAdd
    }
    let EditModalProps = {

      hideModal: this.hideEditModal,
      fetchData: this.refreshData,
      // visibleEdit,
      curId
    }
    return (
      <div className={styles.pageCenter}>
        <div className={styles.searchPanel}>
          <SearchPanel {...searchProps}/>
        </div>
        <div className={styles.tableBeforeNode}>
          {hasBtnAdd && <Button type="primary" onClick={this.openAddModal} className='mb10'>创建帐号</Button>}
        </div>
        <div className={styles.searchTable}>
          <Table {...listProps}/>
        </div>
        <AddAccount {...addModalProps}/>
        {visibleEdit && <EditAccount {...EditModalProps}/>}
      </div>
    );
  }
}
export default AccountManage;
