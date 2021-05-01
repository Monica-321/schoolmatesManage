import React, { Component } from 'react';
import { Modal, Form, Button,Table,Tooltip, message } from 'antd';
import styles from './index.module.less';
const { Item } = Form

interface IProps {
//   Store?: any;
  batchExportVisible?: boolean;
  selectedRows: any[];
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
    //导出成功
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
    },{
      title: '企业主要地址',
      key: 'companyAddress',
      dataIndex: 'companyAddress',
      render:(text:any)=>(
        text && text.length > 10
        ? <Tooltip placement="topLeft" title={text}>
            {text.substr(0, 10)}...
          </Tooltip>
        : text
      )
    },{
      title: '企业网址',
      key: 'companyWebsite',
      dataIndex: 'companyWebsite',
      render:(text:any)=>(
        text && text.length > 10
        ? <Tooltip placement="topLeft" title={text}>
            {text.substr(0, 10)}...
          </Tooltip>
        : text
      )
    },
    {
      title: '联系电话',
      key: 'companyPhone',
      dataIndex: 'companyPhone',
    },
    {
      title: '联系邮箱',
      key: 'companyEmail',
      dataIndex: 'companyEmail',
    },{
      title: '企业描述',
      key: 'companyDescription',
      dataIndex: 'companyDescription',
      render:(text:any)=>(
        text && text.length > 10
        ? <Tooltip placement="topLeft" title={text}>
            {text.substr(0, 10)}...
          </Tooltip>
        : text
      )
    },
  ]

    return (
      <div id="modalContain">
        <Modal
          title='批量导出'
          centered
          visible={batchExportVisible}
          onCancel={this.handleCancel}
          width={1200}
          closable={false}
          maskClosable={false}
          // getContainer={false}
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