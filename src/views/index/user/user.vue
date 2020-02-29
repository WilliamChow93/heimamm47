 <template>
  <div>
    <!-- 顶部卡片 -->
    <el-card class="box-card">
      <el-form ref="formInline" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名称" prop="eid">
          <el-input class="short" v-model="formInline.eid"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="name">
          <el-input class="normal" v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="status">
          <el-select class="normal" v-model="formInline.status">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>清除</el-button>
          <el-button type="primary" icon="el-icon-plus">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 下面卡片 -->
    <el-card class="box-card">
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="eid" label="用户名"></el-table-column>
        <el-table-column prop="name" label="电话"></el-table-column>
        <el-table-column prop="username" label="邮箱"></el-table-column>
        <el-table-column prop="create_time" label="角色"></el-table-column>
        <el-table-column prop="create_time" label="备注"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="text">编辑</el-button>
            <el-button type="text">启用</el-button>
            <el-button type="text">删除</el-button>
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
  </div>
</template>

<script>
export default {
  name: "user",

  components: {},

  data() {
    return {
      formInline: {},
      tableData: [],
      page: 1,
      size: 5,
      total: 0,
      oldItem: null
    };
  },

  methods: {
    sizeChanged() {},
    pageChange() {}
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