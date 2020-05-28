// 包含n个action函数的模块
// 同步action   对象  {type:'xxx',data:数据值}
// 异步action   函数  dispatch=>{}
import {SET_HEAD_TITLE,RECEIVE_USER,ERROR_MSG,RESET_USER} from './action-types'
import {reqLogin} from '../api'
import {message} from 'antd'
import storageUtils from '../utils/storageUtils'
export const setHeadTitle=(headTitle)=>({type:SET_HEAD_TITLE, data: headTitle})
export const receiveUser = (user)=>({type:RECEIVE_USER,user})
export const errorMsg = (msg)=>({type:ERROR_MSG,msg})

export const logout=()=>{
  storageUtils.removeUser()
  return ({
    type: RESET_USER,
    
  })
}
export const login=(username, password)=>{
  return async(dispatch)=>{
    const result = await reqLogin(username, password)
    if(result.status===0){
      const user = result.data
      storageUtils.saveUser(user)
      dispatch(receiveUser(user))

    }else{
      const msg = result.msg
      // dispatch(errorMsg(msg))
      message.error(msg)
    }
  }
}