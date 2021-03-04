import React, { Component } from 'react';
import { Form, Input, Select, Button, DatePicker } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import styles from './index.module.less';
const { Item } = Form
const { Option } = Select;
const { RangePicker } = DatePicker;

interface IProps {
  handleQuery?: any;
  handleReset?: any;
  onRef?: any;
  formItems?: any;
}

interface IState {
  visibleAll: boolean;
}

class SearchFormComp extends Component<IProps, IState> {
  formRef: React.RefObject<FormInstance>
  constructor(prop: IProps){
    super(prop)
    this.formRef = React.createRef<FormInstance>()
  }

  state = {
    visibleAll: false
  }

  componentDidMount() {
    this.props.onRef(this)
  }

  handleQuery = () => {
    const formValues = this.formRef.current?.getFieldsValue();
    this.props.handleQuery(formValues)
  }

  handleReset = () => {
    this.formRef.current?.resetFields();
    this.props.handleReset();
  }

  toggleShow = () => {
    this.setState({
      visibleAll: !this.state.visibleAll
    })
  }

  render() {
    const {visibleAll} = this.state
    const { formItems } = this.props
    return (
      <div className={styles.warp}>
        <Form layout="inline" ref={this.formRef}>
          {formItems.map((item: any, index: number) => {
            switch (item.el) {
              case 'input':
                return (
                  <Item label={item.label} name={item.name} key={item.name} className={index > 5 ? (visibleAll ? styles.show : styles.hide) : ''}> 
                    <Input placeholder={item.placeholder} style={item.style} allowClear={item.isAllowClear} autoComplete={item.isAutoComplete}/>
                  </Item>
                )
              case 'select':
                return (
                  <Item label={item.label} name={item.name} key={item.name} className={index > 5 ? (visibleAll ? styles.show : styles.hide) : ''}>
                    <Select placeholder={item.placeholder} mode={item.selectMode} style={item.style} allowClear={item.isAllowClear}>
                      {
                        item.selectOptions.map((sel: any) => <Option value={sel[item.selectField['value']]} key={sel[item.selectField['value']]}>{sel[item.selectField['label']]}</Option>)
                      }
                    </Select>
                  </Item>
                )
              case 'rangePicker':
                return (
                  <Item label={item.label} name={item.name} key={item.name} className={index > 5 ? (visibleAll ? styles.show : styles.hide) : ''}>
                    <RangePicker />
                  </Item>
                )
              default:
                return null
            }
          })}
        </Form>
        <div className={styles.btnWrap}>
          <Button type="primary" onClick={this.handleQuery} style={{marginRight: 10, marginBottom: 18}}>查询</Button>
          <Button onClick={this.handleReset}>重置</Button>
          {formItems.length > 6 && 
            <Button type="link" onClick={this.toggleShow}>
              {visibleAll
                ? <span>
                    收起<UpOutlined />
                  </span>
                : <span>
                    展开<DownOutlined />
                  </span>
              }
            </Button>
          }
        </div>
      </div>
    )
  }
}
export default SearchFormComp;