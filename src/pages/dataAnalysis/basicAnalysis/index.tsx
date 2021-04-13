import React , {Component} from 'react';
// import ReactEcharts from 'echarts-for-react'
import SearchPanel from '@/components/SearchFormComp' 
import PieChart from '@/components/ChartComp/PieChart'
import BarChart from '@/components/ChartComp/BarChart'
import ChinaMap from '@/components/ChartComp/ChinaMap'
import { FormInstance } from 'antd/lib/form'
import { DatePicker, Form, Table, Button,Modal, Row, Col } from 'antd'
import { observer, inject } from 'mobx-react'
import styles from './index.module.less';
interface IProps {
  basicAnalysisStore?:any;
  history?: any,
}
interface IState {
  loading: boolean,
  loadingGenderPie:boolean,
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
    loading: false,
    loadingGenderPie:false,  //TODO
    searchVal:{},  
  }
  componentDidMount(){
    //如果年份变成需要查询就在此处查询
    const params={educationStatus:0,yearOfGraduation:'2021'}
    this.searchRef.current?.setFieldsValue(params)
    //刚进来默认最新一年毕业年份和本科
    this.setState({searchVal:params},()=>{this.fetchData()})
  }
  fetchData=async()=>{
      // 各图根据选择的身份和年份来查询
      const { basicAnalysisStore: {fetchGenderRate,fetchEducationRate,fetchMajorNum,fetchPoliticalSta} } = this.props
      // this.setState({loadingGenderPie:true})
      await fetchGenderRate({...this.state.searchVal})
      await fetchEducationRate({...this.state.searchVal})
      await fetchMajorNum({...this.state.searchVal})
      await fetchPoliticalSta({...this.state.searchVal})
      // this.setState({loadingGenderPie:false})
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
    const {loading,loadingGenderPie}=this.state
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
            { label: '本科生' ,value: 0 },
            { label: '硕士' ,value: 1 },
          ],
          selectField: {
            label: 'label',
            value: 'value'
          },
          initialValue:0,
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
      // chartData:[{data: [120, 80, 150, 80, 50, ]}],
      // chartXAxis:  ['电子信息工程', '通信工程', '计算机科学与技术', '数字媒体技术', '智能科学与技术'],
    }

    const politicalBarProps={
      chartName:'政治面貌柱状图',
      //显示也有问题？？
      chartData:politicalvalues,
      chartXAxis: politicalnames ,
    }

    const chinaMap1Props={
      chartName:'籍贯统计地图',

    }
    const chinaMap2Props={
      chartName:'生源地统计地图',
      
    }

    return(
      <div className={styles.pageCenter}>
          <div className={styles.searchPanel}>
              <SearchPanel {...searchProps}/>
          </div>
          <div className={styles.searchTable}>
             <Row style={{marginBottom:'30px'}} >
              <Col className={styles.chartsDiv} span={10} offset={1}>
                {loadingGenderPie
                  ? <div className='loadingText'>图表加载中...</div>
                  : 
                  <div><PieChart {...educationPieProps}/></div>
                }
               </Col>
               <Col className={styles.chartsDiv} span={10} offset={1}>
                {loadingGenderPie
                  ? <div className='loadingText'>图表加载中...</div>
                  : 
                  <div> <PieChart {...genderPieProps}/> </div>
                }
               </Col>
             </Row>

             <Row style={{marginBottom:'30px'}}>
               <Col className={styles.chartsDiv} span={21} offset={1}>
                {loadingGenderPie
                  ? <div className='loadingText'>图表加载中...</div>
                  : 
                  <div>
                    <BarChart {...majorNumBarProps}/>
                    {/* <Button type="default" className={styles.saveBtn} >保存</Button> */}
                  </div>
                }
               </Col>
             </Row>

             <Row style={{marginBottom:'30px'}}>
               <Col className={styles.chartsDiv} span={21} offset={1}>
                {loadingGenderPie
                  ? <div className='loadingText'>图表加载中...</div>
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
                {loadingGenderPie
                  ? <div className='loadingText'>图表加载中...</div>
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
                {loadingGenderPie
                  ? <div className='loadingText'>图表加载中...</div>
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