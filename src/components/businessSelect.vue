<template>
  <el-select v-model="enterprise" placeholder="请选择企业" @change="selChange">
    <el-option value v-if="isSearch">所有企业</el-option>
    <el-option
      v-for="(item, index) in businessList"
      :key="index"
      :label="item.name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>

<script>
import { business } from "@/api/business.js";
export default {
  data() {
    return {
      // 企业选项
      businessList: [],
      enterprise: this.value
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
  //监听器,
  watch: {
    value(val) {
      this.enterprise = val;
    }
  },
  methods: {
    selChange() {
      this.$emit("input", this.enterprise);
    }
  },
  created() {
    //企业
    business({
      status: 1
    }).then(res => {
      console.log("企业", res);
      this.businessList = res.data.data.items;
    });
  }
};
</script>

<style>
</style>