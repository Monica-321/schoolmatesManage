import {Component} from 'react';
import { Button, } from 'antd';
import styles from './index.module.less';

class GraduateMedia extends Component{
  constructor(props:any){
    super(props)

  }
  render(){
    return(
      <div className={styles.pageCenter}>
        <div> 毕业影像 </div>
        </div>
    )
  }
};

export default GraduateMedia;