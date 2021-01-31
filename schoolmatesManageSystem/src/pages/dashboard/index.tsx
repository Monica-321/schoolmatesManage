import {Component} from 'react';
import styles from './index.module.less';
import { Button, Row, Col , } from 'antd';
import menuData from '../../components/Layout/SiderBar/menuData'
import { ApiOutlined } from '@ant-design/icons';

interface IProps {
  // loginStore: LoginStore;
  history?: any;
}
interface IState {
  // loading: boolean;
}

class Dashboard extends Component<IProps,IState>{
  constructor(props:IProps){
    super(props)

  }
  state:IState={

  }
  goApplication=(num:number)=>{
    this.props.history.push(menuData[num].children[0].path)
    sessionStorage.setItem("application",num.toString()) //mockapi是0，other是1
    //或者直接设置要跳转的页面的菜单？
    sessionStorage.setItem("appMenu",JSON.stringify(menuData[num])) //.children就是所需菜单路由
  }

  render(){
    return(
      <div className={styles.pageCenter}>
        <div className={styles.innerBox}>
          <Row style={{marginBottom:'30px'}}>
            <Col span={7} offset={1} className={styles.cols} onClick={this.goApplication.bind(this,0)}> 
                <div className={styles.appIcons}><ApiOutlined className={styles.icon}/></div>
                <div className={styles.appNames}>MockApi服务</div>
            </Col>
            <Col span={7} offset={1} className={styles.cols} onClick={this.goApplication.bind(this,1)} > 
                <div className={styles.appIcons}><ApiOutlined className={styles.icon} /></div>
                <div className={styles.appNames}>其他应用</div>
            </Col>
            <Col span={7} offset={1} className={styles.cols} > 
                <div className={styles.appIcons}><ApiOutlined className={styles.icon} /></div>
                <div className={styles.appNames}>其他应用</div>
            </Col>
          </Row>
          <Row >
            <Col span={7} offset={1} className={styles.cols} > 
                <div className={styles.appIcons}><ApiOutlined className={styles.icon} /></div>
                <div className={styles.appNames}>其他应用</div>
            </Col>
            <Col span={7} offset={1} className={styles.cols} > 
                <div className={styles.appIcons}><ApiOutlined className={styles.icon} /></div>
                <div className={styles.appNames}>其他应用</div>
            </Col>
            
          </Row>
        </div>
      </div>
    )
  }
};

export default Dashboard;