import React , {Component, Fragment} from 'react';
import SearchPanel from '@/components/SearchFormComp' 
import { FormInstance } from 'antd/lib/form'
import { message, Form, Table, Button,Modal ,Tabs, Row, Col} from 'antd'
import { ZoomInOutlined , DeleteOutlined } from '@ant-design/icons';
import AddOrEdit from './addOrEdit'
import InfoModal from '@/components/InfoModal'
import styles from './index.module.less';
import { observer, inject } from 'mobx-react'
import {majorMap,majorList,major0,major1} from '@/utils/staticData'

const {TabPane}=Tabs
interface IProps {
  graduateMediaStore?:any;
  history?: any,
}
interface IState {
  loading: boolean,
  // searchVal?: any,
  educationStatus:any,
  yearOfGraduation:any,
  activeKey:any,
  majorList?:any,
  editModalVisible:boolean,
  showPicVisible:boolean,
  showImgUrl:string,
  deleteModalVisible:boolean,
  deleteRecord?:any,
}
@inject('graduateMediaStore')
@observer
class GraduateMedia extends Component<IProps, IState>{
  searchRef: React.RefObject<FormInstance> = React.createRef<FormInstance>()
  constructor(props:IProps){
    super(props)

  }
  state:IState = {
    loading: false,
    // searchVal:{}, 
    educationStatus:"0",
    yearOfGraduation:'2021',  //这里才是刚进来的值
    activeKey:"",
    majorList:major0,
    editModalVisible:false,
    showPicVisible:false,
    showImgUrl:'',
    deleteModalVisible:false,
    deleteRecord:{},
  }
  componentDidMount(){
    //如果年份变成需要查询就在此处查询
    let educationStatus='0'
    let yearOfGraduation='2021' //和初次的state保持一致
    //刚进来默认最新一年毕业年份和本科
    this.setState({educationStatus,yearOfGraduation,
      activeKey:educationStatus==='0'?major0[0].value:major1[0].value},()=>{
        this.fetchData()
      })
  }
  fetchData=async()=>{
    const {educationStatus,yearOfGraduation,activeKey}=this.state
    const {graduateMediaStore:{fetchClassPics}}=this.props
    const values={
      major:activeKey,
      educationStatus,yearOfGraduation,
    }
    console.log("表单的请求参数为：",values)
    await fetchClassPics(values)
  }
  // handleQuery = (params:any)=>{
  //   this.setState({searchVal:params},()=>{
  //     this.fetchData()
  //   })
  // }

  //弹出编辑/添加框
  openEditModal = async() => {
    // 处理下编辑数据以适应填写框
    this.setState({
      editModalVisible: true,
    })
  }
  hideEditModal = () => {
    this.setState({
      editModalVisible: false,
    })
  }
  refreshData = () => {
    this.fetchData()
  }
  callback=(key:any)=>{
    this.setState({activeKey:key},()=>{
      // console.log('activeKey',this.state.activeKey);
      this.fetchData()
    })
  }

  //删除
  goDelete=async()=>{
    const { graduateMediaStore: {goGraMediasDelete} } = this.props
    const { deleteRecord }=this.state
    //注意传参 TODO _id和imgName
    let params={...deleteRecord}
    const res=await goGraMediasDelete(params)
    if(res.success){
      message.success(`该影像已删除！`)
      this.fetchData()
      this.setState({deleteModalVisible:false})
    }else{
      message.error(res.msg)
    }
  }

  renderTabs(){
    const {educationStatus,activeKey,majorList}=this.state
    const {graduateMediaStore:{classPicsdata}}=this.props
    return(
      <div className={styles.searchTable}>       
        <Tabs activeKey={activeKey} onChange={this.callback}>
          {
            majorList.map((item:any)=>{
              return (
                <TabPane style={{padding:'30px 60px 30px 0',minHeight:'500px'}} tab={item.label} key={item.value}>
                {
                  classPicsdata.length===0?
                  <div style={{textAlign:'center',fontSize:'25px',fontWeight:'lighter',color:'#ccc'}}>暂无数据</div>:
                  <Row >
                  {
                  classPicsdata.map((item:any)=>{
                    return (
                      <Col className={styles.chartsDiv} span={7} offset={1} >
                        <img src={item.img.imgUrl} onClick={()=>{
                          console.log('查看影像数据：',item.img.imgUrl)
                          this.setState({
                            showImgUrl:item.img.imgUrl,
                            showPicVisible:true,
                          })
                        }} alt={item.img.imgName} style={{objectFit: 'cover',height:'250px',maxWidth:'95%',cursor:'pointer'}} />
                        <hr />
                        <div className={styles.majorClass} style={{display:'flex',justifyContent:'space-around'}}>
                          {majorMap[this.state.activeKey]}{item.majorClass}班
                          <ZoomInOutlined style={{fontSize:'30px'}} onClick={()=>{
                            console.log('查看影像数据：',item.img.imgUrl)
                            this.setState({
                              showImgUrl:item.img.imgUrl,
                              showPicVisible:true,
                            })
                          }} />
                          <DeleteOutlined style={{fontSize:'30px'}} onClick={()=>{
                            console.log('删除影像数据：',item,item._id,item.img.imgName)
                            this.setState({deleteModalVisible:true,deleteRecord:{_id:item._id,imgName:item.img.imgName}})
                          }} />
                        </div>
                        {/* <Button onClick={()=>{
                          console.log('查看影像数据：',item.img.imgUrl)
                          this.setState({
                            showImgUrl:item.img.imgUrl,
                            showPicVisible:true,
                          })
                        }}>查看</Button> */}
                        
                        {/* <Button onClick={()=>{
                          console.log('删除影像数据：',item,item._id,item.img.imgName)
                          this.setState({deleteModalVisible:true,deleteRecord:{_id:item._id,imgName:item.img.imgName}})
                        }}>删除</Button> */}
                      </Col>
                    )
                  })
                  }
                  </Row>
                }
                </TabPane>
              )
            })
          }
        </Tabs>
      </div>
    )
  }

