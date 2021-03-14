import React, { FC, useState } from 'react';
import { Modal, Form, Button, Cascader, message } from 'antd';
const { Item } = Form

interface IProps {
//   Store?: any;
  batchExportVisible?: boolean;
  selectedRowKeys?: any[];
  hideModal?: any;
  afterExport?: any;
}
const BatchExportModal:FC<IProps> = props => {
  // const [loading, setLoading] = useState<boolean>(false);

  const handleCancel = () => {
    props.hideModal()
  }
  
  const onFinish = async(values: any) => {
    //导出成功
    props.afterExport()
    props.hideModal()
  }
  const { batchExportVisible, selectedRowKeys} = props
  return (
    <div>
      <Modal
        title='批量导出'
        centered
        visible={batchExportVisible}
        onCancel={handleCancel}
        width={530}
        closable={false}
        maskClosable={false}
        getContainer={false}
        footer={null}
      >
        <span>预览{selectedRowKeys}</span>
        <div style={{display:'flex',justifyContent:'center',marginTop:'15px'}}>
            <Button type="primary" onClick={onFinish}>确认</Button>
            <Button onClick={handleCancel} style={{marginLeft:'10px'}}>取消</Button>
        </div>
      </Modal>
    </div>
  );
}
export default BatchExportModal;