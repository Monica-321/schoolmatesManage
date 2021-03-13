import React, { Component } from 'react';
import { Modal, Button } from 'antd'
import styles from './index.module.less';
interface IProps {
  visible:boolean;
  title?: string;
  width?: number;
  children?:any;
  isConfirmBtn?: boolean;
  isCancelBtn?: boolean;
  isCloseBtn?: boolean;
  handleOk?: any;
  handleCancel?: any;
  wrapClassName?: string;
};
class InfoModal extends Component<IProps> {
  render() {
    const {visible, title, children, width, handleOk, handleCancel,
      isConfirmBtn=true, isCancelBtn=true, isCloseBtn=false, wrapClassName} = this.props
    return (
      <Modal
        title={title} 
        width={width || 380}
        visible={visible} 
        onCancel={handleCancel}
        closable={false}
        maskClosable={false}
        getContainer={false}
        footer={null}
        centered
      >
        <div className={wrapClassName || styles.centerWrap}>
          {children}
          {isConfirmBtn && <Button type="primary" onClick={handleOk} style={{marginRight:'10px'}} className="mt10 mr10">确认</Button>}
          {isCancelBtn && <Button onClick={handleCancel}>取消</Button>}
          {isCloseBtn && <p className={styles.btnClose}><Button type="primary" onClick={handleCancel}>关闭</Button></p>}
        </div>
      </Modal>
    )
  }
}

export default InfoModal