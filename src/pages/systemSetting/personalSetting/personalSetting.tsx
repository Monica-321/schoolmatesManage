import React from 'react'
import { Tabs } from "antd";
import { PasswdSetting, BasicSetting } from ".";
import styles from './styles.module.less'
import { observer, inject } from 'mobx-react'
import { UserStore } from '@/stores/userRelated/userStore';
interface IProp{
    // userStore: UserStore;
    // history?: any,
}

// @inject('userStore')
// @observer
export default class PersonalSetting extends React.Component<IProp> {
    basicInfoRef: React.RefObject<BasicSetting> = React.createRef<BasicSetting>()
    componentDidMount(){
        this.resetBasic()
    }
    async resetBasic(){
        
        this.basicInfoRef.current?.setForm()
    }
    handleTabChange=(tabKey: string)=>{
        switch (tabKey){
            case '0':
                this.resetBasic()
                break
            case '1':
                break
        }
    }
    render(){
        return(<>
            <div className={styles.warpper}>
                <Tabs tabPosition="left" className={styles.tabs} onChange={(key)=>{this.handleTabChange(key)}}>
                    <Tabs.TabPane tab='基本设置' key="0">
                        <BasicSetting ref={this.basicInfoRef}   />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='密码设置' key="1">
                        <PasswdSetting  />
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </>)
    }
}
