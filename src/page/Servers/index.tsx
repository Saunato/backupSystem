import { useEffect, useState } from 'react'
import { useHistory  } from 'react-router-dom';
import store from '../../redux/store';

import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';


import { getServers } from '../../services/api';

interface DataType {
  id: number;
  address: string;
  port: number;
  name: string;
  password: string;
  city: string;
  status: number;
}

const serverStatusOption: any =  {
  0: "关机",
  1: "开机",
  2: "异常"
}

const columns: ColumnsType<DataType> = [
  {
    title: '服务器ID',
    dataIndex: 'id',
    key: 'id',
    // render: text => <a>{text}</a>,
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
];

export default function Servers() {
  const [servers, setServers] = useState([])
  const [total, setTotal] = useState(0)
  const [pageNum, setPageNum] = useState(1)
  const [pageSize, setSize] = useState(2)
  const history = useHistory();
  (store.getState().persistIsLogin as any).mode !== 'true' && history.replace('/');

  const paginationProps = {
    current: pageNum, //当前页码
    pageSize, // 每页数据条数
    // showTotal: () => (
    //   <span>总共{total}项</span>
    // ),
    total, // 总条数
    onChange: (page: any) => handlePageChange(page), //改变页码的函数
    hideOnSinglePage: false,
    showSizeChanger: false,
  };

   // 改变页码的回调 page代表页码数 pageSize代表每页条数
   const handlePageChange = (page: any) => {
    setPageNum(page)
  };

  useEffect(() => {
    getServers({
      pageNo: pageNum,
      pageSize
    }).then((res)=>{
      const { data } = res
      const { total } = data
      const serverData = data.data
      setServers(serverData)
      setTotal(total)
    })
  }, [pageNum, pageSize])
  

  return (
    <Table columns={columns} pagination={paginationProps} dataSource={servers} />
  );
}