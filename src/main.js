import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 先引入公共的初始化样式文件
import './assets/css/reset.css'
// 引入字体图标的css文件
import './assets/fonts/iconfont.css'
// 引入element-ui的文件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 自己写的index.less
import './assets/css/index.less'

// 引入全局注册的组件
import './utils/components.js'
// 引入全局注册的过滤器
import './utils/filters.js'

// 测试代码 - 意味着用完了就要删掉的
// import request from './utils/request.js'

// getData()
// async function getData() {
//   const data = await request.get('/static/data.json', {
//     pageSize: 10,
//     currentPage: 1
//   })
//   console.log(data)
// }

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
