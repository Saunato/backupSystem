import serviceAxios from './index';

// 获取服务器列表
export const getServers = (data: any) => {
    return serviceAxios({
      url: "/server/query",
      method: "post",
      data,
    });
  };