// 根据现有的state和指定的action返回新的state的函数
import storageUtils from '../utils/storageUtils'
import {combineReducers} from 'redux'
import {SET_HEAD_TITLE,RECEIVE_USER,ERROR_MSG,RESET_USER} from './action-types'
const initHeadTitle='首页'
function headTitle(state=initHeadTitle, action){
  switch(action.type){
    case SET_HEAD_TITLE:
      return action.data
    default:
      return state
  }
}


const initUser=storageUtils.getUser()
function user(state=initUser, action){
  console.log(typeof(action.msg))
  switch(action.type){
    case RECEIVE_USER:
      return action.user
    case ERROR_MSG:
      return action.msg
    case RESET_USER:
      return {}

    default:
      return state
  }
}



// 向外暴露的是合并产生的总的reducer函数
// 管理的总的state的结构是： { headTitle: 'xxxx'    user: {}}
export default combineReducers({
  headTitle, 
  user
})