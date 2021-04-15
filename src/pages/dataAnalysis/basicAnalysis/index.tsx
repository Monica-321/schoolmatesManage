import React , {Component} from 'react';
// import ReactEcharts from 'echarts-for-react'
import SearchPanel from '@/components/SearchFormComp' 
import PieChart from '@/components/ChartComp/PieChart'
import BarChart from '@/components/ChartComp/BarChart'
import ChinaMap from '@/components/ChartComp/ChinaMap'
import { FormInstance } from 'antd/lib/form'
import { DatePicker, Form, Table, Button,Modal, Row, Col , Spin } from 'antd'
import { observer, inject } from 'mobx-react'
import styles from './index.module.less';
interface IProps {
  basicAnalysisStore?:any;
  history?: any,
}
interface IState {
  loading1: boolean,
  loading2:boolean,
  loading3: boolean,
  loading4:boolean,
  loading5: boolean,
  loading6:boolean,
  searchVal?: any,
  
}
@inject('basicAnalysisStore')
@observer
class BasicAnalysis extends Component<IProps, IState>{
  searchRef: React.RefObject<FormInstance> = React.createRef<FormInstance>()
  constructor(props:IProps){
    super(props)

  }
  state:IState = {
    loading1: false,
    loading2:false,
    loading3: false,
    loading4:false,
    loading5: false,
    loading6:false,
    searchVal:{},  
  }
  componentDidMount(){
    //如果年份变成需要查询就在此处查询
    const params={educationStatus:'0',yearOfGraduation:'2021'}
    this.searchRef.current?.setFieldsValue(params)
    //刚进来默认最新一年毕业年份和本科
    this.setState({searchVal:params},()=>{this.fetchData()})
  }
  fetchData=async()=>{
      // 各图根据选择的身份和年份来查询
      const { basicAnalysisStore: {fetchGenderRate,fetchEducationRate,fetchMajorNum,fetchPoliticalSta} } = this.props
      this.setState({loading1:true,loading2:true,loading3:true,loading4:true})
      await fetchGenderRate({...this.state.searchVal})
      this.setState({loading1:false})
      await fetchEducationRate({...this.state.searchVal})
      this.setState({loading2:false})
      await fetchMajorNum({...this.state.searchVal})
      this.setState({loading3:false})
      await fetchPoliticalSta({...this.state.searchVal})
      this.setState({loading4:false})
  }
  handleQuery = (params:any)=>{
    //处理一下某些参数，比如城市那些、还有生日，以及是否精确查询？？
    console.log("表单的请求参数为：",params)
    this.setState({searchVal:params},()=>{
      this.fetchData()
    })
  }

  handleReset = ()=>{
    this.setState({searchVal:{}},()=>{
      this.fetchData()
    })
  }

