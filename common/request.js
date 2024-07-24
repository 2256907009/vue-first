import axios from 'axios';

// 创建一个 Axios 实例
const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/private/v1',  // 设置统一的 baseURL
  timeout: 10000,  // 请求超时时间
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
    // 在这里可以添加统一的请求头设置
  }
});

// 添加请求拦截器
instance.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么，例如加入 token
    // config.headers.Authorization = `Bearer ${getToken()}`;
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么，例如统一处理错误码
    return response.data;
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

// 封装 GET 请求
export const get = (url, params) => {
  return instance.get(url, {
    params
  });
};

// 封装 POST 请求
export const post = (url, data) => {
  return instance.post(url, data);
};

// 封装 PUT 请求
export const put = (url, data) => {
  return instance.put(url, data);
};

// 封装 DELETE 请求
export const del = (url) => {
  return instance.delete(url);
};
