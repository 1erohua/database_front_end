<template>
  <div class="fan-likes-band">
    <div class="container_wrap">
      <div class="batchOption">
        <el-button v-if="false" icon="el-icon-plus" type="success" @click="newAdd($event)"
          >新增喜欢乐队</el-button
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
          >刷新喜欢乐队表</el-button
        >
      </div>

      <el-table
        :data="tableData"
        border
        class=""
        @selection-change="handleCurrentChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column v-if="false" prop="FanID" label="乐迷ID" width="150">
        </el-table-column>
        <el-table-column v-if="false" prop="BandID" label="乐队ID" width="150">
        </el-table-column>
        <el-table-column prop="BandName" label="乐队名称" width="150">
        </el-table-column>
        <el-table-column prop="FormationDate" label="成立日期" width="150">
          <template slot-scope="scope">
            {{ formatDate(scope.row.FormationDate) }}
          </template>
        </el-table-column>
        <el-table-column prop="BandDescription" label="乐队描述" width="200">
        </el-table-column>
        <el-table-column prop="LeaderID" label="队长ID" width="150">
        </el-table-column>
        <el-table-column prop="BandCode" label="乐队代码" width="150">
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-if="false"
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
      :bandInfo="bandInfo"
      @updateBand="updateBand"
    ></Dialog>
  </div>
</template>

<script>
import { getFanLikedBands, addLikedBand, removeLikedBand } from "@/api/request";
import Pagination from "@/components/pagination";
import Dialog from "./Dialog.vue";
import moment from "moment"; // 引入 moment.js

export default {
  name: "FanLikesBand",
  components: {
    Pagination,
    Dialog,
  },
  created() {
    // 获取所有喜欢的乐队信息
    this.getFanLikedBandsMes();
  },
  data() {
    return {
      tableData: [],
      pagiDataAll: 0,
      dialogEditVisible: { value: false },
      bandInfo: {},
      selectedData: [],
      fanId: this.$store.state.fanId,
    };
  },
  methods: {
    // 获取喜欢的乐队信息
    getFanLikedBandsMes() {
      getFanLikedBands(this.fanId).then((res) => {
        this.tableData = res.data;
        this.pagiDataAll = Math.ceil(res.data.length / 10); // 假设每页显示10条数据
      });
    },
    // 分页跳转
    currentChange(item) {
      this.getFanLikedBandsMes(item - 1);
    },
    // 修改喜欢的乐队信息
    handleEdit(index, row) {
      this.bandInfo = {
        ...row,
        FormationDate: moment(row.FormationDate).format('YYYY-MM-DD HH:mm:ss') // 格式化日期
      };
      this.dialogEditVisible.value = true;
    },
    // 删除喜欢的乐队信息
    handleDelete(index, row) {
      this.$confirm("确认删除？")
        .then(() => {
          removeLikedBand(this.fanId, row.BandID)
            .then(() => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getFanLikedBandsMes();
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
            await removeLikedBand(this.fanId, item.BandID);
            this.$message({
              type: "info",
              message: "第" + (index + 1) + "条记录，删除成功!",
            });
          });
          this.$message({
            type: "success",
            message: "全部删除成功!",
          });
          this.getFanLikedBandsMes();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除选中",
          });
        });
    },
    // 新增喜欢的乐队
    newAdd(event) {
      this.lostBlur(event);
      this.bandInfo = {
        FormationDate: moment().format('YYYY-MM-DD HH:mm:ss') // 设置默认日期
      }; // 清空表单
      this.dialogEditVisible.value = true;
    },
    // 刷新喜欢的乐队表
    refresh(event) {
      this.lostBlur(event);
      this.getFanLikedBandsMes();
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
    // 更新喜欢的乐队信息
    updateBand(data) {
      this.getFanLikedBandsMes();
    },
    // 格式化日期
    formatDate(date) {
      return date ? moment(date).format('YYYY-MM-DD HH:mm:ss') : '';
    }
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