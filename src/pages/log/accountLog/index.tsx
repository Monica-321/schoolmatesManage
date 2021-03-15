import React from 'react'
import styles from './styles.module.less'
import { DatePicker, Form, Table, Button,Modal } from 'antd'
import { FormInstance } from 'antd/lib/form'
import SearchPanel from '@/components/SearchFormComp' 
import { inject, observer } from 'mobx-react'
interface IProps {

}
interface IState {
    loading: boolean,
    showDetail: boolean,
    detail: string,
    // hasBtnLookDetail: boolean,
    pageNum:number,
    pageSize:number,
}
export default class AccountLog extends React.Component<IProps, IState> {
    searchRef: React.RefObject<FormInstance> = React.createRef<FormInstance>()
    // columns: ColumnsType<AccountLogTableRow>=AccountLogTableRow.getColumnConfig()   //??
    constructor(props: IProps){
        super(props)
        // this.props.accountLogStore.clearData()
    }
    state:IState = {
        loading: false,
        // hasBtnLookDetail: hasBtnPermission('RZ1001'),
        showDetail: false,
        detail: '',
        pageNum:1,
        pageSize:10,
    }
    componentDidMount(){
        this.fetchData()
    }
    fetchData=async()=>{
        

    }
    handleQuery = ()=>{

    }
    
    handleReset = ()=>{
        this.searchRef.current?.resetFields()
        this.handleQuery()
    }
    lookDetail(record:any){
        this.setState({
            showDetail: true,
            detail: record.errorReason
        })
    }
    detailModal(){
        const {showDetail,detail}=this.state
        return(
            <Modal title="日志详情" visible={showDetail}
                closable={false}
                footer={[
                    <Button type='primary' onClick={()=>{this.setState({showDetail: false})}} key='close'>关闭</Button>
                ]}
            >
                <div style={{textAlign: 'center'}}>{detail}</div>
            </Modal>
        )
    }
    render(){
        const {pageNum,pageSize,loading}=this.state
        const total=50 //TODO
        const dataSource=[
            {
                logNo:'0001',
                logAccount:'admin',
                logRecord:'admin登录了系统',
            },
            {
                logNo:'0002',
                logAccount:'admin1',
                logRecord:'admin1登出了系统',
            },
        ]
        const columns= [
            {
                title: '日志编号',
                dataIndex: 'logNo',
                key: 'logNo',
            },
            {
                title: '日志账号',
                dataIndex: 'logAccount',
                key: 'logAccount',
            },
            {
                title: '日志记录',
                dataIndex: 'logRecord',
                key: 'logRecord',
            },
            {
                title: '操作',
                key: 'action',
                render: (text: string, record:any)=>{
                    return(
                    <div className="linkBtnWrap">
                        <Button type="link" size="small" onClick={()=>{this.lookDetail(record)}}>查看详情</Button>
                    </div>)
                }
            }
        ]
        let pagination={
            current:pageNum,
            pageSize,
            total,
            showSizeChanger:true,
            showQuickJumper:true,
            showTotal:() => `共 ${total} 条数据`,
            onChange:(pageNum:number, pageSize:number)=>{
              this.setState({pageNum,pageSize},()=>{
                this.fetchData()
              })
            },
          }
        let searchProps={
            handleReset:this.handleReset,
            handleQuery:this.handleQuery,
            onRef:(Ref:any)=> this.searchRef=Ref,
            formItems: [
              {
                el:'rangePicker',   //TODO
                name:'logTime',
                label:"日志时间",
              }
            ]
        }
        let listProps:any={
            rowKey:'logNo',
            columns,
            dataSource,
            pagination,
            loading,
          }
        return(
            <div className={styles.pageCenter}>
               <div className={styles.searchPanel}>
                    <SearchPanel {...searchProps}/>
                </div>
                <div className={styles.searchTable}>
                    <Table {...listProps}></Table>
                </div>
                {this.detailModal()}
            </div>
            )
    }
}
