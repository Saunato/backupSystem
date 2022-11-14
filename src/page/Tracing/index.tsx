// import React from "react";
import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import store from '../../redux/store';
import { Button, Form, Input, Divider, Steps, message } from 'antd';
import Card from './components/Card';
import { log } from '../../services/api';

export default function Tracing() {
  const history = useHistory();
  (store.getState().persistIsLogin as any).mode !== 'true' && history.replace('/');
  const [items, setItems] = useState([] as any[])

  const onFinish = (values: any) => {
    log(values).then((res) => {
      const { data } = res
      const newItems = data.map((item: any) => {
        const { sourceFileId, fileName, result, fileHash, chainHash, targetServerId, targetPath, consumedTime, startTime } = item
        return {
          title: startTime,
          description: <Card
            sourceFileId={sourceFileId}
            fileName={fileName}
            result={result}
            fileHash={fileHash}
            chainHash={chainHash}
            targetServerId={targetServerId}
            targetPath={targetPath}
            consumedTime={consumedTime}
          />
        }
      })
      setItems(newItems)
    }).catch((err) => {
      message.error({
        style: {
          marginTop: '100px'
        },
        content: err
      });
    })
  }

  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        layout='inline'
        onFinish={onFinish}
      >
        <Form.Item
          label="文件id"
          name="id"
          rules={[{ required: true, message: '请输入需要追溯的文件id' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            追溯
          </Button>
        </Form.Item>
      </Form>
      <Divider />
      <Steps
        progressDot
        current={items.length - 1}
        direction="vertical"
        items={items}
      />
    </>
  );
}