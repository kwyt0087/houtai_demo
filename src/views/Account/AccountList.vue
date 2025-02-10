<template>
  <Panel>
    <h3 slot="title">账号列表</h3>

    <template #content>
      <!-- 1.0 表格渲染列表 -->
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        size="mini"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="account" label="账号"></el-table-column>
        <el-table-column prop="userGroup" label="用户组"> </el-table-column>
        <el-table-column label="创建时间">
          <template v-slot="{ row }">
            {{ row.ctime | formatTime }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <!-- <template v-slot="{ row }">{{ row }}</template> -->
          <template v-slot="{ row }">
            <el-button type="primary" size="mini" @click="showDialog(row)"
              >编辑</el-button
            >
            <el-button type="danger" size="mini" @click="delItem(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 2.0 分页功能 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[2, 5, 10, 15]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>

      <!-- 3.0 批量删除 / 取消选择 -->
      <div>
        <el-button size="mini" type="danger" @click="delMany"
          >批量删除</el-button
        >
        <el-button size="mini" type="primary" @click="toggleSelection()"
          >取消选择</el-button
        >
      </div>

      <!-- 4.0 修改账号的操作 -->
      <el-dialog title="编辑账号" :visible.sync="dialogVisible" width="50%">
        <!-- 4.1 布局的盒子 -->
        <div>
          <el-form
            :model="editForm"
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
                v-model="editForm.account"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="用户组" prop="userGroup">
              <el-select v-model="editForm.userGroup" placeholder="请选择">
                <el-option label="普通管理员" value="普通管理员"> </el-option>
                <el-option label="超级管理员" value="超级管理员"> </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <!-- 4.2 确认的按钮 -->
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialogVisible = false"
            >取 消</el-button
          >
          <el-button size="mini" type="primary" @click="editYes"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </template>
  </Panel>
</template>

<script>
import { getUsers, delUser, delMoreUser, editUsers } from '@/api/users.js'
import moment from 'moment'

export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 0,
      tableData: [],
      multipleSelection: [],
      dialogVisible: false,
      // 修改的数据对象
      editForm: {
        account: '',
        userGroup: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入账号名称', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        userGroup: [
          { required: true, message: '请选择管理权限', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    // 一般请求都会在 created 中发送，但是不要在这里写太多代码
    this.getUserList()
  },
  methods: {
    // async 和 await 就是基于ES6中的promise的语法糖，用来解构异步操作的结果
    async getUserList() {
      const { data, total } = await getUsers({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      })
      this.tableData = data
      this.total = total
      console.log(data)
    },
    // 只要选择，就会拿到当前那行数据，会以数组的方式展示
    handleSelectionChange(val) {
      const arr = []
      val.forEach(item => {
        arr.push(item.id)
      })
      this.multipleSelection = arr
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.getUserList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getUserList()
    },
    // 删除用户的操作
    delItem(id) {
      this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 确定要删除
          const data = await delUser({ id })
          if (data.code === 0) {
            this.getUserList()
          }
        })
        .catch(() => {
          // 取消删除
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 批量删除的操作
    delMany() {
      this.$confirm('此操作将永久删除这些账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 确定要删除
          const data = await delMoreUser({
            ids: JSON.stringify(this.multipleSelection)
          })
          if (data.code === 0) {
            this.getUserList()
          }
        })
        .catch(() => {
          // 取消删除
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    showDialog(row) {
      // 把当前行的数据赋值给 editForm
      this.editForm.id = row.id
      this.editForm.account = row.account
      this.editForm.userGroup = row.userGroup
      this.dialogVisible = true
    },
    async editYes() {
      console.log(this)
      const data = await editUsers(this.editForm)
      if (data.code === 0) {
        // 修改成功之后，只是把数据库改了，页面还需要更新
        this.getUserList()
        this.dialogVisible = false
      }
    }
  },
  filters: {
    formatTime(str) {
      return moment(str).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style lang="less" scoped>
.el-input {
  width: 193px;
}
</style>
