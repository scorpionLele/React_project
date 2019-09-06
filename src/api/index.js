import ajax from "./ajax";
import jsonp from "jsonp";
import { message } from "antd";

export const reqLogin = (username,password) => ajax(
  {
    url:'/login',
    method:'POST',
    data:{username,password}
  }
)

export const reqWeather = (city) => {
  return new Promise((resolve, reject) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(url, {}, (err, data) => {
      if (!err && data.status === 'success') {
        const {
          dayPictureUrl,
          weather
        } = data.results[0].weather_data[0]
        resolve({
          dayPictureUrl,
          weather
        })
      } else {
        message.error('获取天气失败!')
      }
    })
  })
}


export const reqCategorys = () => ajax({
  url: '/manage/category/list'
})

export const reqAddCategory = (categoryName) => ajax({
  url: '/manage/category/add',
  method:'post',
  data: {categoryName}
})

export const requpdateCategory = ({categoryId,categoryName}) => ajax.post(
  '/manage/category/update',
  {
    categoryId,
    categoryName
  }
)

export const reqProducts = (pageNum, pageSize) => ajax.get(
  '/manage/product/list', {
    params: {
      pageNum,
      pageSize
    }
  }
)

//根据Name/desc搜索产品分页列表
export const reqSearchProducts = ({pageNum, pageSize, searchType, searchName}) => ajax.get(
  '/manage/product/search', {
    params: {
      pageNum,
      pageSize,
      [searchType]:searchName
    }
  }
)

//对商品进行上架 / 下架处理
export const reqUpdateStatus = (productId, status) => ajax.post(
  '/manage/product/updateStatus',
  {
    productId,
    status
  }
)

//根据商品ID获取商品
export const reqProductDetail = (productId) => ajax.get(
  '/manage/product/info',
  {
    params:{
      productId
    }
  }
)
//根据分类ID获取分类
export const reqCategoryById = (categoryId) => ajax({
  url: '/manage/category/info',
  params:{
    categoryId
  }
})

//添加商品
export const reqAddOrUpdateProduct = (product) => ajax({
  url: '/manage/product/' + (product._id ? 'update':'add'),
  method:'POST',
  data:product
})

//Upload删除图片
export const reqDeleteImg = (name) => ajax({
  url:'/manage/img/delete',
  method:'post',
  data:{name}
})

//获取角色列表
export const reqRoles = () =>ajax({
  url:'/manage/role/list'
})

//添加角色
export const reqAddRole = (roleName) => ajax.post(
  '/manage/role/add',
  {roleName}
)

//设置角色权限
export const reqUpdateRole = ({_id,menus,auth_time,auth_name}) =>ajax({
  url: '/manage/role/update',
  method:'POST',
  data:{_id,menus,auth_time,auth_name}
})

//获取角色列表
export const reqUsers = () => ajax({
  url: '/manage/user/list'
})

export const reqAddOrUpdateUser = (user) => ajax.post(
  '/manage/user/'+(user._id?'update':'add'),
  user
)

export const reqDeleteUsers = (userId) => ajax.post(
  '/manage/user/delete', {userId}
)
 