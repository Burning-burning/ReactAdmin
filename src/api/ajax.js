/*
能发送异步ajax请求的函数模块
封装axios库
函数的返回值是promise对象
1. 优化：统一处理请求异常
*/
import axios from 'axios'
import {message} from 'antd'
export default function ajax(url, data={}, type='GET'){

  return new Promise((resolve,reject)=>{
    //1. 执行异步ajax请求

    let promise
    if(type==='GET'){
      //发get请求
      promise =  axios.get(url,{ //配置对象
        params: data  //指定请求参数
      })
    }else{
      //发post请求
      promise = axios.post(url,data)
    }
    //2. 成功了，调用resolve(value)
    promise.then(response=>{

      resolve(response.data)
    })
    //3. 失败了，不能调用reject(reason)，通过提示异常信息
    promise.catch(error=>{
      message.error("请求出错了: "+error.message)
    })
  })

}

