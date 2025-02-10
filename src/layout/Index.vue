<template>
  <el-container>
    <!-- 1.0 左侧的菜单布局 -->
    <el-aside :width="bool ? '64px' : '200px'">
      <!-- 主logo -->
      <div class="logo-box" @click="bool = !bool">
        <img src="../assets/imgs/logo1.png" alt="" />
        <h3 v-show="!bool">外卖商家系统</h3>
      </div>
      <Aside :isCollapse="bool" />
    </el-aside>
    <el-container>
      <!-- 2.0 右侧头部导航 -->
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from './components/Aside.vue'
import Header from './components/Header.vue'

export default {
  components: {
    Aside,
    Header
  },
  data() {
    return {
      bool: false
    }
  }
}
</script>

<style lang="less">
.el-container {
  height: 100%;
}

.el-main {
  background-color: #f8f8f8;
}

.el-aside {
  background-color: #304156;

  .logo-box {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0;

    img {
      width: 40px;
      border-radius: 50%;
    }

    h3 {
      margin-left: 10px;
      font-weight: 700;
      color: #fff;
      letter-spacing: 2px;
    }
  }
}
</style>
