import {Component} from 'react';
import { Button, } from 'antd';
import styles from './index.module.less';

class DonateAnalysis extends Component{
  constructor(props:any){
    super(props)

  }
  render(){
    return(
      <div className={styles.pageCenter}>
        <div> 校友捐赠统计 </div>
        </div>
    )
  }
};

export default DonateAnalysis;