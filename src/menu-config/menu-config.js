const menuList = [
  {
    title:'首页',
    key:'/home',
    type:'home'
  },
  {
    title: '商品',
    key: 'sub',
    type: 'codepen-circle',
    children:[
      {
        title: '品类管理',
        key: '/category',
        type: 'code-sandbox'
      },
      {
        title: '商品管理',
        key: '/product',
        type: 'codepen'
      }
    ]
  },
  {
    title: '角色管理',
    key: '/role',
    type: 'reddit'
  },
  {
    title: '用户管理',
    key: '/user',
    type: 'user'
  },
  {
    title: '图形图标',
    key: 'charts',
    type: 'area-chart',
    children:[
      {
        title: '柱形图',
        key: '/charts/bar',
        type: 'bar-chart'
      },
      {
        title: '折线图',
        key: '/charts/line',
        type: 'line-chart'
      },
      {
        title: '饼图',
        key: '/charts/pie',
        type: 'pie-chart'
      }
    ]
  }
]

export default menuList