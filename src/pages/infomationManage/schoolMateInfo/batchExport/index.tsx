import React, { Component }from 'react';
import { Modal, Form, Button,Table,Tooltip, Cascader, message } from 'antd';
import {majorMap,industryMap,} from '@/utils/staticData'
import {exportColumn} from '@/utils/staticData'
import XLSX from 'xlsx'

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
  handleExportAll = () => {
    const entozh:any = exportColumn
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
      item.gender=(item.gender===0?'女':'男')
      item.educationStatus=(item.educationStatus==='0'?'本科生':'硕士')
      item.major=majorMap[item.major]
      item.workArea=industryMap[item.workArea]
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
    this.openDownloadDialog(this.sheet2blob(sheet,undefined), `校友信息.xlsx`);
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
        showSizeChanger:false,
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
                <Button type="primary" onClick={this.onFinish}>确认导出</Button>
                <Button onClick={this.handleCancel} style={{marginLeft:'10px'}}>取消</Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
export default BatchExportModal;