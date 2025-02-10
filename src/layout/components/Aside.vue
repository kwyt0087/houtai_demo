<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#304156"
    text-color="#fff"
    active-text-color="#007acc"
    :router="true"
    :collapse="isCollapse"
    :collapse-transition="false"
  >
    <template v-for="item in menuArr">
      <!-- 1.0 一级菜单 -->
      <el-menu-item
        v-if="!item.children || item.path === '/order'"
        :index="item.path"
        :key="item.path"
      >
        <i class="iconfont" :class="item.meta.icon"></i>
        <template #title>
          <span>{{ item.meta.name }}</span>
        </template>
      </el-menu-item>
      <!-- 2.0 二级菜单 -->
      <el-submenu v-else :index="item.path" :key="item.path">
        <template #title>
          <i class="iconfont" :class="item.meta.icon"></i>
          <span>{{ item.meta.name }}</span>
        </template>
        <el-menu-item
          v-for="sub in item.children"
          :key="sub.path"
          :index="sub.path"
          >{{ sub.meta.name }}</el-menu-item
        >
      </el-submenu>
    </template>
  </el-menu>
</template>

<script>
import local from '@/utils/local.js'

export default {
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      menuArr: []
    }
  },
  mounted() {
    this.menuArr = JSON.parse(local.get('menu'))
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less" scoped>
.el-menu {
  border: none;

  i {
    color: #fff;
    margin-right: 8px;
  }

  .el-submenu .el-menu-item {
    background-color: #202f3f !important;
  }
}
</style>
