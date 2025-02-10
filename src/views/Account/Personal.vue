<template>
  <Panel>
    <h3 slot="title">个人中心</h3>

    <template #content>
      <div class="personal-info">
        <ul>
          <li>
            <span>管理员ID: </span>
            <span>{{ userData.id }}</span>
          </li>
          <li>
            <span>账号: </span>
            <span>{{ userData.account }}</span>
          </li>
          <li>
            <span>用户组: </span>
            <span>{{ userData.userGroup }}</span>
          </li>
          <li>
            <span>创建时间: </span>
            <span>{{ userData.ctime | formatTime }}</span>
          </li>
          <li>
            <span>管理员头像: </span>
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:5000/users/avatar_upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </li>
        </ul>
        <el-button type="primary" size="mini" @click="saveImg"
          >保存头像</el-button
        >
      </div>
    </template>
  </Panel>
</template>

<script>
import local from '@/utils/local.js'
import moment from 'moment'
import { uploadImg } from '@/api/users.js'

export default {
  data() {
    return {
      userData: {},
      imageUrl: '',
      imgUrl: ''
    }
  },
  created() {
    this.userData = JSON.parse(local.get('userInfo'))
    console.log(this.userData)
  },
  filters: {
    formatTime(str) {
      return moment(str).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.imgUrl = res.imgUrl
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 上传头像
    async saveImg() {
      const data = await uploadImg({
        imgUrl: this.imgUrl
      })

      if (data.code === 0) {
        location.reload()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.personal-info {
  li {
    line-height: 40px;
    margin: 5px 0;
    border-bottom: 1px solid #eee;
    display: flex;
    color: #333;

    span:nth-of-type(1) {
      width: 100px;
      margin-right: 14px;
    }

    &:nth-last-child(1) {
      padding: 20px 0;
      border: none;
    }
  }
}

/deep/.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 128px;
  height: 128px;
  line-height: 128px;
  text-align: center;
}
.avatar {
  width: 128px;
  height: 128px;
  display: block;
}

.el-button {
  margin-bottom: 40px;
  margin-left: 120px;
}
</style>
