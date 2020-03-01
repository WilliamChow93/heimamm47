<template>
  <div>
    <el-card class="box-card">
      <!-- inline控制的是否行内表单，true代表行内表单，false代表不是 -->
      <el-form ref="form" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="企业编号" prop="eid">
          <el-input class="short" v-model="formInline.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input class="long" v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input class="short" v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select class="long" v-model="formInline.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="clearSearch">清除</el-button>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="$refs.businessAdd.dialogFormVisible=true"
          >新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="eid" label="企业编号"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1">启用</span>
            <span v-else style="color:red">禁用</span>
          </template>
        </el-table-column>
        <!-- 表格里如果想放按钮，或者是想放除了字符串以外的数据，都要用自定义列模板，因为它方便拿取这一行的数据 -->
        <!-- 自定义列在el-table-column里写template，在加一个slot-scope=“scope”属性 -->
        <!-- scope.row就是这一行的数据
        scope.$index就是这一行的索引-->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="showEdit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="openClick(scope.row)"
            >{{scope.row.status==1 ? '禁用':'启用'}}</el-button>
            <el-button type="text" size="small" @click="bsnDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- el-pagination分页
        page-sizes页码显示数据的数量
        current-page:设置当前页
        layout：设置布局风格
      -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5,10, 20, 30, 40]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 子组件出口 -->
    <businessAdd ref="businessAdd"></businessAdd>
    <businessEdit ref="businessEdit"></businessEdit>
  </div>
</template>

<script>
import { business, bsnStatus, bsnRemove } from "@/api/business.js";
import businessAdd from "./components/businessAdd.vue";
import businessEdit from "./components/businessEdit.vue";
export default {
  name: "business",
  components: {
    businessAdd,
    businessEdit
  },
  data() {
    return {
      formInline: {
        name: ""
      },
      //企业列表
      tableData: [],
      //当前页数
      page: this.page,
      //页面显示数据条数
      size: 5,
      //总条数
      total: 0,
      //记录上次点击的是哪一行数据
      oldItem: null
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //清空点击事件
    clearSearch() {
      this.$refs.form.resetFields();
      this.getList();
    },

    //搜索点击事件
    search() {
      //当页面为第二页是,只会搜索第二页的内容,所以要设置会第一页
      this.page = 1;
      //信息绑定了直接调用企业列表
      this.getList();
    },

    //编辑点击事件
    showEdit(item) {
      console.log("item:", item);
      //显示编辑窗口
      this.$refs.businessEdit.dialogFormVisible = true;
      if (item != this.oldItem) {
        //克隆对象
        this.$refs.businessEdit.form = { ...item };
        this.oidItem = item;
      }
    },

    //启用,禁用点击事件
    openClick(item) {
      console.log("item:", item);
      bsnStatus({
        id: item.id
      }).then(res => {
        console.log(res);
        //调用企业列表
        this.getList();
      });
    },

    //删除点击事件
    bsnDel(item) {
      bsnRemove({
        id: item.id
      }).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.$message.success("删除成功!");
          this.getList();
        } else {
          this.$mseeage.error(res.data.message);
        }
      });
    },
    handleSizeChange(size) {
      console.log(`每页 ${size} 条`);
      this.size = size;
      this.page = 1;
      this.getList();
    },
    handleCurrentChange(page) {
      console.log(`当前页: ${page}`);
      this.page = page;
      //页码改变后获取数据
      this.getList();
    },
    //封装企业列表的函数
    getList() {
      business({
        page: this.page,
        limit: this.size,
        ...this.formInline
      }).then(res => {
        console.log(res);
        this.tableData = res.data.data.items;
        this.total = res.data.data.pagination.total;
      });
    }
  }
};
</script>

<style>
</style>