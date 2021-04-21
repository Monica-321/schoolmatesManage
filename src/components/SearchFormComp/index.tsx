import React, { Component } from 'react';
import { Form, Input, Select, Button, DatePicker, Cascader, Col} from 'antd';
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
  isRightBtn?: boolean;   // 查询按钮是否右浮
  hasResetBtn?:boolean;  //是否有重置
  hasQueryBtn?:boolean;  //是否有查询
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
    // 设置初始值
    let initialValues:any = {}
    this.props.formItems.forEach((item: any) => {
      initialValues[item.name] = item.initialValue
    })
    this.formRef.current?.setFieldsValue(initialValues);
  }

  handleQuery = () => {
    const formValues = this.formRef.current?.getFieldsValue();
    this.props.handleQuery(formValues)
  }

  handleReset = () => {
    this.clearForm()
    this.props.handleReset();
  }

  clearForm = () => {
    this.formRef.current?.resetFields();
  }

  toggleShow = () => {
    this.setState({
      visibleAll: !this.state.visibleAll
    })
  }

  render() {
    const {visibleAll} = this.state
    const { formItems, isRightBtn=true , hasResetBtn=true,hasQueryBtn=true} = this.props
    const layout={labelCol:{span:8},wrapperCol:{span:15}}
    return (
      <div className={styles.warp}>
        <Form layout="inline" {...layout} ref={this.formRef}>
          {formItems.map((item: any, index: number) => {
            switch (item.el) {
              // 输入框(主要参数: el, label, name, placeholder, style, isAllowClear, autoComplete, initialValue)
              case 'input':
                return (
                  <Col span={6}>
                  <Item
                    label={item.label} 
                    name={item.name} 
                    key={item.name} 
                    className={index > 5 ? (visibleAll ? styles.show : styles.hide) : ''}
                  > 
                    <Input
                      placeholder={item.placeholder}
                      style={item.style}
                      className='inputMarginB'
                      allowClear={item.isAllowClear}
                      autoComplete={item.autoComplete}
                    />
                  </Item>
                  </Col>
                )
              // 下拉选择(主要参数: el, label, name, placeholder, selectMode, selectOptions, selectField(label, value), style, isAllowClear, initialValue)
              case 'select':
                return (
                  <Col span={6}>
                  <Item
                    label={item.label}
                    name={item.name}
                    key={item.name}
                    className={index > 5 ? (visibleAll ? styles.show : styles.hide) : ''}
                  >
                    <Select
                      placeholder={item.placeholder}
                      mode={item.selectMode} 
                      style={item.style}
                      className='inputMarginB'
                      allowClear={item.isAllowClear}
                      defaultValue={item.initialValue}
                      onChange={item.onChange}
                    >
                      {
                        item.selectOptions.map((sel: any) => <Option value={sel[item.selectField['value']]} key={sel[item.selectField['value']]}>{sel[item.selectField['label']]}</Option>)
                      }
                    </Select>
                  </Item>
                  </Col>
                )
              // 级联选择(主要参数: el, label, name, placeholder, cascaderOptions, isChangeOnSelect, style, isAllowClear, initialValue)
              case 'cascader':
                return (
                  <Col span={6}>
                  <Item
                    label={item.label}
                    name={item.name}
                    key={item.name}
                    className={index > 5 ? (visibleAll ? styles.show : styles.hide) : ''}
                  >
                    <Cascader
                      placeholder={item.placeholder}
                      options={item.cascaderOptions}
                      changeOnSelect={item.isChangeOnSelect}
                      style={item.style}
                      className='inputMarginB'
                      allowClear={item.isAllowClear}
                    />
                  </Item>
                  </Col>
                )
              // 时间范围选择(主要参数: el, label, name, placeholder, pickerType, style, initialValue)
              case 'rangePicker':
                return (
                  <Col span={6}>
                  <Item
                    label={item.label}
                    name={item.name}
                    key={item.name}
                    className={index > 5 ? (visibleAll ? styles.show : styles.hide) : ''}
                  >
                    <RangePicker
                      placeholder={item.placeholder}
                      picker={item.pickerType}
                      className='inputMarginB'
                    />
                  </Item>
                  </Col>
                )
              // 日期选择(主要参数: el, label, name, placeholder, pickerType, format, style, initialValue)
              case 'datePicker':
                return (
                  <Col span={6}>
                  <Item
                    label={item.label}
                    name={item.name}
                    key={item.name}
                    className={index > 5 ? (visibleAll ? styles.show : styles.hide) : ''}
                  >
                    <DatePicker
                      placeholder={item.placeholder}
                      picker={item.pickerType}
                      format={item.format}
                      style={item.style}
                      className='inputMarginB'
                    />
                  </Item>
                  </Col>
                )
              default:
                return null
            }
          })}
          {!isRightBtn && (
            <Col span={4}>
              <Item>
              { hasQueryBtn &&<Button type="primary" onClick={this.handleQuery} style={{marginRight: 10, marginBottom: 18}}>查询</Button>
               }{  hasResetBtn &&
                <Button onClick={this.handleReset}>重置</Button>
               }
              </Item>
            </Col>
          )}
        </Form>
        {isRightBtn && (
          <div className={styles.btnWrap}>
            { hasQueryBtn && <Button type="primary" onClick={this.handleQuery} style={{marginRight: 10, marginBottom: 18}}>查询</Button>
            }{  hasResetBtn &&
              <Button onClick={this.handleReset}>重置</Button>
            }
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
        )}
      </div>
    )
  }
}
export default SearchFormComp;