// import React from "react";
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import store from "../../redux/store";
import { Badge, Descriptions, Pagination, Card, Drawer, Button } from "antd";
import './style.css';

export default function BackupFiles() {
  const history = useHistory();
  const [open, setOpen] = useState(-1);
  (store.getState().persistIsLogin as any).mode !== "true" &&
    history.replace("/");

  const res = {
    status: 0,
    message: "操作成功",
    data: [
      {
        id: 3,
        userId: 2,
        sourceServerId: 1,
        sourceServerAddress: "192.168.1.3",
        sourcePath: "/usr/local/src",
        fileName: "data.conf",
        mode: 0,
        startTime: "2022-07-11",
        frequency: 0,
        settingId: 1,
        status: 1,
        targetServer: [
          {
            id: 2,
            address: "192.168.1.4",
            port: 5050,
            name: "root",
            password: "pwd",
            city: "北京",
            status: 1,
            targetPath: "/root/newpath",
          },
        ],
      },
      {
        id: 3,
        userId: 2,
        sourceServerId: 1,
        sourceServerAddress: "192.168.1.3",
        sourcePath: "/usr/local/src",
        fileName: "data.conf",
        mode: 0,
        startTime: "2022-07-11",
        frequency: 0,
        settingId: 1,
        status: 1,
        targetServer: [
          {
            id: 2,
            address: "192.168.1.4",
            port: 5050,
            name: "root",
            password: "pwd",
            city: "北京",
            status: 1,
            targetPath: "/root/newpath",
          },
        ],
      },
      {
        id: 4,
        userId: 2,
        sourceServerId: 2,
        sourceServerAddress: "192.168.1.4",
        sourcePath: "/root",
        fileName: "msg.conf",
        mode: 1,
        startTime: "2022-09-12",
        frequency: 1,
        settingId: 2,
        status: 2,
        targetServer: [
          {
            id: 3,
            address: "192.168.1.5",
            port: 5050,
            name: "root",
            password: "pwd",
            city: "江苏",
            status: 2,
            targetPath: "/444/444",
          },
          {
            id: 2,
            address: "192.168.1.4",
            port: 5050,
            name: "root",
            password: "pwd",
            city: "北京",
            status: 1,
            targetPath: "/555/555",
          },
        ],
      },
    ],
    timestamp: 1667808584687,
  };

  const renderDrawer = (data: any) => {
  }

  const showDrawer = (idx: number) => {
    setOpen(idx)
  }

  const closeDrawer = () => {
    setOpen(-1)
  }

  const renderBlock = (data: any, idx: number) => {
    return (
      <div className="backup-file-block">
        <Card title={data.fileName} bordered={false} style={{ width: '100%', display: 'inline-block'}}>
          <Descriptions bordered contentStyle={{ background: "white", maxWidth: "400px"}} column={3}>
            <Descriptions.Item label="id">{data.id || 'id'}</Descriptions.Item>
            <Descriptions.Item label="sourceServerId">{data.sourceServerId || 'sourceServerId'}</Descriptions.Item>
            <Descriptions.Item label="sourceServerAddress">
              {data.sourceServerAddress || 'sourceServerAddress'}
            </Descriptions.Item>
            <Descriptions.Item label="start time">{data.startTime || '2023-06-20'}</Descriptions.Item>
            <Descriptions.Item label="Status" span={3}>
              <Badge status="processing" text="Running" />
            </Descriptions.Item>
            <Descriptions.Item label="target Server">
            <Button type="link" onClick={() => showDrawer(idx)}>
              check
            </Button>
            </Descriptions.Item>
          </Descriptions>
        </Card>
        <Drawer
          placement="right"
          closable={false}
          onClose={closeDrawer}
          open={open === idx}
          getContainer={false}
          style={{ position: 'absolute' }}
        >
          <p>Some contents...</p>
        </Drawer>
      </div>
      
    );
  };

  return (
    <div className="backup-files-container">
      <div className="backup-files">
        {res.data.map(renderBlock)}
      </div>
      <div className="backup-files-pagination">
        <Pagination defaultCurrent={1} total={10} pageSize={4}/>
      </div>
    </div>

  );
}
