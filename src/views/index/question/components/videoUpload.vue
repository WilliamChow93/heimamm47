<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="videoUpload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传视频文件，且不超过2MB</div>
    </el-upload>
    <video :src="videoUrl" autoplay controls></video>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //视频上传的接口路径
      videoUpload: process.env.VUE_APP_URL + "/question/upload",
      //上传后用来预览视频的路劲
      videoUrl: ""
    };
  },
  methods: {
    // 视频上传成功的钩子
    handleAvatarSuccess(res, file) {
      this.videoUrl = URL.createObjectURL(file.raw);
    },
    //上传之前触发的钩子
    beforeAvatarUpload(file) {
      const isJPG = file.type === "video/mp4";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 mp4 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style>
.avatar-uploader {
  text-align: left;
}
</style>