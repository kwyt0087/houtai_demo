<template>
  <div class="login-content">
    <!-- 1.0 登录界面 -->
    <div class="login-box">
      <h3>饿死了么商家管理系统</h3>
      <!-- 1.1 登录表单的布局 -->
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
        size="mini"
      >
        <el-form-item prop="account">
          <el-input
            type="text"
            v-model="loginForm.account"
            prefix-icon="iconfont icon-yonghu"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :type="flagPass ? 'password' : 'text'"
            v-model="loginForm.password"
            prefix-icon="iconfont icon-mima"
            autocomplete="off"
          >
            <i
              slot="suffix"
              class="iconfont"
              :class="flagPass ? 'icon-eyes' : 'icon-eyes-'"
              @click="flagPass = !flagPass"
            ></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { validateAccount, validatePass } from '@/utils/validate.js'
import { Login } from '@/api/users.js'
import local from '@/utils/local.js'
// 引入计算路由的文件
import { getFinallyRoute } from '@/router/index.js'

export default {
  data() {
    return {
      loginForm: {
        account: '',
        password: ''
      },
      rules: {
        // validator  校验器    trigger  触发方式
        account: [{ validator: validateAccount, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }]
      },
      // 切换密码显示和隐藏
      flagPass: true
    }
  },
  methods: {
    submitForm(str) {
      // this.$refs['ruleForm']  ===  this.$refs.ruleForm
      this.$refs[str].validate(async valid => {
        if (valid) {
          // 所有的表单都校验通过了
          const data = await Login(this.loginForm)
          console.log(data)

          if (data.code === 0) {
            local.set('token', data.token)
            local.set('role', data.role)
            // 计算路由的函数
            getFinallyRoute()
            // 跳转至首页
            setTimeout(() => {
              this.$router.push('/')
            }, 1500)
          }
        } else {
          this.$message.error('表单不通过校验!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-content {
  height: 100%;
  background-color: #2d3a4b;
  display: flex;
  justify-content: center;
  align-items: center;

  h3 {
    text-align: center;
    padding: 20px;
    font-weight: 700;
    color: #fff;
    letter-spacing: 2px;
  }

  .login-box {
    width: 310px;
  }

  .el-button {
    width: 100%;
  }
}
</style>
