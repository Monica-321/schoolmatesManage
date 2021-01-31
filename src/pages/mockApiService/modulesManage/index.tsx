import {Component} from 'react';
import { Button, } from 'antd';
import styles from './index.module.less';

class ModulesManage extends Component{
  constructor(props:any){
    super(props)

  }
  render(){
    return(
      <div className={`${styles.pageCenter}`}>
        <div> ModulesManage page</div>
        </div>
    )
  }
};

export default ModulesManage;