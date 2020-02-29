<template>
  <el-dialog center title="编辑企业" :visible.sync="dialogFormVisible" width="600px">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="企业编号" prop="eid" :label-width="formLabelWidth">
        <el-input v-model="form.eid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业姓名" prop="name" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简称" prop="short_name" :label-width="formLabelWidth">
        <el-input v-model="form.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简介" prop="intro" :label-width="formLabelWidth">
        <el-input v-model="form.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业备注" prop="remark" :label-width="formLabelWidth">
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
import { bsnEdit } from "@/api/business.js";
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "80px",
      form: {},
      rules: {
        eid: [{ required: true, message: "企业编号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "企业名称不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    getEdit() {
      bsnEdit(this.form).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.$message.success("修改成功");
          this.dialogFormVisible = false;
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