import React , {Component} from 'react';
// import ReactEcharts from 'echarts-for-react'
import SearchPanel from '@/components/SearchFormComp' 
import PieChart from '@/components/ChartComp/PieChart'
import { FormInstance } from 'antd/lib/form'
import { DatePicker, Form, Table, Button,Modal, Row, Col } from 'antd'
import styles from './index.module.less';
interface IProps {

}
interface IState {
  loading: boolean,
  loadingGenderPie:boolean,
  
}
class BasicAnalysis extends Component<IProps, IState>{
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

    const genderPieProps = {
      chartName:'男女比例饼状图',
      // showCenterText:true,
      chartData: [
        {value:'246',name:'男'},
        {value:'301',name:'女'}
      ],
      chartColor:['#52a2e5','#ef81a7'],

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
                    <PieChart {...genderPieProps}/>
                    <Button type="default" className={styles.saveBtn} >保存</Button>
                  </div>
                }
               </Col>
               <Col className={styles.chartsDiv} span={10} offset={1}>
                {loadingGenderPie
                  ? <div className='loadingText'>图表加载中...</div>
                  : 
                  <div>
                    <PieChart {...genderPieProps}/>
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
                    <PieChart {...genderPieProps}/>
                    <Button type="default" className={styles.saveBtn} >保存</Button>
                  </div>
                }
               </Col>
               <Col className={styles.chartsDiv} span={10} offset={1}>
                {loadingGenderPie
                  ? <div className='loadingText'>图表加载中...</div>
                  : 
                  <div>
                    <PieChart {...genderPieProps}/>
                    <Button type="default" className={styles.saveBtn} >保存</Button>
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