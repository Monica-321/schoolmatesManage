import React , {Component} from 'react';
import SearchPanel from '@/components/SearchFormComp' 
import PieChart from '@/components/ChartComp/PieChart'
import BarChart from '@/components/ChartComp/BarChart'
import ChinaMap from '@/components/ChartComp/ChinaMap'
import { FormInstance } from 'antd/lib/form'
import { DatePicker, Form, Table, Button,Modal, Row, Col,Spin } from 'antd'
import { observer, inject } from 'mobx-react'
import styles from './index.module.less';
interface IProps {
  graduateAnalysisStore?:any;
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
@inject('graduateAnalysisStore')
@observer
class GraduateAnalysis extends Component<IProps, IState>{
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
     const params={educationStatus:0,yearOfGraduation:'2021'}
     this.searchRef.current?.setFieldsValue(params)
     //刚进来默认最新一年毕业年份和本科
     this.setState({searchVal:params},()=>{this.fetchData()})
  }
  fetchData=async()=>{
    // 各图根据选择的身份和年份来查询
    const { graduateAnalysisStore: {fetchGraduateOption,fetchDstPlace,fetchCompanyIndus,fetchSalary,
      fetchCompanyScale,fetchCompanyRank} } = this.props
    this.setState({loading1:true,loading2:true,loading3:true,loading4:true,loading5:true,loading6:true})
    await fetchGraduateOption({...this.state.searchVal})
    this.setState({loading1:false})
    // await fetchDstPlace({...this.state.searchVal})
    this.setState({loading2:false})
    await fetchCompanyIndus({...this.state.searchVal})
    this.setState({loading3:false})
    // await fetchSalary({...this.state.searchVal})
    await fetchCompanyScale({...this.state.searchVal})
    this.setState({loading4:false})
    await fetchCompanyRank({...this.state.searchVal})
    this.setState({loading5:false})
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
    const {graduateAnalysisStore:{graduateOption,companyIndus,companyScale,companyRank}}=this.props
    const {ranknames,rankvalues}=companyRank
    // console.log('柱状图数据',ranknames,rankvalues)
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
    
    // const educationPieProps = {
    //   chartName:'毕业学历结构比例饼状图',
    //   isRing:true,
    //   chartData: [
    //     {value:'546',name:'本科'},
    //     {value:'351',name:'硕士'},
    //     {value:'101',name:'其他'},
    //   ],
    // }
    const graduationOptionPieProps = {
      chartName:'毕业去向饼状图',
      isRing:true,
      chartData: graduateOption,
    }

    const chinaMap3Props={
      chartName:'去向城市统计地图',
      
    }
    const companyIndustryPieProps={
      chartName:'毕业就业单位行业饼图',
      isRing:true,
      chartData: companyIndus,
    }
    // TODO 不一定有因为有点麻烦
    const workSalaryBarProps={
      chartName:'毕业就业薪资柱状图',
      chartData:[],
      chartXAxis:[]
    }
    const workCompanyScalePieProps={
      chartName:'毕业就业单位规模饼图',
      isRing:true,
      chartData: companyScale,
    }
    const companyRankBarProps={
      chartName:'毕业就业单位排名柱状图',
      chartData:rankvalues,
      chartXAxis:ranknames
    }
    // const workInfoSourceBarProps={
    //   chartName:'就业信息来源柱状图',
    //   chartData:[{data: [ ]}],
    //   chartXAxis:[]
    // }
    // const workWayBarProps = {
    //   chartName:'就业方式柱状图',
    //   chartData:[{data: [120, 80, 90, 80, 50,13,47 ]}],
    //   chartXAxis:  ['签就业协议形式就业', '签劳动合同形式就业', '其他录用形式就业', '自由职业', '自主创业','国家/地方基层项目','应征义务兵'],
    // }

    // const studyWayPieProps={
    //   chartName:'毕业深造方式饼图',
    //   isRing:true,
    //   chartData: [
    //     {value:'146',name:'国内升学'},
    //     {value:'51',name:'出国、出境'},
    //   ],
    // }
    // const stydyArea1PieProps={
    //   chartName:'国内升学区域饼状图',
    //   isRing:true,
    //   chartData: [
        
    //   ],
    // }
    // const stydyArea2PieProps={
    //   chartName:'国外升学区域饼状图',
    //   chartData:[{data: [ ]}],
    //   chartXAxis:[]
    // }

    return(
      <div className={styles.pageCenter}>
          <div className={styles.searchPanel}>
              <SearchPanel {...searchProps}/>
          </div>
          <div className={styles.searchTable}>
             <Row style={{marginBottom:'30px'}} >
               
               {/* <Col className={styles.chartsDiv} span={10} offset={1}>
                {loadingGenderPie
                  ? <div className={styles.chartLoading}> <Spin /></div>
                  : 
                  <div>
                    <PieChart {...educationPieProps}/>
                    <Button type="default" className={styles.saveBtn} >保存</Button>
                  </div>
                }
               </Col> */}
               <Col className={styles.chartsDiv} span={21} offset={1}>
                {loading1
                  ? <div className={styles.chartLoading}> <Spin /></div>
                  : 
                  <div>
                    <PieChart {...graduationOptionPieProps}/>
                  </div>
                }
               </Col>
             </Row>

             <Row style={{marginBottom:'30px'}}>
               <Col className={styles.chartsDiv} span={21} offset={1}>
                {loading2
                  ? <div className={styles.chartLoading}> <Spin /></div>
                  : 
                  <div><ChinaMap {...chinaMap3Props} /> </div>
                }
               </Col>
             </Row>

             <Col span={24}>
              <Col span={21} offset={1}>
               <h2>就业方向 分析</h2>
               <hr />
               </Col>

              <Row style={{marginBottom:'30px'}}>
                <Col className={styles.chartsDiv} span={21} offset={1}>
                  {loading3
                    ? <div className={styles.chartLoading}> <Spin /></div>
                    : 
                    <div>
                      <PieChart {...companyIndustryPieProps}/>
                    </div>
                  }
                </Col>
              </Row>

              {/* <Row style={{marginBottom:'30px'}}>
                <Col className={styles.chartsDiv} span={21} offset={1}>
                  {loadingGenderPie
                    ? <div className={styles.chartLoading}> <Spin /></div>
                    : 
                    <div>
                      <BarChart {...workSalaryBarProps}/>
                    </div>
                  }
                </Col>
              </Row> */}

               <Row style={{marginBottom:'30px'}}>
               <Col className={styles.chartsDiv} span={10} offset={1}>
                {loading4
                  ? <div className={styles.chartLoading}> <Spin /></div>
                  : 
                  <div>
                    <PieChart {...workCompanyScalePieProps}/>
                  </div>
                }
               </Col>
                <Col className={styles.chartsDiv} span={10} offset={1}>
                {loading5
                  ? <div className={styles.chartLoading}> <Spin /></div>
                  : 
                  <div>
                    <BarChart {...companyRankBarProps}/>
                  </div>
                }
                </Col>
              </Row> 

             </Col>

            {/* <Col span={24}>
               <Col span={21} offset={1}>
                <h2>国内升学/出国（深造） 分析</h2>
                <hr />
               </Col>
              
             </Col> */}

          </div>
      </div>
    )
  }
};

export default GraduateAnalysis;