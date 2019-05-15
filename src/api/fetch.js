import axios from "axios";
export default function fetch(options) {
  return new Promise(function(resolve, reject) {
    const instance = axios.create({
      baseURL: "http://www.11lang.cn/api"
    });
    instance.interceptors.response.use(
      response => {
        let data;
        // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
        if (response.data === undefined) {
          data = response.request.responseText;
        } else {
          data = response.data;
        }
        return data;
      },
      err => {
        // 根据接口返回状态吗来统一处理报错
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = "请求错误";
              break;
            case 401:
              err.message = "未授权，请登录";
              break;
            case 403:
              err.message = err.response.data && err.response.data.detail;
              break;
            case 404:
              err.message = "未找到查询对象";
              break;
            case 408:
              err.message = "请求超时";
              break;
            case 500:
              err.message = "服务器出错,请稍后再试";
              break;
            case 501:
              err.message = "服务未实现";
              break;
            case 502:
              err.message = "网关错误";
              break;
            case 503:
              err.message = "服务不可用";
              break;
            case 504:
              err.message = "网关超时";
              break;
            case 505:
              err.message = "HTTP版本不受支持";
              break;
            default:
          }
        }
        reject(err); // 返回接口返回的错误信息
      }
    );
    instance(options)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}
