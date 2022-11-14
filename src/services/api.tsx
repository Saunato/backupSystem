import serviceAxios from './index';

// 登录
export const login = (data: any) => {
  return serviceAxios({
    url: "/user/login",
    method: "post",
    data,
  });
}

// 注册
export const signOn = (data: any) => {
  return serviceAxios({
    url: "/user/register",
    method: "post",
    data,
  });
}

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

// 新增备份文件
export const addBackupFile = (data: any) => {
  return serviceAxios({
    url: "/file/add",
    method: "post",
    data,
  });
}

// 查询可备份服务器
export const queryAvailableServers = () => {
  return serviceAxios({
    url: "/file/queryAvailableServers",
    method: "post",
  });
}

// 修改备份设置
export const updateBackupSetting = (data: any) => {
  return serviceAxios({
    url: "/setting/update",
    method: "post",
    data,
  });
}

// 修改备份文件状态
export const updateBackupFileStatus = (data: any) => {
  return serviceAxios({
    url: "/file/updateStatus",
    method: "post",
    data,
  });
}

// 分页查询备份文件
export const queryFileByPage = (data: any) => {
  return serviceAxios({
    url: "/file/query",
    method: "post",
    data,
  });
}

// 文件追溯
export const log = (data: any) => {
  return serviceAxios({
    url: "/log/query",
    method: "post",
    data,
  });
}