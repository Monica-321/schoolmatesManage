import {Component} from 'react';
import { Button, } from 'antd';
import styles from './index.module.less';

class Item1 extends Component{
  constructor(props:any){
    super(props)

  }
  render(){
    return(
      <div className={`${styles.pageCenter}`}>
        <div> 测试页-item1 </div>
        </div>
    )
  }
};

export default Item1;