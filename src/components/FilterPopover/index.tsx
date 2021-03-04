import React, { FC } from 'react';
import { Popover, Checkbox, Row, Col } from 'antd';
import styles from './index.module.less';
const CheckboxGroup = Checkbox.Group;
interface IProps {
  itemName?: any;
  defaultValue?: any[];
  plainOptions: any[];
  handleCheckChange?: any;
}

const FilterPopover:FC<IProps> = props => {
  const {
    itemName,
    defaultValue,
    plainOptions,
    handleCheckChange,
  } = props;

  const handleChange = (data: any) => {
    localStorage.setItem(itemName,JSON.stringify(data))
    handleCheckChange(data)
  }
  const content = (
    <CheckboxGroup defaultValue={defaultValue} onChange={handleChange} style={{width: '400px'}}>
      <Row>
        {
          plainOptions.map((item: any) =>{
            return <Col span={8} key={item.id}><Checkbox disabled={item.disabled} value={item.value}>{item.label}</Checkbox></Col>
          })
        }
      </Row>
    </CheckboxGroup>
  );
  return (
    <Popover content={content} placement="topLeft" trigger="click">
      <div className={styles.list}>列表</div>
    </Popover>
  )
}
export default FilterPopover;