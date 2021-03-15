import {Component} from 'react';
import { Button, } from 'antd';
import styles from './index.module.less';

class CompanyAnalysis extends Component{
  constructor(props:any){
    super(props)

  }
  render(){
    return(
      <div className={styles.pageCenter}>
        <div> 校友企业统计 </div>
        </div>
    )
  }
};

export default CompanyAnalysis;