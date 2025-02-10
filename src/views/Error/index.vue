<template>
  <div>
    从前有座山，山里有座庙，庙里有个页面现在找不到...
    <p>正在跳转回主页，请稍后 5</p>
  </div>
</template>

<script>
export default {
  created() {
    setTimeout(() => {
      // 通过js的方式跳转到首页
      this.$router.push('/')
    }, 4000)
  }
}
</script>

<style lang="less" scoped></style>
