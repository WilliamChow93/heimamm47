<template>
  <el-dialog title="用户注册" width="600px" center :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="regForm">
      <!-- element-ui头像上传 -->
      <el-form-item label="头像" :label-width="formLabelWidth" prop="avatar">
        <!-- 
          action:上传图片的接口地址
          :show-file-list 是否显示上传图片列表
          :on-success 上传成功调用的回调函数
          :before-upload 在上传之前调用的函数
        -->
        <el-upload
          name="image"
          v-model="form.avatar"
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="昵称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" password :label-width="formLabelWidth" prop="password">
        <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图形码" :label-width="formLabelWidth" prop="imgcode">
        <el-col :span="16">
          <el-input v-model="form.imgcode" autocomplete="off"></el-input>
        </el-col>
        <el-col :span="7" :offset="1">
          <img :src="picCodeUrl" @click="getNewCode" class="imgcode" />
        </el-col>
      </el-form-item>
      <el-form-item label="验证码" :label-width="formLabelWidth" prop="iCode">
        <el-col :span="16">
          <el-input v-model="form.iCode" autocomplete="off"></el-input>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-button @click="getPhoneCode" :disabled="sec!=0">{{sec==0 ? '获取用户验证码' : '还有'+sec+'秒'}}</el-button>
        </el-col>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="doReg">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import axios from "axios";
// import { sendSMS } from "../../../api/register.js";
//@代表src文件,简写方法
import { sendSMS, register } from "@/api/register.js";
export default {
  created() {
    // window.console.log(process.env.VUE_APP_URL);
  },
  data() {
    return {
      //要上传图片的接口地址
      uploadUrl: process.env.VUE_APP_URL + "/uploads",
      //设置验证码时间
      sec: 0,
      //图形验证码的接口地址
      picCodeUrl: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      //设置文字宽度
      formLabelWidth: "87px",
      //是否显示对话框
      dialogFormVisible: false,
      //图片临时路径
      imageUrl: "",
      form: {
        name: "",
        email: "",
        password: "",
        phone: "",
        iCode: "",
        imgcode: "",
        avatar: ""
      },
      rules: {
        name: [{ required: true, message: "昵称不能为空", trigger: "blur" }],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          {
            pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 5, max: 14, message: "长度在5-14之间", trigger: "change" }
        ],
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /0?(13|14|15|18|17)[0-9]{9}/,
            message: "手机格式错误",
            trigger: "blur"
          }
        ],
        iCode: [
          { required: true, message: "手机验证码不能为空", trigger: "blur" },
          { len: 4, message: "验证码只能为4位", trigger: "blur" }
        ],
        imgcode: [
          { required: true, message: "图片验证码不能为空", trigger: "blur" },
          { len: 4, message: "验证码只能为4位", trigger: "blur" }
        ],
        avatar: [{ required: true, message: "头像不能为空", trigger: "blur" }]
      }
    };
  },

  methods: {
    doReg() {
      this.$refs.regForm.validate(valid => {
        if (valid) {
          register({
            username: this.form.name,
            phone: this.form.phone,
            email: this.form.email,
            avatar: this.form.avatar,
            password: this.form.password,
            rcode: this.form.rcode
          }).then(res => {
            if (res.data.code == 200) {
              this.$message.success("注册成功!");
              //重置表单,只能重置表单元素,而img不是表单元素
              this.$refs.regForm.resetFields();
              //手动设置img为空
              this.imageUrl = "";
              //注册成功关闭窗口
              this.dialogFormVisible = false;
            } else {
              this.$message.error(res.data.message);
            }
          });
        }
      });
    },
    //上传头像成功后调用的钩子
    handleAvatarSuccess(res, file) {
      window.console.log("打印res:", res);
      window.console.log("打印file:", file);
      //res就是响应体
      //file是上传成功后图片的信息
      //createObjectURL把图片转换成临时路径
      this.imageUrl = URL.createObjectURL(file.raw);
      //上传成功还要给avatar赋值,手动来赋值才让他有值的，没有事件重新校验
      this.form.avatar = res.data.file_path;
      //单独对一个属性做一次效验
      this.$refs.regForm.validateField("avatar");
    },
    // 上传头像前执行的 钩子
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif";
      const isLt4M = file.size / 1024 / 1024 < 4;
      //判断上传图片的格式
      if (!isJPG) {
        this.$message.error("上传头像不是图片格式!");
      }
      //判断上传图片的大小
      if (!isLt4M) {
        this.$message.error("上传头像图片大小不能超过 4MB!");
      }
      return isJPG && isLt4M;
    },
    //图片点击事件
    getNewCode() {
      //流量器缓存机制
      //浏览器发现你这次请求,刚才发的请求,他就不会再发请求,直接用上次的发的请求结果
      //专门用来解决请求缓存的两套方案
      //随机数"&t="+Math.random()*999
      //事件戳+Date.now()
      this.picCodeUrl =
        process.env.VUE_APP_URL + "/captcha?type=sendsms" + Date.now();
    },
    //手机验证码点击事件
    //设置定时器每秒sec减一
    //这里访问this.sec,一定要用箭头函数,用function的话,里面的this是window
    getPhoneCode() {
      //判断手机号是否合法
      if (!(/0?(13|14|15|18|17)[0-9]{9}/.test(this.form.phone))) {
        return this.$message.error("手机号码格式不正确");
      }
      //判断验证码是否合法
      if (this.form.imgcode.length != 4) {
        //提示验证码不合法
        this.$message.error("验证码长度不对");
        return;
      }

      this.sec = 60;
      let timerID = setInterval(() => {
        this.sec--;
        //当倒计时为0,设置清除定时器
        if (this.sec == 0) {
          clearInterval(timerID);
        }
      }, 1000);
      //传入一个接口对象,获取验证码
      sendSMS({
        phone: this.form.phone,
        code: this.form.imgcode
      }).then(res => {
        window.console.log(res);
        if (res.data.code == 200) {
          // 获取验证码成功
          // alert("获取验证码成功，验证码为" + res.data.data.captcha);
          this.$message.success(
            "获取验证码成功，验证码为" + res.data.data.captcha
          );
        } else {
          // alert(res.data.message);
          this.$message.error(res.data.message);
        }
      });
      //获取验证码
      // axios({
      //   url: process.env.VUE_APP_URL + "/sendsms",
      //   method: "post",
      //   data: {
      //     code: this.form.imgcode,
      //     phone: this.form.phone
      //   },
      //   // 允许携带cookie
      //   withCredentials: true
      // }).then(res => {
      //   window.console.log(res);
      //   if (res.data.code == 200) {
      //     // 获取验证码成功
      //     // alert("获取验证码成功，验证码为" + res.data.data.captcha);
      //     this.$message.success(
      //       "获取验证码成功，验证码为" + res.data.data.captcha
      //     );
      //   } else {
      //     // alert(res.data.message);
      //     this.$message.error(res.data.message);
      //   }
      // });
    }
  }
};
</script>

<style>
.avatar-uploader {
  text-align: center;
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
.el-dialog__header {
  background: linear-gradient(to right, #09c2f5, #1892f8);
}
.imgcode {
  width: 100%;
}
</style>