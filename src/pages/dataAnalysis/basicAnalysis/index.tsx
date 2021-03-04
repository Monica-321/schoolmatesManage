import {Component} from 'react';
import { Button, } from 'antd';
import styles from './index.module.less';

class BasicAnalysis extends Component{
  constructor(props:any){
    super(props)

  }
  render(){
    return(
      <div className={styles.pageCenter}>
        <div> 基本数据统计 </div>
        </div>
    )
  }
};

export default BasicAnalysis;