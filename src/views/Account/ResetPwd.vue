<template>
  <div>
    <Panel>
      <h3 slot="title">修改密码</h3>
      <template #content>
        <el-form
          :model="resetForm"
          status-icon
          :rules="rules"
          ref="regFormRef"
          label-width="80px"
          class="demo-ruleForm"
          size="mini"
        >
          <el-form-item label="原密码" prop="oldPass">
            <el-input
              type="password"
              v-model="resetForm.oldPass"
              autocomplete="off"
              @blur="checkOld"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="pass">
            <el-input
              type="text"
              v-model="resetForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="newPass">
            <el-input
              type="text"
              v-model="resetForm.newPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('regFormRef')"
              >提交</el-button
            >
            <el-button @click="resetFormRef('regFormRef')">重置</el-button>
          </el-form-item>
        </el-form>
      </template>
    </Panel>
  </div>
</template>

<script>
import {
  validatePass,
  validatePass111,
  validateNewPass
} from '@/utils/validate.js'

import { checkOldPass, editpass } from '@/api/users.js'

import local from '@/utils/local.js'

export default {
  data() {
    return {
      resetForm: {
        oldPass: '',
        pass: '',
        newPass: ''
      },
      rules: {
        oldPass: [{ validator: validatePass, trigger: 'blur' }],
        pass: [{ validator: validatePass111(this), trigger: 'blur' }],
        newPass: [{ validator: validateNewPass(this), trigger: 'blur' }]
      },
      // 验证原密码是否验证过，而且是正确的
      flag: false
    }
  },
  methods: {
    async checkOld() {
      if (this.resetForm.oldPass === '') return
      const data = await checkOldPass({
        oldPwd: this.resetForm.oldPass
      })

      console.log(data)
      // 验证原密码是否正确
      if (data.code === '00') {
        // 如果是正确的，才可以发起修改密码的请求
        // 如果不是正确的，则不允许发
        this.flag = true
      } else {
        this.flag = false
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 即使满足了新密码的格式，也要查看是否确认过新密码
          if (this.flag) {
            // 发起新的请求
            const data = await editpass({
              newPwd: this.resetForm.pass
            })

            if (data.code === 0) {
              // 成功之后，要重新登录
              local.clear()
              this.$router.push('/login')
            }
          }
        } else {
          this.$message.error('请填写对应的表单！！')
          return false
        }
      })
    },
    resetFormRef(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.el-form {
  width: 320px;

  .el-input {
    width: 193px;
  }
}
</style>
