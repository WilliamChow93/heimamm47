<template>
  <el-dialog center title="新增学科" :visible.sync="dialogFormVisible" width="600px">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="学科编号" prop="rid" :label-width="formLabelWidth">
        <el-input v-model="form.rid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科姓名" prop="name" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" prop="short_name" :label-width="formLabelWidth">
        <el-input v-model="form.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" prop="intro" :label-width="formLabelWidth">
        <el-input v-model="form.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科备注" prop="remark" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitAdd">提 交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { studyAdd } from "@/api/study.js";

export default {
  data() {
    return {
      //控制对话框显示或隐藏
      dialogFormVisible: false,
      //标签宽度
      formLabelWidth: "80px",
      form: {},
      rules: {
        rid: [{ required: true, message: "学科编号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "学科名称不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitAdd() {
      this.$refs.form.validate(valid => {
        if (valid) {
          studyAdd(
           //方法一
          // rid: this.form.rid,
          // name: this.form.name,
          // short_name: this.form.short_name,
          // intro: this.form.intro,
          // remark: this.form.remark,
          //方法二
          // ...this.form
          //方法三(this.form本来就是一个方法所以不用大括号{})
          this.form
          ).then(response => {
            if (response.data.code == 200) {
              this.$message.success("添加成功");
              //添加成功关闭弹窗
              this.dialogFormVisible = false;
              //刷新表格
              this.$parent.getList();
            } else {
              this.$message.error(response.data.message);
            }
          });
        }
      });
    }
  }
};
</script>

<style>
</style>