  render(){
    const {loading1,loading2,loading3,loading4,loading5,loading6}=this.state
    const {basicAnalysisStore:{educationRateData,genderRateData,majorNumData,politicalStaData}}=this.props
    const {majornames,majorvalues}=majorNumData
    const {politicalnames,politicalvalues}=politicalStaData
    // console.log('柱状图数据',majornames,majorvalues,politicalnames,politicalvalues)
    let searchProps={
      hasResetBtn:false,
      // handleReset:this.handleReset,
      handleQuery:this.handleQuery,
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
          initialValue:'0',
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
          initialValue:'2021',
        },
      ]
    }

    const genderPieProps = {
      chartName:'男女比例饼状图',
      chartData: genderRateData,
    }
    const educationPieProps = {
      chartName:'毕业学历比例饼状图',
      chartData: educationRateData,
    }

    const majorNumBarProps = {
      chartName:'各专业人数柱状图',
      // TODO 没显示出数据？？但是数据实际上是有的
      chartData:majorvalues,
      chartXAxis:majornames,
    }

    const politicalBarProps={
      chartName:'政治面貌柱状图',
      //显示也有问题？？
      chartData:politicalvalues,
      chartXAxis: politicalnames ,
    }

    const chinaMap1Props={
      chartName:'籍贯统计地图',
      mapData:[
        {
          name: "北京",
          value: 54
        },
        {
          name: "天津",
          value: 130
        },
        {
          name: "上海",
          value: 400
        },
        {
          name: "重庆",
          value: 75
        },
        {
          name: "河北省",
          value: 130
        },
        {
          name: "河南省",
          value: 83
        },
        {
          name: "云南省",
          value: 110
        },
        {
          name: "辽宁省",
          value: 19
        },
        {
          name: "黑龙江省",
          value: 150
        },
        {
          name: "湖南省",
          value: 9
        },
        {
          name: "安徽省",
          value: 60
        },
        {
          name: "山东省",
          value: 39
        },
        {
          name: "新疆维吾尔自治区",
          value: 4
        },
        {
          name: "江苏省",
          value: 31
        },
        {
          name: "浙江省",
          value: 4
        },
        {
          name: "江西省",
          value: 36
        },
        {
          name: "湖北省",
          value: 52
        },
        {
          name: "广西壮族自治区",
          value: 33
        },
        {
          name: "甘肃省",
          value: 7
        },
        {
          name: "山西省",
          value: 5
        },
        {
          name: "内蒙古自治区",
          value: 77
        },
        {
          name: "陕西省",
          value: 22
        },
        {
          name: "吉林省",
          value: 4
        },
        {
          name: "福建省",
          value: 18
        },
        {
          name: "贵州省",
          value: 5
        },
        {
          name: "广东省",
          value: 98
        },
        {
          name: "青海省",
          value: 1
        },
        {
          name: "西藏自治区",
          value: 0
        },
        {
          name: "四川省",
          value: 44
        },
        {
          name: "宁夏回族自治区",
          value: 4
        },
        {
          name: "海南省",
          value: 22
        },
        {
          name: "台湾",
          value: 3
        },
        {
          name: "香港特别行政区",
          value: 5
        },
        {
          name: "澳门特别行政区",
          value: 0
        },
        {
          name: "海外",
          value: 15
        }
      ]
    }
    const chinaMap2Props={
      chartName:'生源地统计地图',
      mapData:[{
        name: "澳门特别行政区",
        value: 0
      },]
    }

    return(
      <div className={styles.pageCenter}>
          <div className={styles.searchPanel}>
              <SearchPanel {...searchProps}/>
          </div>
          <div className={styles.searchTable}>
             <Row style={{marginBottom:'30px'}} >
              <Col className={styles.chartsDiv} span={10} offset={1}>
                {loading1
                  ? <div className={styles.chartLoading}> <Spin /></div>
                  : 
                  <div><PieChart {...educationPieProps}/></div>
                }
               </Col>
               <Col className={styles.chartsDiv} span={10} offset={1}>
                {loading2
                  ? <div className={styles.chartLoading}> <Spin /></div>
                  : 
                  <div> <PieChart {...genderPieProps}/> </div>
                }
               </Col>
             </Row>

             <Row style={{marginBottom:'30px'}}>
               <Col className={styles.chartsDiv} span={10} offset={1}>
                {loading3
                  ? <div className={styles.chartLoading}> <Spin /></div>
                  : 
                  <div>
                    <BarChart {...majorNumBarProps}/>
                    {/* <Button type="default" className={styles.saveBtn} >保存</Button> */}
                  </div>
                }
               </Col>
             {/* </Row>

             <Row style={{marginBottom:'30px'}}> */}
               <Col className={styles.chartsDiv} span={10} offset={1}>
                {loading4
                  ? <div className={styles.chartLoading}> <Spin /></div>
                  : 
                  <div>
                    <BarChart {...politicalBarProps}/>
                    {/* <Button type="default" className={styles.saveBtn} >保存</Button> */}
                  </div>
                }
               </Col>
             </Row>

             <Row style={{marginBottom:'30px'}}>
               <Col className={styles.chartsDiv} span={21} offset={1}>
                {loading5
                  ? <div className={styles.chartLoading}> <Spin /></div>
                  : 
                  <div>
                    <ChinaMap {...chinaMap1Props} />
                    {/* <Button type="default" className={styles.saveBtn} >保存</Button> */}
                  </div>
                }
               </Col>
             </Row>

             <Row style={{marginBottom:'30px'}}>
               <Col className={styles.chartsDiv} span={21} offset={1}>
                {loading6
                  ? <div className={styles.chartLoading}> <Spin /></div>
                  : 
                  <div>
                    <ChinaMap {...chinaMap2Props} />
                    {/* <Button type="default" className={styles.saveBtn} >保存</Button> */}
                  </div>
                }
               </Col>
             </Row>

             

          </div>
      </div>
    )
  }
};

export default BasicAnalysis;