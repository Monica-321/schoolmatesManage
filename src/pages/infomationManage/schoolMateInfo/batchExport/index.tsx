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
  const [form] = Form.useForm();
  // const [loading, setLoading] = useState<boolean>(false);

  const handleCancel = () => {
    form.resetFields()
    props.hideModal()
  }
  
  const onFinish = async(values: any) => {
    
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  }

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 14 },
  };
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
        <Form
          {...layout}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <span>预览{selectedRowKeys}</span>
          <Item {...tailLayout}>
            <Button type="primary" htmlType="submit" className="mt10 mr10">确认</Button>
            <Button onClick={handleCancel} style={{marginLeft:'10px'}}>取消</Button>
          </Item>
        </Form>
      </Modal>
    </div>
  );
}
export default BatchExportModal;