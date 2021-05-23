import React, { Component } from 'react';
import { Modal, Form, Button,Table,Tooltip, message } from 'antd';
import styles from './index.module.less';
import {exportColumn2} from '@/utils/staticData'
import XLSX from 'xlsx'

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
  handleExportAll = () => {
    const entozh:any = exportColumn2
    let newData = JSON.parse(JSON.stringify(this.props.selectedRows));
    // const nowdata = [...this.props.selectedRows];
    let nowdata:any=[]
    //处理部分数据
    newData.map((item:any)=>{
      if(Object.keys(item).includes("_id")){
        delete item._id
      } 
      if(Object.keys(item).includes("__v")){
        delete item.__v
      }
      //替换对应
      switch(item.companyType){
        case 1: item.companyType='国有企业';break;
        case 2: item.companyType= '三资企业';break;
        case 3: item.companyType= '事业单位';break;
        case 4: item.companyType= '其他企业';break;
        default: break;
      }
      nowdata.push(item)
    })
    // console.log('nowdata',nowdata)
    const json = nowdata.map((item:any) => {
      return Object.keys(item).reduce((newData:any, key:any) => {
        const newKey = entozh[key] || key
        newData[newKey] = item[key]
        return newData
      }, {})
    });
    // console.log('json',json)
    const sheet = XLSX.utils.json_to_sheet(json);
    this.openDownloadDialog(this.sheet2blob(sheet,undefined), `校友企业信息.xlsx`);
}
openDownloadDialog = (url:any, saveName:string) => {
    if (typeof url == 'object' && url instanceof Blob) {
      url = URL.createObjectURL(url); // 创建blob地址
    }
    var aLink = document.createElement('a');
    aLink.href = url;
    aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
    var event;
    if (window.MouseEvent) event = new MouseEvent('click');
    else {
      event = document.createEvent('MouseEvents');
      event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    }
    aLink.dispatchEvent(event);
}
sheet2blob = (sheet:any, sheetName:any) => {
    sheetName = sheetName || 'sheet1';
    var workbook:any = {
      SheetNames: [sheetName],
      Sheets: {}
    };
    workbook.Sheets[sheetName] = sheet; // 生成excel的配置项

    var wopts:any = {
      bookType: 'xlsx', // 要生成的文件类型
      bookSST: false, // 是否生成Shared String Table
      type: 'binary'
    };
    var wbout = XLSX.write(workbook, wopts);
    var blob = new Blob([s2ab(wbout)], {
      type: "application/octet-stream"
    }); // 字符串转ArrayBuffer
    function s2ab(s:any) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    }

    return blob;
}
  onFinish = async(values: any) => {
    this.handleExportAll()
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