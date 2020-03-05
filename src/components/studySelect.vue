<template>
  <el-select v-model="subject" placeholder="请选择学科" @change="selChange">
    <el-option value="" v-if="isSearch">所有学科</el-option>
    <el-option :label="item.name" :value="item.id" v-for="(item, index) in studyList" :key="index"></el-option>
  </el-select>
</template>

<script>
import { studyList } from "@/api/study.js";

export default {
  data() {
    return {
      studyList: [],
      subject: this.value
    };
  },
  props: {
    value: {
      default: ""
    },
    isSearch: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    selChange() {
      this.$emit("input", this.subject);
    }
  },
  //监听器
  watch: {
    value(val) {
      this.subject = val;
    }
  },
  created() {
    //学科
    studyList({
      status: 1
    }).then(res => {
      console.log(res);
      this.studyList = res.data.data.items;
    });
  }
};
</script>

<style>
</style>