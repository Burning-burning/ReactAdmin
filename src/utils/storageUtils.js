import store from 'store'

/*
用来进行local数据存储管理的工具模块
*/
export default {
  /*
  保存user
  */
  saveUser(user){
    // localStorage.setItem('user_key',JSON.stringify(user))
    store.set('user_key',user)
  },
  /*
  读写
  */
 getUser () {
  // return JSON.parse(localStorage.getItem('user_key')||'{}')
  return store.get('user_key')||{}
 },
  /*
  删除
   */
  removeUser(){
    // localStorage.removeItem('user_key')
    store.remove('user_key')
  }
}