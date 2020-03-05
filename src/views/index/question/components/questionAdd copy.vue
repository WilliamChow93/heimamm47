<template>
  <!-- destroy-on-close:关闭对话框时销毁对话框中的元素 -->
  <el-dialog
    destroy-on-close
    class="my-dialog" :title="isAdd ? '新增题库测试':'编辑题库'" :visible.sync="dialogFormVisible"
    fullscreen
  >
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item prop="subject" label="学科" :label-width="formLabelWidth">
        <studySelect v-model="form.subject"></studySelect>
      </el-form-item>
      <el-form-item prop="step" label="阶段" :label-width="formLabelWidth">
        <el-select v-model="form.step" placeholder="请选择阶段">
          <el-option label="初级" :value="1"></el-option>
          <el-option label="中级" :value="2"></el-option>
          <el-option label="高级" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="enterprise" label="企业" :label-width="formLabelWidth">
        <businessSelect v-model="form.enterprise"></businessSelect>
      </el-form-item>
      <el-form-item prop="city" class="city" label="城市" :label-width="formLabelWidth">
        <chinaArea v-model="form.city"></chinaArea>
      </el-form-item>
      <el-form-item prop="type" label="题型" :label-width="formLabelWidth">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">单选</el-radio>
          <el-radio :label="2">多选</el-radio>
          <el-radio :label="3">简答</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="difficulty" label="难度" :label-width="formLabelWidth">
        <el-radio-group v-model="form.difficulty">
          <el-radio :label="1">简单</el-radio>
          <el-radio :label="2">一般</el-radio>
          <el-radio :label="3">困难</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 分割线 -->
      <el-form-item>
        <el-divider></el-divider>
      </el-form-item>
      <el-form-item prop="title" label="试题标题" :label-width="formLabelWidth">
        <meEditor v-model="form.title"></meEditor>
      </el-form-item>
      <!-- 单选 -->
      <el-form-item
        prop="single_select_answer"
        label="单选"
        :label-width="formLabelWidth"
        v-if="form.type==1"
      >
        <el-radio-group v-model="form.single_select_answer">
          <div class="one-box" v-for="(item, index) in form.select_options" :key="index">
            <el-radio :label="item.label"></el-radio>
            <el-input class="inputOne" v-model="item.text"></el-input>
            <!-- 上传头像 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="item.iamge" :src="item.iamge" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-radio-group>
      </el-form-item>
      <!-- 多选 -->
      <el-form-item
        prop="multiple_select_answer"
        label="多选"
        :label-width="formLabelWidth"
        v-else-if="form.type==2"
      >
        <el-checkbox-group v-model="form.multiple_select_answer">
          <div class="one-box" v-for="(item, index) in form.select_options" :key="index">
            <el-checkbox :label="item.label"></el-checkbox>
            <el-input class="inputOne" v-model="item.text"></el-input>
            <!-- 上传头像 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="item.iamge" :src="item.iamge" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-checkbox-group>
      </el-form-item>
      <!-- 简答 -->
      <el-form-item prop="short_answer" label="简答" :label-width="formLabelWidth" v-else>
        <el-input type="textarea" :rows="2" v-model="form.short_answer"></el-input>
      </el-form-item>
      <!-- 分割线 -->
      <el-form-item>
        <el-divider></el-divider>
      </el-form-item>
      <!-- 上传视频 -->
      <!-- 视频不是必填,但是重置的时候需要调用 所以还是要绑定prop值 -->
      <el-form-item prop="video" label="解析视频" :label-width="formLabelWidth">
        <videoUpload></videoUpload>
      </el-form-item>
      <!-- 分割线 -->
      <el-form-item>
        <el-divider></el-divider>
      </el-form-item>
      <!-- 富文本 -->
      <el-form-item prop="answer_analyze" label="答案解析" :label-width="formLabelWidth">
        <meEditor v-model="form.answer_analyze"></meEditor>
      </el-form-item>
      <el-form-item prop="remark" label="试题备注" :label-width="formLabelWidth">
        <el-input v-model="form.remark" type="textarea" :rows="2"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="getQuestion">提 交</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import { regionDataPlus } from "element-china-area-data";
