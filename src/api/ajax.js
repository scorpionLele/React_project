import axios from "axios";
import qs from "qs";
import {message} from "antd";


axios.interceptors.request.use((config)=>{
  const {method,data} = config
  
  if (method.toUpperCase() === 'POST' && data instanceof Object) {
    config.data = qs.stringify(data)
  }
  return config
})
axios.interceptors.response.use(
  response=>{
    return response.data
  },
  error=>{
    message.error('请求错误：' + error.message)
    return new Promise(()=>{})
  }
)






export default axios;