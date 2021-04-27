import React, { Component } from 'react';
import {excelColumn} from '@/utils/staticData'
import XLSX from 'xlsx'
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
  data?:any,
  fileList?:any,
}
class BatchImportModal extends Component<IProps,IState> {
  constructor(props: IProps){
    super(props)
  }
  state:IState={
    nextVisible:false,
    pageNum:1,
    pageSize:10,
    data:[],
    fileList:[],
  }

  //导入模板
  downImport=()=>{
    window.location.href="http://localhost:3002/static/template.xlsx" ; 
  }

  handleImpotedJson = (array:any, file:any) => {
       
    const header = array[0];//头部数据 ["姓名",...]
    const entozh = this.formatTitleOrFileld('title', 'dataIndex');//将表字段数组形式转化为对象形式,如：{"姓名":"name",...}
    const firstRow:any =[]
    header.map((item:any) => {
      firstRow.push(entozh[item])
    });//映射，可以获取到行属性 ["name",...]
    
    const newArray = [...array];

    newArray.splice(0, 1);//去除表头

    const json = newArray.map((item, index) => {
        const newitem :any= {};
        item.forEach((im:any, i:number) => {
            const newKey = firstRow[i] || i;
            newitem[newKey] = im
        })
        return newitem;
    });//将存在表头定义字段的值赋值

    const formatData = [...json]
    // const formatData =json.map(item => ({
    //     id: item.id,
    //     name: item.name,
    //     gender: item.gender,
    // }))
    //筛选出自己需要的属性，不用筛选了
    console.log('操作过程中的header,entozh,firstRow,array,newArray',header,entozh,firstRow,array,newArray)
    this.setState({ data: formatData, fileList: [file] },()=>{
      console.log("json,data,fileList",json,this.state.data,this.state.fileList)
    });

    return formatData;
  }

  formatTitleOrFileld = (a:string, b:string) => {
    const columns=excelColumn
    const entozh:any = {};
    columns.forEach((item:any) => {
        entozh[item[a]] = item[b]
    })
    return entozh;
  }


  //下一步/预览
  goNext=async(values:any)=>{
    //TODO 判断有无文件上传
    this.props.hideModal()
    this.setState({nextVisible:true})
  }

  submitImport=()=>{
    //批量提交
    this.setState({nextVisible:false})
    this.props.afterImport()
  }

  nextModal(){
    const { pageNum,pageSize,data} = this.state;
    
    const pagination={
        current: pageNum,
        pageSize: pageSize,
        total:data.length, //TODO
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
      },{
        title: '院系',
        key: 'faculty',
        dataIndex: 'faculty',
      },{
        title: '专业',
        key: 'major',
        dataIndex: 'major',
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
      },
      { dataIndex:"job",key: 'job',title:"工作岗位"},
      { dataIndex:"companyRank",key: 'companyRank',title:"公司排名"},
      { dataIndex:"companySize",key: 'companySize',title:"公司规模"},
      { dataIndex:"salary",key: 'salary',title:"毕业薪资"},
    ]

    return(
        <Modal 
            visible={this.state.nextVisible} 
            title='预览导入数据'
            centered={true}
            width={1800}
            closable={false}
            // getContainer={false}
            footer={null}
            onCancel={this.nextCancel}
        >
          <div style={{padding:'10px'}}>
              <Table
                  columns={tableColumns} 
                  rowKey='id'
                  dataSource={data}
                  size='small'
                  pagination={pagination}
              />
              <div style={{display:'flex',justifyContent:'center',marginTop:'15px'}}>
                  <Button type="primary" onClick={this.submitImport}>确认导入</Button>
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
  const {fileList}=this.state
    
  const uploadProps={
    limit:1,
    onRemove: (file:any) => {
        this.setState({
            data:[],
            fileList:[]
        });
    },
    accept: ".xls,.xlsx,application/vnd.ms-excel",
    beforeUpload: (file:any) => {
        const _this=this;
        const f = file;
        const reader = new FileReader();
        reader.onload = function (e) {
          const datas = e.target?.result;
          const workbook = XLSX.read(datas, {
              type: 'binary'
          });//尝试解析datas
          const first_worksheet = workbook.Sheets[workbook.SheetNames[0]];//是工作簿中的工作表的有序列表
          const jsonArr = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 });//将工作簿对象转换为JSON对象数组
          let newArr:any=[]
          jsonArr.map((item:any)=>{
            if(item.length!=0) newArr.push(item)
          })
          // console.log('jsonArr',jsonArr,newArr)  //多很多个空的，不知道原因
          _this.handleImpotedJson(newArr, file);
        };
        reader.readAsBinaryString(f);
        return false;
    },
    fileList,
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
          <div style={{marginBottom:'10px'}}>
            <span style={{color:'red',margin:'0 10px 0 5px'}}>请按照模板导入！</span>
            <a onClick={this.downImport} style={{textDecoration:'underline'}}>下载导入模板</a>
          </div>
            <Dragger {...uploadProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">请点击此处或拖拽文件以上传</p>
              <p className="ant-upload-hint">请上传excel文件</p>
            </Dragger>
            {/* <Upload {...uploadProps}>
                <Button type="primary" >Excel导入</Button>
            </Upload> */}
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