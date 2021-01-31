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
        <div>PageNotFound page - 404</div>
        </div>
    )
  }
};

export default PageNotFound;