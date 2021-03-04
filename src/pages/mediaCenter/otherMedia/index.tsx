import {Component} from 'react';
import { Button, } from 'antd';
import styles from './index.module.less';

class OtherMedia extends Component{
  constructor(props:any){
    super(props)

  }
  render(){
    return(
      <div className={styles.pageCenter}>
        <div> 其他影像 </div>
        </div>
    )
  }
};

export default OtherMedia;