import meEditor from "./myEditor.vue";
import chinaArea from "./chinaArea.vue";
import videoUpload from "./videoUpload.vue";
import { questionAdd, questionEdit } from "@/api/question.js";
export default {
  name: "questionAdd",
  components: {
    chinaArea,
    meEditor,
    videoUpload
  },
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "280px",
      form: {
        type: "1",
        //单选的答案
        single_select_answer: "",
        //多选的答案
        multiple_select_answer: [],
        //简答的答案
        short_answer: "",
        //选项，介绍，图片介绍
        select_options: [
          {
            label: "A",
            text: "狗不理",
            image: "../../images/logo.png"
          },
          {
            label: "B",
            text: "猫不理",
            image: "upload/20191129/b7caf98be9d0aa6764b0112ba0dfa19e.jpeg"
          },
          {
            label: "C",
            text: "麻花",
            image: "upload/20191129/b7caf98be9d0aa6764b0112ba0dfa19e.jpeg"
          },
          {
            label: "D",
            text: "炸酱面",
            image: "upload/20191129/4067f19ab53a5e8388ad3459e23110f0.jpeg"
          }
        ]
      },
      imageUrl: "",
      //上传头像显示的图片的地址
      uploadUrl: process.env.VUE_APP_URL + "/question/upload",
      rules: {
        title: [{ required: true, message: "标题不能为空", trigger: "blur" }],
        step: [{ required: true, message: "阶段不能为空", trigger: "change" }],
        subject: [
          { required: true, message: "学科不能为空", trigger: "change" }
        ],
        enterprise: [
          { required: true, message: "企业不能为空", trigger: "change" }
        ],
        city: [{ required: true, message: "企业不能为空", trigger: "change" }],
        type: [{ required: true, message: "题型不能为空", trigger: "change" }],
        difficulty: [
          { required: true, message: "难度不能为空", trigger: "change" }
        ],
        single_select_answer: [
          { required: true, message: "单选不能为空", trigger: "change" }
        ],
        multiple_select_answer: [
          { required: true, message: "多选不能为空", trigger: "change" }
        ],
        short_answer: [
          { required: true, message: "简答不能为空", trigger: "blur" }
        ],
        answer_analyze: [
          { required: true, message: "答案解析不能为空", trigger: "blur" }
        ],
        remark: [
          { required: true, message: "试题备注不能为空", trigger: "blur" }
        ]
      },
      //isAdd切换编辑窗口
      isAdd: true,
    };
  },

  methods: {
    //图片上传成功的钩子
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.uploadUrl = res.data.url;
      console.log("图片", res);
    },
    //上传之前触发
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是图片格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    getQuestion() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.isAdd) {
            questionAdd(this.form).then(res => {
              if (res.data.code == 200) {
                this.$message.success("添加成功");
                this.$refs.form.resetFields();
                this.dialogFormVisible = false;
                //刷新页面
                this.$parent.getList();
              } else {
                this.$message.erroe(res.data.message);
              }
            });
          } else {
            questionEdit(this.form).then(res => {
              if (res.data.code == 200) {
                this.$message.success("修改成功");
                this.$refs.form.resetFields();
                this.dialogFormVisible = false;
                //刷新页面
                this.$parent.getList();
              } else {
                this.$message.erroe(res.data.message);
              }
            });
          }
        }
      });
    }
  }
};
</script>

<style lang="less">
.my-dialog {
  .el-select {
    width: 364px;
  }
  .el-cascader {
    width: 364px;
  }
  .one-box {
    display: flex;
    align-items: center;
    margin-top: 20px;
    .inputOne {
      width: 476px;
      margin-right: 20px;
      height: 40px;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
}
</style>