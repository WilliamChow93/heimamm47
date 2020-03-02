<template>
  <el-dialog width="477px" center :title="isAdd ? '新增用户':'编辑用户'" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item  label="角色" prop="role" :label-width="formLabelWidth">
        <el-select @change="form.role_id=form.role" v-model="form.role" placeholder="请选择角色">
          <el-option label="管理员" value="2"></el-option>
          <el-option label="老师" value="3"></el-option>
          <el-option label="学生" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status" :label-width="formLabelWidth">
        <el-select label="状态" v-model="form.status" placeholder="请选择状态">
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户备注" prop="remark" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { userAdd, userEdit } from "@/api/user.js";
export default {
  data() {
    return {
      //判断是否新增,true是新增,false是编辑
      isAdd: true,
      dialogFormVisible: false,
      formLabelWidth: "80px",
      form: {},
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          {
            pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
            message: "请输入正确的邮箱格式",
            trigger: "blur"
          }
        ],
        phone: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          {
            pattern: /0?(13|14|15|18|17)[0-9]{9}/,
            message: "请输入正确的手机格式",
            trigger: "blur"
          }
        ],
        role_id: [
          { required: true, message: "用户名不能为空", trigger: "change" }
          //值改变就判断用change
        ]
      }
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.isAdd) {
            userAdd(this.form).then(res => {
              if (res.data.code == 200) {
                this.$message.success("增加成功!");
                //管理弹框
                this.dialogFormVisible = false;
                //刷新页面
                this.$parent.getList();
              } else {
                this.$message.error(res.data.message);
              }
            });
          } else {
            //编辑
            userEdit(this.form).then(res => {
              if (res.data.code == 200) {
                this.$message.success("编辑成功!");
                //管理弹框
                this.dialogFormVisible = false;
                //刷新页面
                this.$parent.getList();
              } else {
                this.$message.error(res.data.message);
              }
            });
          }
        }
      });
    }
  }
};
</script>

<style>
</style>