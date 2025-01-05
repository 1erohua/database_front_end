<template>
  <div class="fan-attend-concert">
    <div class="container_wrap">
      <div class="batchOption">
        <el-button v-if="false" icon="el-icon-plus" type="success" @click="newAdd($event)"
          >新增参加的演唱会</el-button
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
          >刷新演唱会表</el-button
        >
      </div>

      <el-table
        :data="tableData"
        border
        class=""
        @selection-change="handleCurrentChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column v-if="false" prop="ConcertID" label="演唱会ID" width="150">
        </el-table-column>
        <el-table-column prop="ConcertName" label="演唱会名称" width="150">
        </el-table-column>
        <el-table-column prop="ConcertDate" label="演唱会日期" width="150">
        </el-table-column>
        <el-table-column prop="Location" label="地点" width="200">
        </el-table-column>
        <el-table-column prop="BandID" label="乐队ID" width="150">
        </el-table-column>
        <el-table-column prop="ConcertCode" label="演唱会代码" width="150">
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              icon="el-icon-delete"
              type="danger"
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
      :concertInfo="concertInfo"
      @updateConcert="updateConcert"
    ></Dialog>
  </div>
</template>

<script>
import { getFanAttendedConcerts, addAttendedConcert, removeAttendedConcert } from "@/api/request";
import Pagination from "@/components/pagination";
import Dialog from "./Dialog.vue";

export default {
  name: "FanAttendConcert",
  components: {
    Pagination,
    Dialog,
  },
  created() {
    // 获取当前乐迷参加的演唱会信息
    this.getConcertMes();
  },
  data() {
    return {
      tableData: [],
      pagiDataAll: 0,
      dialogEditVisible: { value: false },
      concertInfo: {},
      selectedData: [],
      fanId: this.$store.state.fanId,
    };
  },
  methods: {
    // 获取乐迷参加的演唱会信息
    getConcertMes() {
      getFanAttendedConcerts(this.fanId).then((res) => {
        this.tableData = res.data;
        this.pagiDataAll = Math.ceil(res.data.length / 10); // 假设每页显示10条数据
      });
    },
    // 分页跳转
    currentChange(item) {
      this.getConcertMes(item - 1);
    },
    // 删除参加的演唱会
    handleDelete(index, row) {
      this.$confirm("确认删除？")
        .then(() => {
          removeAttendedConcert(this.fanId, row.ConcertID)
            .then(() => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getConcertMes();
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
            await removeAttendedConcert(this.fanId, item.ConcertID);
            this.$message({
              type: "info",
              message: "第" + (index + 1) + "条记录，删除成功!",
            });
          });
          this.$message({
            type: "success",
            message: "全部删除成功!",
          });
          this.getConcertMes();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除选中",
          });
        });
    },
    // 新增参加的演唱会
    newAdd(event) {
      this.lostBlur(event);
      this.concertInfo = {}; // 清空表单
      this.dialogEditVisible.value = true;
    },
    // 刷新演唱会表
    refresh(event) {
      this.lostBlur(event);
      this.getConcertMes();
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
    // 更新演唱会信息
    updateConcert(data) {
      this.getConcertMes();
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