  render(){
    const {loading,educationStatus,yearOfGraduation,editModalVisible,showPicVisible,showImgUrl,deleteModalVisible}=this.state
    const {graduateMediaStore}=this.props
    let searchProps={
      hasResetBtn:false,
      hasQueryBtn:false,
      // handleReset:this.handleReset,
      // handleQuery:this.handleQuery,
      onRef:(Ref:any)=> this.searchRef=Ref,
      formItems: [
        {
          el:'select',
          name:'educationStatus',
          label:"就读身份",
          placeholder:"请选择就读身份",
          style:{width: 174},
          selectOptions:[
            { label: '本科生' ,value: '0' },
            { label: '硕士' ,value: '1' },
          ],
          selectField: {
            label: 'label',
            value: 'value'
          },
          initialValue:educationStatus,
          onChange:(value:any)=>{
            if(value==='0'){
              this.setState({educationStatus:'0',majorList:major0,activeKey:major0[0].value},()=>{
                // console.log('changeValue,yearOfGraduation,activeKey',this.state.educationStatus,this.state.activeKey)
                this.fetchData()
              })
            }else{
              this.setState({educationStatus:'1',majorList:major1,activeKey:major1[0].value},()=>{
                // console.log('changeValue,yearOfGraduation,activeKey',this.state.educationStatus,this.state.yearOfGraduation,this.state.activeKey)
                this.fetchData()
              })
            }
          }
        },{
          el:'select',
          name:'yearOfGraduation',
          label:"毕业年份",
          placeholder:"请选择毕业年份",
          style:{width: 174},
          selectOptions:[
            { label: '2021' ,value: '2021' },
            { label: '2020' ,value: '2020' },
            { label: '2019' ,value: '2019' },
            { label: '2018' ,value: '2018' },
            { label: '2017' ,value: '2017' },
            { label: '2016' ,value: '2016' },
          ],  //TODO 注意与身份的联动
          selectField: {
            label: 'label',
            value: 'value'
          },
          initialValue:yearOfGraduation,
          onChange:(value:any)=>{
            this.setState({yearOfGraduation:value},()=>{
              this.fetchData()
            })
          }
        },
      ]
    }
    let deleteModalProps={
      visible:deleteModalVisible,
      title: "",
      children:<div>
        <p>是否确认删除该影像？</p>
        <p style={{color:'red',fontSize:'11px',margin:'10px auto'}}>注：删除后将无法恢复，需手动再添加！</p>
      </div>,
      handleOk:this.goDelete,
      handleCancel: ()=>{
        this.setState({deleteModalVisible:false})
      },
    }

    let editModalProps={
      graduateMediaStore ,
      hideEdit:this.hideEditModal,
      fetchData: this.refreshData,
      // editModalVisible,
    }

    return(
      <div className={styles.pageCenter}>
          <div className={styles.searchPanel}>
              <SearchPanel {...searchProps}/>
          </div>

          <div className={styles.tableBeforeNode}>
            <Button style={{margin:'0 10px 25px 10px'}} type='primary' onClick={
              // this.setState({editRecord:{},editModalVisible:true,editFlag:0}) 
              this.openEditModal.bind(this)
              // ()=>{}
            }>
              添加/修改影像
            </Button>
          </div>
          {this.renderTabs()}
          <InfoModal {...deleteModalProps}></InfoModal>
          {editModalVisible && <AddOrEdit {...editModalProps} />}
          <Modal visible={showPicVisible} footer={null} width={1500} centered={true} onCancel={()=>{this.setState({showPicVisible:false})}}>
            <div style={{display:'flex',justifyContent:'center'}}>
              <img src={showImgUrl} style={{maxWidth:'1450px'}} />
            </div>
          </Modal>
      </div>
    )
  }
};

export default GraduateMedia;