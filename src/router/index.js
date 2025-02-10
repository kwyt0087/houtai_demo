import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../layout/Index.vue'
import local from '@/utils/local.js'
import SyncRoutes from './syncRoutes.js'

import Dashboard from '../views/Dashboard/index.vue'

Vue.use(VueRouter)

// 公共路由
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/dashboard',
    children: [
      // 后台首页
      {
        path: '/dashboard',
        component: Dashboard
      }
    ]
  },
  {
    path: '/login',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Login/index.vue')
  },
  // 如果找不到页面就去 404
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/404',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Error/index.vue')
  }
]

// component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')

const router = new VueRouter({
  routes
})

// 设计一个函数，根据登录的角色计算出最终的路由，合并到主路由上
getFinallyRoute()
export function getFinallyRoute() {
  const role = local.get('role')
  if (!role) return
  const finallArr = calcRoute(SyncRoutes.children, role)
  // console.log(finallArr, 111)
  // 通过 addRoutes 添加到主路由，参数 -- 必须是一个数组
  SyncRoutes.children = finallArr
  router.addRoutes([SyncRoutes])

  // 设计一个函数用于过滤掉菜单中不需要展示的页面
  const menuArr = calcMenu(finallArr)
  local.set('menu', JSON.stringify(menuArr))
}

// 计算菜单的函数
function calcMenu(arr) {
  return arr.filter((item) => {
    if (!item.hidden) {
      // 也需要递归
      if (item.children) {
        item.children = calcMenu(item.children)
      }
      return true
    } else {
      return false
    }
  })
}

// 设计一个函数，用于登录的角色进行过滤
function calcRoute(arr, role) {
  return arr.filter((item) => {
    if (hasPermission(item, role)) {
      // 即使一级路由鉴权成功，它自己的children也需要再次调用
      if (item.children) {
        item.children = calcRoute(item.children, role)
      }
      return true
    } else {
      return false
    }
  })
}

// 设计一个函数，用于对每一个路由对象进行关键字的提取
function hasPermission(obj, role) {
  if (obj.meta && obj.meta.role) {
    return obj.meta.role.includes(role)
  } else {
    return true
  }
}

// 使用导航守卫对页面路由进行拦截
router.beforeEach((to, from, next) => {
  const token = local.get('token')
  if (token) {
    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
