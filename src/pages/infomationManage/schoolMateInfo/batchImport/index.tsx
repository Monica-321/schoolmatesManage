import React, { Component } from 'react';
import { Modal, Form, Button, Table, message , Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
const { Dragger } = Upload;
const { Item } = Form

interface IProps {
//   Store?: any;
  batchImportVisible?: boolean;
  hideModal?: any;
  afterImport?: any;
}
interface IState {
  nextVisible:boolean,
  pageNum:number,
  pageSize:number,
}
class BatchImportModal extends Component<IProps,IState> {
  constructor(props: IProps){
    super(props)
  }
  state:IState={
    nextVisible:false,
    pageNum:1,
    pageSize:10,
  }

  //下一步/预览
  goNext=async(values:any)=>{
    //TODO 判断有无文件上传
    this.props.hideModal()
    this.setState({nextVisible:true})
  }

  submitImport=()=>{
    //提交
    this.setState({nextVisible:false})
    this.props.afterImport()
  }

  nextModal(){
    const { pageNum,pageSize} = this.state;
    
    const pagination={
        current: pageNum,
        pageSize: pageSize,
        total:20, //TODO
        // showQuickJumper: true,
        // showSizeChanger:false,
        onChange: (pageNum: number) => {
            this.setState({ pageNum,})
        },
    }
    const tableColumns=[
        {
          title: '校友姓名',
          dataIndex: 'name',
        },
        {
          title: '性别',
          dataIndex: 'gender',
        },
    ]

    return(
        <Modal 
            visible={this.state.nextVisible} 
            title='预览导入数据'
            centered={true}
            width={1000}
            closable={false}
            // getContainer={false}
            footer={null}
            onCancel={this.nextCancel}
        >
          <div style={{padding:'10px'}}>
              <Table
                  columns={tableColumns} 
                  rowKey='id'
                  dataSource={[]}
                  size='small'
                  pagination={pagination}
              />
              <div style={{display:'flex',justifyContent:'center',marginTop:'15px'}}>
                  <Button type="primary" onClick={this.submitImport}>确认</Button>
                  <Button onClick={this.nextCancel} style={{marginLeft:'10px'}}>取消</Button>
              </div>
          </div>
        </Modal>
    )
}

  //取消1
  handleCancel = () => {
    this.props.hideModal()
  }
  //取消2
  nextCancel=()=>{
    this.setState({nextVisible:false})
  }
  render(){  
    const { batchImportVisible} = this.props
    const uploadProps = {
      name: 'file',
      multiple: true,
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      onChange:(info:any)=>{
        const { status } = info.file;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    return (
      <div>
        <Modal
          title='批量导入'
          centered
          visible={batchImportVisible}
          onCancel={this.handleCancel}
          width={530}
          closable={false}
          maskClosable={false}
          getContainer={false}
          footer={null}
        >
            <Dragger {...uploadProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">请点击此处或拖拽文件以上传</p>
              <p className="ant-upload-hint">请上传excel文件</p>
            </Dragger>
            <div style={{display:'flex',justifyContent:'center',marginTop:'15px'}}>
              <Button type="primary" onClick={this.goNext}>下一步</Button>
              <Button onClick={this.handleCancel} style={{marginLeft:'10px'}}>取消</Button>
            </div>
        </Modal>
        {this.nextModal()}
      </div>
    );
  }
}
export default BatchImportModal;