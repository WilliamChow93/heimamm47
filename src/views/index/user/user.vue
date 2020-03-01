 <template>
  <div>
    <!-- 顶部卡片 -->
    <el-card class="box-card">
      <el-form ref="formInline" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名称" prop="username">
          <el-input class="short" v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input class="normal" v-model="formInline.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select class="normal" v-model="formInline.role_id">
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="clearSearch">清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="goDialog">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 下面卡片 -->
    <el-card class="box-card">
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1">启用</span>
            <span v-else style="color:red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="userEdit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="showStatus(scope.row)"
            >{{scope.row.status==1 ? '禁用':'启用'}}</el-button>
            <el-button type="text" @click="userDel(scope.row)">删除</el-button>
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
    <userdialog ref="userdialog"></userdialog>
  </div>
</template>

<script>
import { userList, userStatus, userRemove } from "@/api/user.js";
import userdialog from "./components/userDialog.vue";
export default {
  name: "user",

  components: {
    userdialog
  },

  data() {
    return {
      formInline: {},
      tableData: [],

      //当前页
      page: this.page,
      //当前数据显示的数量
      size: 5,
      //总条数
      total: 0,

      oldItem: ''
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //编辑点击事件
    userEdit(item) {
      console.log(item);
      this.$refs.userdialog.isAdd = false;
      this.$refs.userdialog.dialogFormVisible = true;
      //点击不是上一条的信息的时候才赋值
      if (this.oldItem != item) {
        this.$refs.userdialog.form = { ...item };
        this.oldItem = item;
      }
    },
    //添加点击事件
    goDialog() {
      this.$refs.userdialog.dialogFormVisible = true;
      //添加第二次,第一次的内容还在,所以要清空页面内容
      this.$refs.userdialog.form = {};
    },
    //删除的点击事件
    userDel(item) {
      userRemove({
        id: item.id
      }).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.$message.success("删除成功!");
          this.getList();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //清除点击事件
    clearSearch() {
      this.$refs.formInline.resetFields();
      this.page = 1;
      this.getList();
    },
    //启用,禁用点击事件
    showStatus(item) {
      console.log("item:", item);
      userStatus({
        id: item.id
      }).then(res => {
        console.log(res);
        //刷新页面
        this.getList();
      });
    },
    //搜索点击事件
    search() {
      this.getList();
    },
    sizeChanged(size) {
      this.size = size;
      this.page = 1;
      this.getList();
    },
    pageChange(page) {
      this.page = page;
      this.getList();
    },
    //封装获取用户列表
    getList() {
      userList({
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
.box-card {
  margin-bottom: 19px;
}
.short {
  width: 90px;
}

.normal {
  width: 139px;
}
</style>