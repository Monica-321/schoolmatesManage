import {Component} from 'react';
import { Button, } from 'antd';
import styles from './index.module.less';

class GraduateAnalysis extends Component{
  constructor(props:any){
    super(props)

  }
  render(){
    return(
      <div className={styles.pageCenter}>
        <div> 毕业去向统计 </div>
        </div>
    )
  }
};

export default GraduateAnalysis;