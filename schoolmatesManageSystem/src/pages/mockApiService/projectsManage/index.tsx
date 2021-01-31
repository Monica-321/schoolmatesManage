import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import { Button, } from 'antd';
import styles from './index.module.less';

class ProjectsManage extends Component{
  constructor(props:any){
    super(props)

  }
  render(){
    return(
      <div className={`${styles.pageCenter}`}>
        <div>ProjectsManage page</div> 
        <Link to="../mockapiservice/modulesmanage" >modules manage</Link>
        </div>
    )
  }
};

export default ProjectsManage ;