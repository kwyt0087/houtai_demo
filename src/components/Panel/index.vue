<template>
  <el-card>
    <div class="panel-title">
      <slot name="title"></slot>
    </div>
    <div class="panel-content">
      <slot name="content"></slot>
    </div>
  </el-card>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
// /deep/ 是穿刺的写法，用来给编译之后的类名加样式
/deep/.el-card__body {
  padding: 0;
}

.panel-title {
  border-bottom: 1px solid #eee;
  padding: 20px;
  /deep/h3 {
    font-weight: 700;
    color: #333;
  }
}

.panel-content {
  padding: 20px;
}
</style>
