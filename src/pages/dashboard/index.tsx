import React, { Component } from 'react';
import { Button, Table, Modal, Form, Input, message, Select } from 'antd';
import { FormInstance } from 'antd/lib/form';
import styles from './index.module.less';
import { observer, inject } from 'mobx-react'
const { Item } = Form
const { Option } = Select
interface IState {
  loading: boolean
}
interface IProps {
  history?: any,
}
class IndexPage extends Component<IProps, IState>{

  state: IState = {
    loading: false
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className={styles.pageCenter}>
        <div> 首页 </div>
        </div>
    )
  }
};

export default IndexPage;