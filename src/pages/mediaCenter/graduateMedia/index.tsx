import React , {Component} from 'react';
import SearchPanel from '@/components/SearchFormComp' 
import { FormInstance } from 'antd/lib/form'
import { DatePicker, Form, Table, Button,Modal ,Tabs} from 'antd'
import styles from './index.module.less';
const {TabPane}=Tabs
interface IProps {

}
interface IState {
  loading: boolean,
  
}
class GraduateMedia extends Component<IProps, IState>{
  searchRef: React.RefObject<FormInstance> = React.createRef<FormInstance>()
  constructor(props:IProps){
    super(props)

  }
  state:IState = {
    loading: false,
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

  callback=(key:any)=>{
    console.log(key);
  }

  render(){
    const {loading}=this.state
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
        {
          el:'select',
          name:'educationStatus',
          label:"就读身份",
          placeholder:"请选择就读身份",
          style:{width: 174},
          selectOptions:[
            { label: '本科生' ,value: 0 },
            { label: '研究生' ,value: 1 },
          ],
          selectField: {
            label: 'label',
            value: 'value'
          }
        },
      ]
  }
    return(
      <div className={styles.pageCenter}>
          <div className={styles.searchPanel}>
              <SearchPanel {...searchProps}/>
          </div>
          <div className={styles.searchTable}>
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab="Tab 1" key="1">
              Content of Tab Pane 1
            </TabPane>
            <TabPane tab="Tab 2" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Tab 3" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
          </div>
      </div>
    )
  }
};

export default GraduateMedia;