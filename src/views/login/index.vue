<template>
  <div class="login-wrap">
    <!-- 左侧登录的盒子 -->
    <div class="login-box">
      <!-- 标题盒子 -->
      <div class="title-box">
        <img class="logo" src="./images/login_logo.png" alt />
        <span class="hmmm">黑马面面</span>
        <span class="line"></span>
        <span class="suer_login">用户登录</span>
      </div>
      <!-- 表单 -->
      <el-form ref="loginForm" :model="form" label-width="43px" :rules="rules">
        <el-form-item prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            show-password
            v-model="form.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-col :span="17">
            <el-input v-model="form.code" placeholder="请输入验证码" prefix-icon="el-icon-key"></el-input>
          </el-col>
          <el-col :span="7">
            <img class="code" src="./images/code.png" alt />
          </el-col>
        </el-form-item>
        <el-form-item prop="checked">
          <div class="agree-box">
            <el-checkbox v-model="form.checked" class="agree"></el-checkbox>
            <span>
              我已阅读并同意
              <el-link type="primary">用户协议</el-link>和
              <el-link type="primary">隐私条款</el-link>
            </span>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login_btn" @click="doLogin">登录</el-button>
          <el-button type="primary" class="login_btn">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img src="./images/login_banner.png" alt />
    <!-- 对话框 -->
    <reg></reg>
  </div>
</template>

<script>
import reg from './components/register.vue'
export default {
  components:{
    reg,
  },
  data() {
    return {
      //跟表单双向绑定的数据
      form: {
        checked: false,
        phone: "",
        password: "",
        code: ""
      },
      rules: {
        //真正的规则
        phone: [{ required: true, message: "请输入手机", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        checked: [
          //只有值为true才满足条件,否则代表不匹配
          {
            pattern: /true/,
            message: "必须勾选同意用户协议",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    doLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          alert("验证成功!");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login-wrap {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  /* 给谁加flex,就代表他的子元素使用弹性布局 */
  display: flex;
  /* 主轴排列为:space-around */
  justify-content: space-around;
  /* 副轴为:center */
  align-items: center;

  .login-box {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding-right: 41px;
    //把内间距内聚(默认是外扩)
    box-sizing: border-box;
    .title-box {
      display: flex;
      align-items: center;
      margin-top: 50px;
      margin-left: 48px;
      margin-bottom: 31px;
      .logo {
        margin-right: 16px;
        height: 17px;
        width: 22px;
      }
      .hmmm {
        margin-right: 14px;
        font-size: 22px;
      }
      .line {
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
        margin-right: 14px;
      }
      .suer_login {
        font-size: 22px;
      }
    }
    .code {
      width: 100%;
      height: 42px;
      vertical-align: top;
    }
    .agree-box {
      display: flex;
      align-items: center;
      .agree {
        margin-right: 3px;
        
      }
    }
    .login_btn {
      width: 100%;
      &:nth-child(2) {
        margin-left: 0;
        margin-top: 26px;
      }
    }
  }
}
</style>