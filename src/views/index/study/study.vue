<template>
  <div>
    <el-card class="box-card">
      <!-- inline控制的是否行内表单，true代表行内表单，false代表不是 -->
      <el-form ref="form" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号" prop="rid">
          <el-input class="short" v-model="formInline.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
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
          <el-button @click="chearSearch">清除</el-button>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="$refs.study_add.dialogFormVisible = true"
          >新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期">
          <template slot-scope="scope">{{scope.row.create_time|formatTime}}</template>
        </el-table-column>
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
        <el-table-column label="操作" v-if="['超级管理员','管理员','老师'].includes($store.state.role)">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="showEdit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="openClick(scope.row)"
            >{{scope.row.status==1 ? '禁用':'启用'}}</el-button>
            <el-button type="text" size="small" @click="delStudy(scope.row)" v-if="['超级管理员','管理员'].includes($store.state.role)">删除</el-button>
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
    <studyAdd ref="study_add"></studyAdd>
    <studyEdit ref="study_edit"></studyEdit>
  </div>
</template>

<script>
//导入子组件
import studyAdd from "./components/studyAdd";
import studyEdit from "./components/studyEdit";
import { studyList, status, studtDel } from "@/api/study.js";
export default {
  name: "study",
  components: {
    studyAdd,
    studyEdit
  },
  data() {
    return {
      //表格绑定的数据源
      tableData: [],
      //行内表单绑定的对象
      formInline: {
        user: "",
        region: ""
      },
      //当前页
      page: this.page,
      //当前页显示数据的条数
      size: 5,
      //数据总数量
      total: 0,
      //记录上次点击的是哪一行数据
      oldItem: ""
    };
  },
  created() {
    //获取学科信息列表
    // params参数在studyList(page:2,limit:1,)传
    // studyList().then(res => {
    //   console.log(res);
    // this.tableData = res.data.data.items;
    // });
    //调用学科列表封装的函数
    this.getList();
  },
  methods: {
    //删除点击事件
    delStudy(item) {
      console.log(item);
      studtDel({
        id: item.id
      }).then(res => {
        if (res.data.code == 200) {
          this.$message.success("删除成功!");
          this.getList();
        } else {
          this.$message.error(res.data.message);
        }
        //判断是不是最后一条数据
        if (this.tableData.length == 1) {
          //显示上一页
          this.page--;
        }
        //如果删除最后一条,页码为0,让他page第一页
        if (this.page == 0) {
          this.page = 1;
        }
      });
    },
    //编辑学科列表点击事件
    showEdit(item) {
      console.log(item);
      //把studyEdit的表单数据绑定到这里
      //下面这句话是有bug的,因为地址传递会互相影响值的
      // this.$refs.study_edit.form = item;
      //所以要拷贝一个对象,有大括号就是一个新对象
      // this.$refs.study_edit.form = { ...item };
      if (item != this.oldItem) {
        this.$refs.study_edit.form = { ...item };
        //并把记录的上一下保存到当前行的数据里
        this.oldItem = item;
      }
      //显示编辑的窗口
      this.$refs.study_edit.dialogFormVisible = true;
    },
    //清空表单
    chearSearch() {
      this.$refs.form.resetFields();
    },
    //搜索按钮点击事件
    search() {
      console.log("good:", this.formInline);
      //请求数据
      this.getList();
    },
    //启用,禁用点击事件
    openClick(item) {
      console.log("item:", item);
      //获取学科状态设置
      status({
        id: item.id
      }).then(res => {
        console.log("学科:", res);
        //刷新页面
        // 只要刷新表格就可以
        // studyList().then(res => {
        //   console.log(res);
        //   this.tableData = res.data.data.items;
        // });
        //调用学科列表封装的函数
        this.getList();
      });
    },
    //页容量发生改变就触发
    //参数是改变后的显示数据条数
    handleSizeChange(size) {
      console.log(`每页 ${size} 条`);
      //设置当前页为显示的条数
      this.size = size;
      // 只要页容量改变了，都应该从第一页重新显示
      this.page = 1;
      this.getList();
    },
    //页容量发生改变就触发
    //参数是改变后的页码
    handleCurrentChange(page) {
      console.log(`当前页: ${page}`);
      this.page = page;
      this.getList();
    },
    //封装学科列表的函数
    getList() {
      //获取学科信息列表
      // params参数在studyList(page:2,limit:1,)传
      studyList({
        page: this.page,
        limit: this.size,
        // name:this.formInline.name,
        // rid:this.formInline.rid,
        // username:this.formInline.username,
        // status:this.formInline.status,
        ...this.formInline
      }).then(res => {
        console.log(res);
        //获取数据总数量
        this.total = res.data.data.pagination.total;
        //获取学科信息
        this.tableData = res.data.data.items;
        //获取学科信息
      });
    }
  }
};
</script>

<style>
.box-card {
  margin-bottom: 19px;
}
.short {
  width: 100px !important;
}
.long {
  width: 149px !important;
}
</style>