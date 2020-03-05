<template>
  <el-cascader
    @change="areaChange"
    v-model="city"
    :options="options"
    :props="{ expandTrigger: 'hover',value:'label' }"
  ></el-cascader>
</template>

<script>
import { regionDataPlus } from "element-china-area-data";
export default {
  data() {
    return {
      //级联选择器
      options: regionDataPlus,
      city:this.value
    };
  },
  props: {
    vaule: {
      default: ""
    }
  },
  methods: {
      areaChange(){
          this.$emit('input',this.city)
      }
  },
};
</script>

<style>
</style>