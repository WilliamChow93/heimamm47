<template>
  <el-dialog title="用户注册" width="600px" center :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules">
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
      <el-form-item label="图形码" :label-width="formLabelWidth">
        <el-col :span="16">
          <el-input v-model="form.imgCode" autocomplete="off"></el-input>
        </el-col>
        <el-col :span="7" :offset="1">
          <img :src="picCodeUrl" @click="getNewCode" class="imgCode" />
        </el-col>
      </el-form-item>
      <el-form-item label="验证码" :label-width="formLabelWidth">
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
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import axios from "axios";
export default {
  created() {
    // window.console.log(process.env.VUE_APP_URL);
  },
  data() {
    return {
      //设置验证码时间
      sec: 0,
      //图形验证码的接口地址
      picCodeUrl: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      //设置文字宽度
      formLabelWidth: "87px",
      //是否显示对话框
      dialogFormVisible: false,
      form: {
        name: "",
        email: "",
        password: "",
        phone: "",
        iCode: "",
        imgCode: ""
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
          { required: true, message: "请选请输入密码", trigger: "blur" },
          { min: 5, max: 14, message: "长度在5-14之间", trigger: "change" }
        ],
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /0?(13|14|15|18|17)[0-9]{9}/,
            message: "手机格式错误",
            trigger: "blur"
          }
        ]
      }
    };
  },

  methods: {
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
      this.sec = 60;
      let timerID = setInterval(() => {
        this.sec--;
        //当倒计时为0,设置清除定时器
        if (this.sec == 0) {
          clearInterval(timerID);
        }
      }, 1000);
      //获取验证码
      axios({
        url: process.env.VUE_APP_URL + "/sendsms",
        method: "post",
        data: {
          code: this.form.imgCode,
          phone: this.form.phone
        },
        // 允许携带cookie
        withCredentials: true
      }).then(res => {
        window.console.log(res);
        if (res.data.code == 200) {
          // 获取验证码成功
          alert("获取验证码成功，验证码为" + res.data.data.captcha);
        } else {
          alert(res.data.message);
        }
      });
    }
  }
};
</script>

<style scoped>
.el-dialog__header {
  background: linear-gradient(to right, #09c2f5, #1892f8);
}
.imgCode {
  width: 100%;
}
</style>