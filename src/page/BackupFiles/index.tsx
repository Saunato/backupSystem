// import React from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import store from "../../redux/store";
import { Badge, Descriptions, Pagination, Card, Drawer, Button, Dropdown, Space, Typography, List } from "antd";
import { DownOutlined } from '@ant-design/icons';
import "./style.css";

const res = {
  status: 0,
  message: "操作成功",
  data: [
    {
      id: 3,
      userId: 1,
      sourceServerId: 1,
      sourceServerAddress: "192.168.1.3",
      sourcePath: "/usr/local/src",
      fileName: "data.conf",
      mode: 1,
      startTime: "2022-9-12",
      frequency: "2",
      settingId: 1,
      status: 1,
      targetServer: [
        {
          id: 1,
          address: "192.168.1.0",
          port: 5050,
          name: "root",
          password: "pwd",
          city: "上海",
          status: 1,
          targetPath: "/111/111",
        },
        {
          id: 2,
          address: "192.168.1.1",
          port: 5050,
          name: "root",
          password: "pwd",
          city: "上海",
          status: 1,
          targetPath: "/333/222",
        },
      ],
    },
    {
      id: 4,
      userId: 1,
      sourceServerId: 2,
      souceServerAddress: "192.168.1.2",
      sourcePath: "/root",
      fileName: "msg.conf",
      mode: 1,
      startTime: "2022-9-12",
      freuency: "2",
      settingId: 1,
      status: 2,
      targetServer: [
        {
          id: 1,
          address: "192.168.1.2",
          port: 5050,
          name: "root",
          password: "pwd",
          city: "上海",
          status: 1,
          targetPath: "/111/111",
        },
        {
          id: 2,
          address: "192.168.1.3",
          port: 5050,
          name: "root",
          password: "pwd",
          city: "上海",
          status: 1,
          targetPath: "/333/222",
        },
      ],
    },
  ],
  timestamp: 1667808584687,
};

export default function BackupFiles() {
  const history = useHistory();
  const [open, setOpen] = useState(-1);
  const [result, setResult] = useState(res.data);
  (store.getState().persistIsLogin as any).mode !== "true" &&
    history.replace("/");

  const showDrawer = (idx: number) => {
    setOpen(idx);
  };

  const closeDrawer = () => {
    setOpen(-1);
  };

  // 目标服务器列表
  const renderDrawer = (data: any) => {
    console.log(data);
    return (
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item: any) => (
          <List.Item>
            <List.Item.Meta
              title={item.address}
              description={
                <div>
                  <p>端口号：{item.port}</p>
                  <p>城市：{item.city}</p>
                  <p>路径：{item.targetPath}</p>
                </div>
              }
            />
          </List.Item>
        )}
      />
    )
  };

  // 备份频率
  const lepusGetBackupFrequency = (frequency: string, id: number) => {
    const frequencyMap: any = {
      "0": "每年",
      "1": "每月",
      "2": "每周",
      "3": "每日",
      "-1": "暂无"
    }
    const items: any = [
      {
        key: '0',
        label: '每年'
      },
      {
        key: '1',
        label: '每月'
      },
      {
        key: '2',
        label: '每周'
      },
      {
        key: '3',
        label: '每日'
      },
      {
        key: '-1',
        label: '暂无'
      }
    ];
    const frequencyDesc: string = frequencyMap[frequency]
    return (
      <Dropdown
        menu={{
          items,
          selectable: true,
          defaultSelectedKeys: [frequency],
          onClick: (e) => setBackupFrequency(e, id)
        }}
      >
        <Typography.Link>
          <Space>
            {frequencyDesc}
            <DownOutlined />
          </Space>
        </Typography.Link>
      </Dropdown>
    )
  }

  // 修改备份频率
  const setBackupFrequency = (e: any, id:number) => {
    const key = e.key
    const newRes = result.map(item => {
      if (item.id !== id) return item
      item.frequency = key
      return item
    })
    setResult(newRes)
  }

  // 备份状态
  const lepusGetBackupStatus = (status: number) => {
    if (status === 0 ) {
      return (
        <Badge status="processing" text="已经备份，正常" />
      )
    }
    if (status === 1 ) {
      return (
        <Badge status="error" text="危险状态" style={{color: "red"}}/>
      )
    }
    if (status === 2 ) {
      return (
        <Badge status="warning" text="未备份" />
      )
    }
  }

  // 备份模式
  const lepusGetBackupMode = (mode: number, id: number) => {
    const items: any = [
      {
        key: '0',
        label: '自动'
      },
      {
        key: '1',
        label: '手动'
      },
    ];
    return (
      <Dropdown
        menu={{
          items,
          selectable: true,
          defaultSelectedKeys: [String(mode)],
          onClick: (e) => setBackupMode(e, id)
        }}
      >
        <Typography.Link>
          <Space>
            {mode === 0 ? "自动" : "手动"}
            <DownOutlined />
          </Space>
        </Typography.Link>
      </Dropdown>
    )
  }

  // 修改备份模式
  const setBackupMode = (e: any, id: number) => {
    const key = e.key
    const newRes = result.map(item => {
      if (item.id !== id) return item
      item.mode = key * 1
      return item
    })
    setResult(newRes)
  }

  const renderBlock = (data: any, idx: number) => {
    return (
      <div className="backup-file-block" key={data.id}>
        <Card
          title={"已备份文件：" + data.fileName}
          bordered={false}
          style={{ width: "100%", display: "inline-block" }}
        >
          <Descriptions
            bordered
            contentStyle={{ background: "white", maxWidth: "400px" }}
            column={3}
          >
            <Descriptions.Item label="id">{data.id || "id"}</Descriptions.Item>
            <Descriptions.Item label="源服务器id">
              {data.sourceServerId || "sourceServerId"}
            </Descriptions.Item>
            <Descriptions.Item label="源服务器地址">
              {data.sourceServerAddress || "sourceServerAddress"}
            </Descriptions.Item>
            <Descriptions.Item label="源文件路径">
              {data.sourcePath || "sourceServerPath"}
            </Descriptions.Item>
            <Descriptions.Item label="备份模式">
              {lepusGetBackupMode(data.mode, data.id)}
            </Descriptions.Item>
            <Descriptions.Item label="备份频率">
              {lepusGetBackupFrequency(data.frequency || "-1", data.id)}
            </Descriptions.Item>
            <Descriptions.Item label="备份时间">
              {data.startTime || "2023-06-20"}
            </Descriptions.Item>
            <Descriptions.Item label="备份状态" span={3}>
              {lepusGetBackupStatus(data.status || 1)}
            </Descriptions.Item>
            <Descriptions.Item label="目标服务器">
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
          style={{ position: "absolute" }}
        >
          {renderDrawer(data.targetServer)}
        </Drawer>
      </div>
    );
  };

  return (
    <div className="backup-files-container">
      <div className="backup-files">{result.map(renderBlock)}</div>
      <div className="backup-files-pagination">
        <Pagination defaultCurrent={1} total={10} pageSize={4} />
      </div>
    </div>
  );
}
