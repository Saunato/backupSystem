import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import store from '../../redux/store';

import { Space, Table, Tag, message, Popconfirm, Modal, Button, Radio, Form, Input, Drawer } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';


import { getServers, deleteServer, updateServer, addServer } from '../../services/api';

interface DataType {
  id: number;
  address: string;
  port: number;
  name: string;
  password: string;
  city: string;
  status: number;
}

const serverStatusOption: any = {
  0: "关机",
  1: "开机",
  2: "异常"
}

const pageSize = 10

export default function Servers() {
  // 服务器详情
  const [servers, setServers] = useState([] as any[])
  // 服务器总数
  const [total, setTotal] = useState(0)
  // 当前页码
  const [pageNum, setPageNum] = useState(1)
  // 修改弹窗是否可见
  const [isUpdateVisible, setIsUpdateVisible] = useState(false)
  // 修改提交按钮是否loading
  const [isUpdateLoading, setIsUpdateLoading] = useState(false)
  // 修改弹窗是否可见
  const [isAddVisible, setIsAddVisible] = useState(false)
  // 修改提交按钮是否loading
  const [isAddLoading, setIsAddLoading] = useState(false)
  const history = useHistory();
  const [updateForm] = Form.useForm<any>();
  const [addForm] = Form.useForm<any>();
  (store.getState().persistIsLogin as any).mode !== 'true' && history.replace('/');

  const confirmDelete = (id: number) => {
    deleteServer({
      id
    }).then((res) => {
      const { status } = res
      if (status === 0) {
        const newServers = servers.filter((item) => {
          return item.id !== id
        })
        setServers(newServers)
        message.success({
          style: {
            marginTop: '100px'
          },
          content: '删除成功！'
        });
      }
      if (status === 2) {
        message.error({
          style: {
            marginTop: '100px'
          },
          content: '服务器正被使用！'
        });
      }
    }).catch((err) => {
      message.error({
        style: {
          marginTop: '100px'
        },
        content: err
      });
    })
  }

  const confirmUpdate = () => {
    setIsUpdateLoading(true)
    const values = updateForm.getFieldsValue()
    updateServer(values).then(() => {
      const newServers = servers.map((item) => {
        if (item.id === values.id) {
          return values
        }
        return item
      })
      setServers(newServers)
      message.success({
        style: {
          marginTop: '100px'
        },
        content: '修改成功！'
      });
      setIsUpdateLoading(false)
      setIsUpdateVisible(false)
    }).catch((err) => {
      message.error({
        style: {
          marginTop: '100px'
        },
        content: err
      });
    })
  }

  const confirmAdd = () =>{
    setIsAddLoading(true)
    const values = addForm.getFieldsValue()
    console.log(values)
    addServer(values).then(()=>{
      message.success({
        style: {
          marginTop: '100px'
        },
        content: '新增成功！'
      });
      setIsAddLoading(false)
      getServers({
        pageNo: pageNum,
        pageSize
      }).then((res) => {
        const { data } = res
        const { total } = data
        const serverData = data.data
        setServers(serverData)
        setTotal(total)
      }).catch((err)=>{
        message.error({
          style: {
            marginTop: '100px'
          },
          content: err
        });
      })
    }).catch((err)=>{
      message.error({
        style: {
          marginTop: '100px'
        },
        content: err
      });
    })
  }

  const columns: ColumnsType<DataType> = [
    {
      title: '服务器ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'IP地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '端口号',
      dataIndex: 'port',
      key: 'port',
    },
    {
      title: '管理员账户',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '管理员密码',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: '服务器所处城市',
      dataIndex: 'city',
      key: 'city',
      render: (_, { city }) => (
        <>
          <Tag color={'geekblue'} key={city}>
            {city.toUpperCase()}
          </Tag>
        </>
      ),
    },
    {
      title: '服务器状态',
      dataIndex: 'status',
      key: 'status',
      render: (_, { status }) => {
        return (
          <Tag color={status === 2 ? 'volcano' : 'green'}>
            {serverStatusOption[status]}
          </Tag>
        );
      },
    },
    {
      title: '操作',
      key: 'operate',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => {
            setIsUpdateVisible(true)
            updateForm.setFieldsValue(record)
          }}>修改</a>
          <Modal
            title="修改服务器配置"
            open={isUpdateVisible}
            footer={null}
            onCancel={() => {
              setIsUpdateVisible(false)
            }}
          >
            <Form
              name="update"
              form={updateForm}
              onFinish={() => { confirmUpdate() }}
            >
              <Form.Item
                label="服务器ID"
                name="id"
                rules={[{ required: true }]}
              >
                <Input disabled />
              </Form.Item>

              <Form.Item
                label="IP地址"
                name="address"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="端口号"
                name="port"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="管理员账号"
                name="name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="管理员密码"
                name="password"
                rules={[{ required: true }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="服务器所处城市"
                name="city"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="服务器状态"
                name="status"
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio value={0}>关机</Radio>
                  <Radio value={1}>开机</Radio>
                  <Radio value={2}>异常</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
                <Button type="primary" htmlType="submit" loading={isUpdateLoading}>
                  提交
                </Button>
              </Form.Item>
            </Form>
          </Modal>
          <Popconfirm
            title="你确定要删除吗？此操作无法撤销！"
            onConfirm={() => {
              confirmDelete(record.id)
            }}
            okText="确认"
            cancelText="取消"
            placement="left"
          >
            <a href="#">删除</a>
          </Popconfirm>
        </Space>
      ),
    }
  ];

  const paginationProps: any = {
    current: pageNum, //当前页码
    pageSize, // 每页数据条数
    // showTotal: () => (
    //   <span>总共{total}项</span>
    // ),
    total, // 总条数
    onChange: (page: any) => handlePageChange(page), //改变页码的函数
    hideOnSinglePage: false,
    showSizeChanger: false,
    position: ['bottomCenter']
  };

  // 改变页码的回调 page代表页码数 pageSize代表每页条数
  const handlePageChange = (page: any) => {
    setPageNum(page)
  };

  useEffect(() => {
    getServers({
      pageNo: pageNum,
      pageSize
    }).then((res) => {
      const { data } = res
      const { total } = data
      const serverData = data.data
      setServers(serverData)
      setTotal(total)
    }).catch((err)=>{
      message.error({
        style: {
          marginTop: '100px'
        },
        content: err
      });
    })
  }, [pageNum, pageSize])


  return (
    <>
      {/* <Button style={{marginBottom: '10px'}} type="primary" onClick={() => { setIsAddVisible(true) }} icon={<PlusOutlined />}>新增服务器</Button> */}
      <div className="backup-file-add">
        <PlusOutlined style={{display: "inline-block", marginLeft: "50%", transform: "translateX(-50%)"}} onClick={() => { setIsAddVisible(true) }}/>
      </div>
      <Drawer
        title="新增服务器"
        placement="right"
        onClose={() => { setIsAddVisible(false) }}
        open={isAddVisible}
        zIndex={9999}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form
          name="add"
          onFinish={() => { confirmAdd() }}
          form={addForm}
        >
          <Form.Item
            label="IP地址"
            name="address"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="端口号"
            name="port"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="管理员账号"
            name="name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="管理员密码"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="服务器所处城市"
            name="city"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="服务器状态"
            name="status"
            rules={[{ required: true }]}
          >
            <Radio.Group>
              <Radio value={0}>关机</Radio>
              <Radio value={1}>开机</Radio>
              <Radio value={2}>异常</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
            <Button type="primary" htmlType="submit" loading={isAddLoading}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
      <Table columns={columns} pagination={paginationProps} dataSource={servers} />
    </>
  );
}