import {Component} from 'react';
import { Button, } from 'antd';
import styles from './index.module.less';

class PageNotFound extends Component{
  constructor(props:any){
    super(props)

  }
  render(){
    return(
      <div className={`${styles.pageCenter}`}>
        <div className={`${styles.msgBox}`}>
          404<br />
          Page  Not Found
        </div>
      </div>
    )
  }
};

export default PageNotFound;