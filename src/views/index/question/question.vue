<template>
  <div>
    <!-- 上卡片 -->
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
        <el-form-item label="学科" prop="subject">
          <studySelect :isSearch="true" v-model="formInline.subject"></studySelect>
        </el-form-item>
        <el-form-item label="阶段" prop="step">
          <el-select v-model="formInline.step" placeholder="请选择阶段">
            <el-option label="初级" value="1"></el-option>
            <el-option label="中级" value="2"></el-option>
            <el-option label="高级" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业" prop="enterprise">
          <businessSelect :isSearch="true" v-model="formInline.enterprise"></businessSelect>
        </el-form-item>
        <el-form-item label="题型" prop="type">
          <el-select v-model="formInline.type" placeholder="请选择题型">
            <el-option label="单选" value="1"></el-option>
            <el-option label="多选" value="2"></el-option>
            <el-option label="简答" value="3"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="难度" prop="difficulty">
          <el-select v-model="formInline.difficulty" placeholder="请选择难度">
            <el-option label="简单" value="1"></el-option>
            <el-option label="一般" value="2"></el-option>
            <el-option label="困难" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者" prop="username">
          <el-input v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期" prop="create_date">
          <el-date-picker v-model="formInline.create_date" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <br />
        <el-form-item label="标题" class="title" prop="title">
          <el-input v-model="formInline.title"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click="clearSearch">清除</el-button>
          <el-button type="primary" class="el-icon-plus" @click="newQuestion">新增试题</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 下卡片 -->
    <el-card class="box-card1">
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="title" label="题目">
          <template slot-scope="scope">
            <p v-html="scope.row.title"></p>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="学科.阶段">
          <template slot-scope="scope">{{scope.row|formatSbjStep}}</template>
        </el-table-column>
        <el-table-column prop="type" label="题型">
          <template slot-scope="scope">
            <span v-if="scope.row.type==1">单选</span>
            <span v-else-if="scope.row.type==2">多选</span>
            <span v-else>简答</span>
          </template>
        </el-table-column>
        <el-table-column prop="enterprise_name" label="企业"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1">启用</span>
            <span v-else style="color:red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="getEdit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="openQuestion(scope.row)"
            >{{scope.row.status==1? '禁用':'启用'}}</el-button>
            <el-button type="text" @click="addDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        @size-change="sizeChanged"
        @current-change="pageChange"
        :current-page="page"
        :page-sizes="[ 5, 10, 20, 30, 40]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 弹框 -->
    <questionAdd ref="questionAdd"></questionAdd>
    <questionEdit ref="questionEdit"></questionEdit>
  </div>
</template>

<script>
// import { business } from "@/api/business.js";
import {
  questionList,
  questionStatus,
  questionRemove
} from "@/api/question.js";
// 导入新增的对话框
import questionAdd from "./components/questionAdd";
// 导入编辑的对话框
import questionEdit from "./components/questionEdit.vue";
export default {
  name: "question",
  data() {
    return {
      //日期
      value1: "",
      businessList: [],
      formInline: {},
      tableData: [],
      page: 1,
      size: 5,
      total: 0
    };
  },
  components: {
    questionAdd,
    questionEdit
  },
  created() {
    //企业
    // business({
    //   status: 1
    // }).then(res => {
    //   console.log("企业", res);
    //   this.businessList = res.data.data.items;
    // });
    //题目列表
    this.getList();
    // questionList({
    //   page: this.page,
    //   limit: this.size
    // }).then(res => {
    //   console.log(res);
    //   this.tableData = res.data.data.items;
    //   this.total = res.data.data.pagination.total;
    // });
  },
  //过滤器
  filters: {
    // val就等于scope.row
    formatSbjStep(val) {
      let stepName = "";
      if (val.step == 1) {
        stepName = "初级";
      } else if (val.step == 2) {
        stepName = "中级";
      } else {
        stepName = "高级";
      }
      return val.subject_name + " . " + stepName;
    }
  },
  methods: {
    //删除点击事件
    addDel(item) {
      this.$confirm("请问确认要删除吗?")
        .then(() => {
          questionRemove({
            id: item.id
          }).then(res => {
            if (res.data.code == 200) {
              this.$message.success("删除成功!");
              this.getList();
            }
          });
        })
        .catch(() => {
          this.$message("取消删除!");
        });
    },
    //启用,禁用
    openQuestion(item) {
      questionStatus({
        id: item.id
      }).then(res => {
        if (res.data.code == 200) {
          this.$message.success("修改状态成功!");
          this.getList();
        }
      });
    },
    //清除点击事件
    clearSearch() {
      this.$refs.formInline.resetFields();
      this.getList();
    },
    //查询点击事件
    search() {
      this.getList();
    },

    //页容量改变的数据
    sizeChanged(size) {
      this.size = size;
      this.page = 1;
      // 刷新页面
      this.getList();
    },
    //页面改变的数据
    pageChange(page) {
      this.page = page;
      this.getList();
    },
    //新增点击事件
    newQuestion() {
      //打开新增弹框
      this.$refs.questionAdd.dialogFormVisible = true;
      
    },
    //编辑点击事件
    getEdit(item) {
      //把题目列表的信息赋值到对话框
      this.$refs.questionAdd.form = { ...item };
      //获取数据时,城市和对选题是字符串,需要给成数值才能显示出来
      this.$refs.questionAdd.form.city = this.$refs.questionAdd.form.city.split(
        ","
      );
      this.$refs.questionAdd.form.multiple_select_answer = this.$refs.questionAdd.form.multiple_select_answer.split(
        ","
      );
      //打开编辑窗口
      this.$refs.questionAdd.dialogFormVisible = true;
    },
    //封装题目列表
    getList() {
      questionList({
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
<style lang="less">
.box-card {
  // not(:last-child)意思是除了最后一个其他宽度都变150px
  .el-form-item:not(:last-child) .el-form-item__content {
    width: 150px;
  }
  .el-form-item.title .el-form-item__content {
    width: 388px;
  }
  .el-form-item__label {
    margin-right: 31px;
    margin-left: 30px;
  }
  .el-card__body {
    padding-left: 0px;
  }
  .el-form-item .el-form-item__content .el-date-editor {
    width: 150px;
  }
}
.box-card1 {
  margin-top: 21px;
  .el-pagination {
    text-align: center;
    margin-top: 31px;
  }
}
</style>