// 包含n个用来创建action的工厂函数
import {INCREMENT,DECREMENT} from './action-types'

//同步action：返回的是对象
export const increment=(number)=>({type:INCREMENT,data:number})
export const decrement=(number)=>({type:DECREMENT,data:number})


//异步action：返回的是函数
export const incrementAsync=(number)=>{
  return dispatch=>{
    // 执行异步代码（定时器，ajax，promise）
    setTimeout(()=>{
      // 当异步任务完成时，分发一个同步action
      dispatch(increment(number))
    },1000)
  }
}