<template>
  <el-container class="my-container">
    <el-header class="my-header">
      <div class="left">
        <!-- 字体图标 -->
        <i
          @click="isCollapse=!isCollapse"
          :class="isCollapse ? 'el-icon-s-unfold': 'el-icon-s-fold'"
        ></i>
        <img class="logo" src="./images/logo.png" alt />
        <span>黑马面面</span>
      </div>
      <div class="right">
        <img class="userLogo" :src="$store.state.avatar" alt />
        <span class="user">{{$store.state.username}},您好</span>
        <el-button type="primary" size="small" @click="logout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 左侧栏 -->
      <el-aside width="auto" class="my-aside">
        <!-- el-menu提供router模式,加上这个属性就是router模式
        加完后点击菜单,会自动以菜单的index属性值为路径跳转-->
        <el-menu router default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse">
          <el-menu-item index="/index/information">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/index/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/index/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/index/business">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/index/study">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 右侧显示区 -->
      <el-main class="my-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { logout } from "@/api/index.js";
import { removeToken, getToken } from "@/utils/token.js";
export default {
  //要判断是否有登录,越早越好,所以要在beforeCreate里面
  // 判断token是否为空,空代表没登录返回登录页面
  beforeCreate() {
    if (!getToken()) {
      this.$message.success("请先登录!");
      this.$router.push("/login");
    }
  },
  data() {
    return {
      username: "",
      avatar: "",
      isCollapse: false
    };
  },
  created() {
    // info().then(res => {
    //   if (res.data.code == 200) {
    //     window.console.log(res);
    //     this.username = res.data.data.username;
    //     this.avatar = process.env.VUE_APP_URL + "/" + res.data.data.avatar;
    //   }else if(res.data.code==206){
    //     this.$message.error("登录异常,请重新登录");
    //     //删除token
    //     removeToken();
    //     //跳转到登录页面
    //     this.$router.push("/login")
    //   }
    // });
  },
  methods: {
    logout() {
      this.$confirm("你将退出本系统,是否继续退出?", "是否退出", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          logout().then(res => {
            if (res.data.code == 200) {
              this.$message.success("退出成功!");
              //退出要清空vuex的信息
              this.$store.commit("changeUsername", "");
              this.$store.commit("changeAvatar", "");
              removeToken();
              this.$router.push("/login");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    }
  }
};
</script>

<style lang="less">
.my-container {
  height: 100%;
  .my-header {
    // background-color: pink;
    height: 60px;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      height: 100%;
      i {
        font-size: 24px;
        margin-right: 22px;
      }
      .logo {
        width: 33px;
        height: 28px;
        margin-right: 11px;
      }
      span {
        width: 92px;
        height: 22px;
        font-size: 22px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(73, 161, 255, 1);
      }
    }
    .right {
      display: flex;
      align-items: center;
      height: 100%;
      .userLogo {
        width: 43px;
        height: 43px;
        margin-right: 9px;
      }
      .user {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(99, 99, 99, 1);
        margin-right: 38px;
      }
    }
  }

  .my-main {
    background-color: skyblue;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>