/*
 *  By Amir   2021-01-15
 *  抽离了公共的校验规则函数
 */

// 验证密码
const passReg = /^[_a-zA-Z0-9]{3,12}$/
export var validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (!passReg.test(value)) {
    callback(new Error('密码是6-12位的英文、数字、下划线！'))
  } else {
    callback()
  }
}

// 验证用户名
const userReg = /^[\u4e00-\u9fa5_a-zA-Z0-9]{3,8}$/
export var validateAccount = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else if (!userReg.test(value)) {
    callback(new Error('用户名是3-8位的中英文、数字、下划线！'))
  } else {
    callback()
  }
}

// 验证下拉框不为空
export var validateSelect = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请选择内容'))
  } else {
    callback()
  }
}

// 验证新密码
export var validatePass111 = function(obj) {
  return (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入新密码'))
    } else if (!passReg.test(value)) {
      callback(new Error('密码是6-12位的英文、数字、下划线！'))
    } else {
      // 如果确认密码的里面不是空的，去看看它的规则
      if (obj.resetForm.newPass !== '') {
        obj.$refs.regFormRef.validateField('newPass')
      }
      callback()
    }
  }
}

// 验证确认新密码
export var validateNewPass = function(obj) {
  return (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入确认新密码'))
    } else if (!passReg.test(value)) {
      callback(new Error('密码是6-12位的英文、数字、下划线！'))
    } else if (value !== obj.resetForm.pass) {
      callback(new Error('两次输入密码不一致!'))
    } else {
      callback()
    }
  }
}
