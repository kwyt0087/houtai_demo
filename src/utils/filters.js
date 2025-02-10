/*
 * by amir 2021-01-16
 * 全局注册了过滤器
 */
import Vue from 'vue'
import moment from 'moment'

// 处理时间
Vue.filter('formatDate', function(str) {
  return moment(str).format('YYYY-MM-DD HH:mm:ss')
})
