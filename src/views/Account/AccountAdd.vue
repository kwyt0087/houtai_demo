<template>
  <div>
    <Panel>
      <h3 slot="title">添加账号</h3>
      <template #content>
        <el-form
          :model="regForm"
          status-icon
          :rules="rules"
          ref="regFormRef"
          label-width="80px"
          class="demo-ruleForm"
          size="mini"
        >
          <el-form-item label="用户名" prop="account">
            <el-input
              type="text"
              v-model="regForm.account"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="regForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户组" prop="userGroup">
            <el-select v-model="regForm.userGroup" placeholder="请选择">
              <el-option label="普通管理员" value="普通管理员"> </el-option>
              <el-option label="超级管理员" value="超级管理员"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('regFormRef')"
              >提交</el-button
            >
            <el-button @click="resetForm('regFormRef')">重置</el-button>
          </el-form-item>
        </el-form>
      </template>
    </Panel>
  </div>
</template>

<script>
import {
  validateAccount,
  validatePass,
  validateSelect
} from '@/utils/validate.js'
import { addUser } from '@/api/users.js'

export default {
  data() {
    return {
      regForm: {
        account: '',
        password: '',
        userGroup: ''
      },
      rules: {
        account: [{ validator: validateAccount, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }],
        userGroup: [{ validator: validateSelect, trigger: 'change' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 所有的表单都验证通过了
          const data = await addUser(this.regForm)
          if (data.code === 0) {
            // 跳转到账号列表页
            setTimeout(() => {
              this.$router.push('/account/list')
            }, 1500)
          }
        } else {
          this.$message.error('请填写对应的表单！！')
          return false
        }
      })
    },
    resetForm(formName) {
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
