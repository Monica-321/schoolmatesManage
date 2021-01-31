import {Component} from 'react';
import { Button, } from 'antd';
import styles from './index.module.less';

class ApisManage extends Component{
  constructor(props:any){
    super(props)

  }
  render(){
    return(
      <div className={`${styles.pageCenter}`}>
        <div> ApisManage page</div>
        </div>
    )
  }
};

export default ApisManage;