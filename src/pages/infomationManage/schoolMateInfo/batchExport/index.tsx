import React, { Component }from 'react';
import { Modal, Form, Button,Table,Tooltip, Cascader, message } from 'antd';
import {majorMap,industryMap,} from '@/utils/staticData'

const { Item } = Form

interface IProps {
//   Store?: any;
  batchExportVisible?: boolean;
  // selectedRowKeys?: any[];
  selectedRows:any[];
  hideModal?: any;
  afterExport?: any;
}
interface IState {
  pageNum:number,
  pageSize:number,
}
class BatchExportModal extends Component<IProps,IState> {
  constructor(props: IProps){
    super(props)
  }
  state:IState={
    pageNum:1,
    pageSize:10,
  }

  handleCancel = () => {
    this.props.hideModal()
  }
  
  onFinish = async(values: any) => {
    //导出操作，成功
    this.props.afterExport()
    this.props.hideModal()
  }
  render(){
    const { batchExportVisible, selectedRows} = this.props
    const { pageNum,pageSize} = this.state;
      
    const pagination={
        current: pageNum,
        pageSize: pageSize,
        total:selectedRows.length, //TODO
        // showQuickJumper: true,
        // showSizeChanger:false,
        onChange: (pageNum: number) => {
            this.setState({ pageNum,})
        },
    }
    const tableColumns=[
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
        title: '出生日期',
        key: 'birthDate',
        dataIndex: 'birthDate',
      },{
        title: '政治面貌',
        key: 'politicalStatus',
        dataIndex: 'politicalStatus',
      },{
        title: '籍贯',
        key: 'homeTown',
        dataIndex: 'homeTown',
        render:(text:any)=>(
          text && text.length > 4
          ? <Tooltip placement="topLeft" title={text}>
              {text.substr(0, 4)}...
            </Tooltip>
          : text
        )
      },{
        title: '生源地',
        key: 'srcPlace',
        dataIndex: 'srcPlace',
        render:(text:any)=>(
          text && text.length > 4
          ? <Tooltip placement="topLeft" title={text}>
              {text.substr(0, 4)}...
            </Tooltip>
          : text
        )
      },{
        title: '去向城市',
        key: 'dstPlace',
        dataIndex: 'dstPlace',
        render:(text:any)=>(
          text && text.length > 4
          ? <Tooltip placement="topLeft" title={text}>
              {text.substr(0, 4)}...
            </Tooltip>
          : text
        )
      },{
        title: '就读身份',
        key: 'educationStatus',
        dataIndex: 'educationStatus',
        render:(text:any)=>{
          switch(text){
            case '0': return '本科生';
            case '1': return '硕士';
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
        title: '工作行业',
        key: 'workArea',
        dataIndex: 'workArea',
        render:(text:any)=>{
          return industryMap[text]||text
        }
      },
      { dataIndex:"job",key: 'job',title:"工作岗位"},
      { dataIndex:"companyRank",key: 'companyRank',title:"公司排名"},
      { dataIndex:"companySize",key: 'companySize',title:"公司规模"},
      { dataIndex:"salary",key: 'salary',title:"毕业薪资"},
    ]
    return (
      <div id="modalContain">
        <Modal
          title='批量导出'
          centered
          visible={batchExportVisible}
          onCancel={this.handleCancel}
          width={1800}
          closable={false}
          maskClosable={false}
          getContainer={document.getElementById('modalContain')}
          footer={null}
        >
          <div style={{padding:'10px'}}>
            <Table
              columns={tableColumns} 
              rowKey='id'
              dataSource={selectedRows}
              size='small'
              pagination={pagination}
            />
            <div style={{display:'flex',justifyContent:'center',marginTop:'15px'}}>
                <Button type="primary" onClick={this.onFinish}>确认</Button>
                <Button onClick={this.handleCancel} style={{marginLeft:'10px'}}>取消</Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
export default BatchExportModal;