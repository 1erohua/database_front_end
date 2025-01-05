<template>
  <div class="fan-detail">
    <div class="container_wrap">
      <div class="batchOption">
        <el-button icon="el-icon-plus" type="success" @click="newAdd($event)"
          >新增粉丝</el-button
        >
        <el-button
          icon="el-icon-delete"
          type="danger"
          @click="batchDelete($event)"
          >删除选中</el-button
        >
        <el-button
          icon="el-icon-refresh"
          type="warning"
          @click="refresh($event)"
          >刷新粉丝表</el-button
        >
      </div>

      <el-table
        :data="tableData"
        border
        class=""
        @selection-change="handleCurrentChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column v-if="false" prop="FanID" label="粉丝ID" width="150">
        </el-table-column>
        <el-table-column prop="Name" label="姓名" width="150">
        </el-table-column>
        <el-table-column prop="Gender" label="性别" width="150">
        </el-table-column>
        <el-table-column prop="Age" label="年龄" width="150">
        </el-table-column>
        <el-table-column prop="Occupation" label="职业" width="150">
        </el-table-column>
        <el-table-column prop="Education" label="教育程度" width="150">
        </el-table-column>
        <el-table-column prop="FanCode" label="粉丝代码" width="150">
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
              >修改</el-button
            >
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination">
      <Pagination
        :pageCount="pagiDataAll"
        @cpnPageJumpTo="currentChange"
      ></Pagination>
    </div>

    <!-- 弹窗 -->
    <Dialog
      :dialogEditVisible="dialogEditVisible"
      :fanInfo="fanInfo"
      @updateFan="updateFan"
    ></Dialog>
  </div>
</template>

<script>
import { getAllFans, deleteFan } from "@/api/request";
import Pagination from "@/components/pagination";
import Dialog from "./Dialog.vue";

export default {
  name: "FanDetail",
  components: {
    Pagination,
    Dialog,
  },
  created() {
    // 获取所有粉丝信息
    this.getFanMes();
  },
  data() {
    return {
      tableData: [],
      pagiDataAll: 0,
      dialogEditVisible: { value: false },
      fanInfo: {},
      selectedData: [],
    };
  },
  methods: {
    // 获取粉丝信息
    getFanMes() {
      getAllFans().then((res) => {
        this.tableData = res.data;
        this.pagiDataAll = Math.ceil(res.data.length / 10); // 假设每页显示10条数据
      });
    },
    // 分页跳转
    currentChange(item) {
      this.getFanMes(item - 1);
    },
    // 修改粉丝信息
    handleEdit(index, row) {
      this.fanInfo = row;
      this.dialogEditVisible.value = true;
    },
    // 删除粉丝信息
    handleDelete(index, row) {
      this.$confirm("确认删除？")
        .then(() => {
          deleteFan(row.FanID)
            .then(() => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getFanMes();
            })
            .catch((err) => {
              this.$message.error("删除失败!");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 批量删除
    batchDelete(event) {
      this.lostBlur(event);
      this.$confirm("确认删除选中？")
        .then(() => {
          this.selectedData.forEach(async (item, index) => {
            await deleteFan(item.FanID);
            this.$message({
              type: "info",
              message: "第" + (index + 1) + "条记录，删除成功!",
            });
          });
          this.$message({
            type: "success",
            message: "全部删除成功!",
          });
          this.getFanMes();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除选中",
          });
        });
    },
    // 新增粉丝
    newAdd(event) {
      this.lostBlur(event);
      this.fanInfo = {}; // 清空表单
      this.dialogEditVisible.value = true;
    },
    // 刷新粉丝表
    refresh(event) {
      this.lostBlur(event);
      this.getFanMes();
    },
    // 处理选中项
    handleCurrentChange(rows) {
      this.selectedData = rows;
    },
    // 失焦处理
    lostBlur(event) {
      let target = event.target;
      if (target.nodeName == "SPAN") {
        target = event.target.parentNode;
      }
      target.blur();
    },
    // 更新粉丝信息
    updateFan(data) {
      this.getFanMes();
    },
  },
};
</script>

<style lang="scss" scoped>
.batchOption {
  margin-bottom: 5px;
  .el-button {
    font-size: 10px;
    padding: 5px;
  }
}
.pagination {
  text-align: center;
  margin-top: 15px;
}
</style>