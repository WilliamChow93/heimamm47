<template>
  <el-dialog center title="编辑学科" :visible.sync="dialogFormVisible" width="600px">
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
      <el-button type="primary" @click="getEdit">提 交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { studyEdit } from "@/api/study.js";
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
    getEdit() {
      studyEdit(this.form).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.$message.success("修改成功");
          this.dialogFormVisible = false;
          //重新加载表格数据
          this.$parent.getList();
        } else {
          this.$message.error(res.data.message);
        }
      });
    }
  }
};
</script>

<style>
</style>