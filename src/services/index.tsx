import axios from "axios";

// 创建axios请求实例
const serviceAxios = axios.create({
    baseURL: "http://123.56.116.210:8080", // 基础请求地址
    timeout: 10000, // 请求超时设置
    withCredentials: false, // 跨域请求是否需要携带 cookie
  });

// 创建请求拦截
// serviceAxios.interceptors.request.use(
//     (config: any) => {
//       // 设置请求头
//       if(!config.headers["content-type"]) { // 如果没有设置请求头
//         if(config.method === 'post') {
//           config.headers["content-type"] = "application/json"; // post 请求
//           config.data = JSON.stringify(config.data); // 序列化,比如表单数据
//         } else {
//           config.headers["content-type"] = "application/json"; // 默认类型
//         }
//       }
//       console.log("请求配置", config);
//       return config;
//     },
//     (error) => {
//       Promise.reject(error);
//     }
//   );

  // 创建响应拦截
serviceAxios.interceptors.response.use(
    (res) => {
      let { data } = res;
      return data;
    },
    (error) => {
      let message = "";
      if (error && error.response) {
        switch (error.response.status) {
          case 302:
            message = "接口重定向了！";
            break;
          case 400:
            message = "参数不正确！";
            break;
          case 401:
            message = "您未登录，或者登录已经超时，请先登录！";
            break;
          case 403:
            message = "您没有权限操作！";
            break;
          case 404:
            message = `请求地址出错: ${error.response.config.url}`;
            break;
          case 408:
            message = "请求超时！";
            break;
          case 409:
            message = "系统已存在相同数据！";
            break;
          case 500:
            message = "服务器内部错误！";
            break;
          case 501:
            message = "服务未实现！";
            break;
          case 502:
            message = "网关错误！";
            break;
          case 503:
            message = "服务不可用！";
            break;
          case 504:
            message = "服务暂时无法访问，请稍后再试！";
            break;
          case 505:
            message = "HTTP 版本不受支持！";
            break;
          default:
            message = "异常问题，请联系管理员！";
            break;
        }
      }
      return Promise.reject(message);
    }
  );

  export default serviceAxios;