import React from 'react'
import styles from './styles.module.less'
import { DatePicker, Form, Table, Button,Modal } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { inject, observer } from 'mobx-react'
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table'

interface IProp {

}

interface IState {

}
export default class AccountLog extends React.Component<IProp, IState> {
    constructor(props: IProp){
        super(props)
        this.state = {}
    }
    componentDidMount(){

    }
    render(){
        return(<>
            <div className={styles.pageCenter}>
            <div> 账号日志 </div>
            </div>
           
        </>)
    }
}
