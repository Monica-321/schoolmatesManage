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
          <strong> 404</strong><br />
          Page  Not Found
        </div>
      </div>
    )
  }
};

export default PageNotFound;