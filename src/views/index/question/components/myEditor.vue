<template>
  <div>
    <div ref="toolbar" class="toolbar"></div>
    <div ref="content" class="content">
      {{value}}
    </div>
  </div>
</template>

<script>
// 导入wangEditor
import wangEditor from "wangeditor";
export default {
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  mounted() {
    // var E = window.wangEditor;
    let editor = new wangEditor(this.$refs.toolbar, this.$refs.content);
    editor.customConfig.onchange = html => {
      // html 即变化之后的内容
      this.$emit("input", html);
    };
    editor.create();
  }
};
</script>

<style>
.toolbar {
  border: 1px solid #ccc;
}
.content {
  border: 1px solid #ccc;
  height: 55px;
}
</style>