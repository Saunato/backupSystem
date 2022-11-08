import serviceAxios from './index';

// 获取服务器列表
export const getServers = (data: any) => {
  return serviceAxios({
    url: "/server/query",
    method: "post",
    data,
  });
};

// 删除指定服务器
export const deleteServer = (data: any) => {
  return serviceAxios({
    url: "/server/delete",
    method: "post",
    data,
  });
};

// 修改指定服务器
export const updateServer = (data: any) => {
  return serviceAxios({
    url: "/server/update",
    method: "post",
    data,
  });
};

// 新增服务器
export const addServer = (data: any) => {
  return serviceAxios({
    url: "/server/add",
    method: "post",
    data,
  });
}