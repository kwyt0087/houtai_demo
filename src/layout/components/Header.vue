<template>
  <div class="top-nav">
    <!-- 1.0 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="item in navList"
        :key="item.name"
        :to="{ path: item.path }"
        >{{ item.name }}</el-breadcrumb-item
      >
    </el-breadcrumb>

    <!-- 2.0 右侧个人中心布局 -->
    <div class="personal">
      <!-- 个人中心的下拉菜单 -->
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          欢迎登录，{{ userInfo.account
          }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="users">个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <!-- 头像 -->
      <el-avatar :src="userInfo.imgUrl"></el-avatar>
    </div>
  </div>
</template>

<script>
import local from '@/utils/local.js'
import { getPersonal } from '@/api/users.js'

export default {
  data() {
    return {
      navList: [],
      userInfo: {}
    }
  },
  // 页面刷新和加载的时候会调用
  created() {
    this.getNav()
    this.getUsers()
  },
  methods: {
    async getUsers() {
      const data = await getPersonal()
      // console.log(data)
      this.userInfo = data.accountInfo
      local.set('userInfo', JSON.stringify(data.accountInfo))
    },
    getNav() {
      const arr = [{ path: '/', name: '首页' }]
      this.$route.matched.forEach(item => {
        if (item.meta.name) {
          arr.push({
            path: item.path,
            name: item.meta.name
          })
        }
      })
      this.navList = arr
    },
    // 触发下拉菜单的事件
    handleCommand(str) {
      if (str === 'users') {
        // 跳转到个人中心页面
        this.$router.push('/account/users')
      } else if (str === 'logout') {
        // 先清除token，然后刷新页面
        local.clear()
        location.reload()
      }
    }
  },
  // 监听的路由切换会发生变化
  watch: {
    '$route.path'() {
      this.getNav()
    }
  }
}
</script>

<style lang="less" scoped>
.top-nav {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .personal {
    display: flex;
    align-items: center;
    .el-avatar {
      margin-left: 10px;
    }
  }
}

.el-dropdown {
  cursor: pointer;
}
</style>
