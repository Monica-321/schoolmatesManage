import React , {Component} from 'react';
import SearchPanel from '@/components/SearchFormComp' 
import PieChart from '@/components/ChartComp/PieChart'
import BarChart from '@/components/ChartComp/BarChart'
import ChinaMap from '@/components/ChartComp/ChinaMap'
import { FormInstance } from 'antd/lib/form'
import { DatePicker, Form, Table, Button,Modal, Row, Col } from 'antd'
import styles from './index.module.less';
interface IProps {

}
interface IState {
  loading: boolean,
  loadingGenderPie:boolean,
  
}
//TODO 本科/研究生
class GraduateAnalysis extends Component<IProps, IState>{
  searchRef: React.RefObject<FormInstance> = React.createRef<FormInstance>()
  constructor(props:IProps){
    super(props)

  }
  state:IState = {
    loading: false,
    loadingGenderPie:false,  //TODO
  }
  componentDidMount(){
    this.fetchData()
  }
  fetchData=async()=>{
      

  }
  handleQuery = ()=>{

  }

  handleReset = ()=>{
      this.searchRef.current?.resetFields()
      this.handleQuery()
  }

  render(){
    const {loading,loadingGenderPie}=this.state
    let searchProps={
      handleReset:this.handleReset,
      handleQuery:this.handleQuery,
      onRef:(Ref:any)=> this.searchRef=Ref,
      formItems: [
        {
          el:'select',
          name:'yearOfGraduation',
          label:"毕业年份",
          placeholder:"请选择毕业年份",
          // selectMode: 'multiple',
          style:{width: 230},
          selectOptions:[
            { label: '2021' ,value: 1 },
            { label: '2020' ,value: 2 },
            { label: '2019' ,value: 3 },
          ],
          selectField: {
            label: 'label',
            value: 'value'
          }
        },
      ]
    }
    
    const educationPieProps = {
      chartName:'毕业学历结构比例饼状图',
      isRing:true,
      chartData: [
        {value:'546',name:'本科'},
        {value:'351',name:'硕士'},
        {value:'101',name:'其他'},
      ],
    }
    const graduationOptionPieProps = {
      chartName:'毕业去向饼状图',
      isRing:true,
      chartData: [
        {value:'146',name:'就业'},
        {value:'51',name:'创业'},
        {value:'101',name:'升学'},
        {value:'31',name:'出国'},
        {value:'41',name:'其他'},
      ],
    }

    const workAreaPieProps={
      chartName:'毕业就业区域饼状图',
      isRing:true,
      chartData: [
        
      ],
    }
    const workCompanyTypeBarProps={
      chartName:'毕业就业单位类型柱状图',
      chartData:[{data: [ ]}],
      chartXAxis:[]
    }
    const workCompanyScalePieProps={
      chartName:'毕业就业单位规模饼图',
      isRing:true,
      chartData: [
        
      ],
    }
    const workInfoSourceBarProps={
      chartName:'就业信息来源柱状图',
      chartData:[{data: [ ]}],
      chartXAxis:[]
    }
    const workWayBarProps = {
      chartName:'就业方式柱状图',
      chartData:[{data: [120, 80, 90, 80, 50,13,47 ]}],
      chartXAxis:  ['签就业协议形式就业', '签劳动合同形式就业', '其他录用形式就业', '自由职业', '自主创业','国家/地方基层项目','应征义务兵'],
    }

    const studyWayPieProps={
      chartName:'毕业深造方式饼图',
      isRing:true,
      chartData: [
        {value:'146',name:'国内升学'},
        {value:'51',name:'出国、出境'},
      ],
    }
    const stydyArea1PieProps={
      chartName:'国内升学区域饼状图',
      isRing:true,
      chartData: [
        
      ],
    }
    const stydyArea2PieProps={
      chartName:'国外升学区域饼状图',
      chartData:[{data: [ ]}],
      chartXAxis:[]
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
                  <div>
                    <PieChart {...educationPieProps}/>
                    <Button type="default" className={styles.saveBtn} >保存</Button>
                  </div>
                }
               </Col>
               <Col className={styles.chartsDiv} span={10} offset={1}>
                {loadingGenderPie
                  ? <div className='loadingText'>图表加载中...</div>
                  : 
                  <div>
                    <PieChart {...graduationOptionPieProps}/>
                    <Button type="default" className={styles.saveBtn} >保存</Button>
                  </div>
                }
               </Col>
             </Row>

             <Col span={24}>
              <Col span={21} offset={1}>
               <h2>就业/创业 分析</h2>
               <hr />
               </Col>

               <Row style={{marginBottom:'30px'}}>
                <Col className={styles.chartsDiv} span={21} offset={1}>
                  {loadingGenderPie
                    ? <div className='loadingText'>图表加载中...</div>
                    : 
                    <div>
                      <BarChart {...workWayBarProps}/>
                      <Button type="default" className={styles.saveBtn} >保存</Button>
                    </div>
                  }
                </Col>
              </Row>  

              <Row style={{marginBottom:'30px'}}>
              <Col className={styles.chartsDiv} span={10} offset={1}>
                {loadingGenderPie
                  ? <div className='loadingText'>图表加载中...</div>
                  : 
                  <div>
                    <PieChart {...workAreaPieProps}/>
                    <Button type="default" className={styles.saveBtn} >保存</Button>
                  </div>
                }
               </Col>
               <Col className={styles.chartsDiv} span={10} offset={1}>
                {loadingGenderPie
                  ? <div className='loadingText'>图表加载中...</div>
                  : 
                  <div>
                    <PieChart {...workCompanyScalePieProps}/>
                    <Button type="default" className={styles.saveBtn} >保存</Button>
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
                      <BarChart {...workCompanyTypeBarProps}/>
                      <Button type="default" className={styles.saveBtn} >保存</Button>
                    </div>
                  }
                </Col>
              </Row>

              {/* <Row style={{marginBottom:'30px'}}>
                <Col className={styles.chartsDiv} span={21} offset={1}>
                  {loadingGenderPie
                    ? <div className='loadingText'>图表加载中...</div>
                    : 
                    <div>
                      <BarChart {...workInfoSourceBarProps}/>
                      <Button type="default" className={styles.saveBtn} >保存</Button>
                    </div>
                  }
                </Col>
              </Row>  */}

             </Col>

            <Col span={24}>
               <Col span={21} offset={1}>
                <h2>国内升学/出国（深造） 分析</h2>
                <hr />
               </Col>

               <Row style={{marginBottom:'30px'}}>
                <Col className={styles.chartsDiv} span={21} offset={1}>
                  {loadingGenderPie
                    ? <div className='loadingText'>图表加载中...</div>
                    : 
                    <div>
                      <PieChart {...studyWayPieProps}/>
                      <Button type="default" className={styles.saveBtn} >保存</Button>
                    </div>
                  }
                </Col>
              </Row>  

              <Row style={{marginBottom:'30px'}}>
              <Col className={styles.chartsDiv} span={10} offset={1}>
                {loadingGenderPie
                  ? <div className='loadingText'>图表加载中...</div>
                  : 
                  <div>
                    <PieChart {...stydyArea1PieProps}/>
                    <Button type="default" className={styles.saveBtn} >保存</Button>
                  </div>
                }
               </Col>
               <Col className={styles.chartsDiv} span={10} offset={1}>
                {loadingGenderPie
                  ? <div className='loadingText'>图表加载中...</div>
                  : 
                  <div>
                    <PieChart {...stydyArea2PieProps}/>
                    <Button type="default" className={styles.saveBtn} >保存</Button>
                  </div>
                }
               </Col>
               </Row> 

               <Row style={{marginBottom:'30px'}}>
                <Col className={styles.chartsDiv} span={21} offset={1}>
                  <h3>国内主要升学院校</h3>
                  <p>表格</p>
                </Col>
              </Row> 

              <Row style={{marginBottom:'30px'}}>
                <Col className={styles.chartsDiv} span={21} offset={1}>
                  <h3>国外主要升学院校</h3>
                  <p>表格</p>
                </Col>
              </Row>
              
             </Col>

          </div>
      </div>
    )
  }
};

export default GraduateAnalysis;