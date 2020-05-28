/*
包含应用中所有接口请求函数的模块
每个函数的返回值都是promise
*/
import ajax from './ajax'
import jsonp from 'jsonp'
import {message} from 'antd'
// 登陆
// export function reqLogin(username, password){
//   return ajax('/login',{username, password}, 'POST')
// }




//登陆
export const reqLogin =(username,password)=>ajax('/login',{username, password}, 'POST')

//添加用户
export const reqAddUser = (user) => ajax('/manage/user/'+(user._id?'update':'add'),user, 'POST')


//获取一级/二级的分类列表
export const reqCategorys =(parentId)=> ajax('/manage/category/list',{parentId})


//添加分类   查询数据get，更新用post，
export const reqAddCategory = (categoryName,parentId)=>ajax('/manage/category/add',{categoryName, parentId},'POST')


//更新分类名称
export const reqUpdateCategory=(categoryId,categoryName)=>ajax('/manage/category/update',{categoryId,categoryName},'POST')


export const reqWhether=(city)=>{
  return new Promise((resolve,reject)=>{
    const url=`http://api.jirengu.com/getWeather.php?city=${city}`
    jsonp(url,{},(err,data)=>{
    console.log("jsonp",err,data)
    if(!err&&data.status==='success'){
      const {dayPictureUrl,weather}= data.results[0].weather_data[0]
      console.log(dayPictureUrl,weather)
      resolve({dayPictureUrl,weather})
    }
    else{
      message.error("获取天气信息失败")
    }
  })
  })
}
// reqWhether('北京')


// 获取商品分页列表
export const reqProducts = (pageNum,pageSize)=>ajax('/manage/product/list',{pageNum,pageSize})

// 搜索商品分页列表
export const reqSearchProducts=(pageNum,pageSize,searchName,searchType)=>ajax('/manage/product/search',{
  pageNum,
  pageSize,
  [searchType]: searchName,

})

// 根据id获取分类名称
export const reqCategory =(categoryId)=>ajax('/manage/category/info',{categoryId})


//更新商品上架  下架

export const reqUpdateStatus=(productId,status)=>ajax('/manage/product/updateStatus',{productId,status},'POST')


//删除图片
export const reqDeleteImg = (name)=>ajax('/manage/img/delete',{name},"POST")


export const reqAddOrUpdateProduct = (product)=>ajax('/manage/product/'+(product._id?'update':'add'),product,"POST")


//获取角色列表
export const reqRoles = ()=>ajax('/manage/role/list')

export const reqAddRole =(roleName)=>ajax('/manage/role/add',{roleName},'POST')


export const reqUpdateRole = (role)=>ajax('/manage/role/update',role,'POST')

export const reqUsers=()=>ajax('/manage/user/list')
export const reqDeleteUser = (userId)=>ajax('/manage/user/delete',{userId},'POST')


