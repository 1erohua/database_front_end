<template>
  <div class="fan-review">
    <div class="container_wrap">
      <div class="batchOption">
        <el-button icon="el-icon-plus" type="success" @click="newReview($event)"
          >新增评论</el-button
        >
      </div>

      <el-table :data="tableData" border class="">
        <el-table-column prop="AlbumID" label="专辑ID" width="150">
        </el-table-column>
        <el-table-column prop="Comment" label="评论内容" width="300">
        </el-table-column>
        <el-table-column prop="Rating" label="评分" width="150">
        </el-table-column>
        <el-table-column prop="ReviewDate" label="评论日期" width="150">
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

    <!-- 弹窗 -->
    <Dialog
      :dialogEditVisible="dialogEditVisible"
      :reviewInfo="reviewInfo"
      @updateReview="updateReview"
    ></Dialog>
  </div>
</template>

<script>
import { addAlbumReview, rateAlbum, getBandAlbumReviews } from "@/api/request";
import Dialog from "./Dialog.vue";

export default {
  name: "FanReview",
  components: {
    Dialog,
  },
  created() {
    // 获取当前粉丝的评论信息
    this.getReviewMes();
  },
  data() {
    return {
      tableData: [],
      dialogEditVisible: { value: false },
      reviewInfo: {},
    };
  },
  methods: {
    // 获取评论信息
    getReviewMes() {
      const fanId = this.$store.state.fanId;
      getBandAlbumReviews(fanId).then((res) => {
        this.tableData = res.data;
      });
    },
    // 新增评论
    newReview(event) {
      this.lostBlur(event);
      this.reviewInfo = {}; // 清空表单
      this.dialogEditVisible.value = true;
    },
    // 修改评论
    handleEdit(index, row) {
      this.reviewInfo = row;
      this.dialogEditVisible.value = true;
    },
    // 删除评论
    handleDelete(index, row) {
      this.$confirm("确认删除？")
        .then(() => {
          deleteAlbumReview(row.ReviewID)
            .then(() => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getReviewMes();
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
    // 失焦处理
    lostBlur(event) {
      let target = event.target;
      if (target.nodeName == "SPAN") {
        target = event.target.parentNode;
      }
      target.blur();
    },
    // 更新评论信息
    updateReview(data) {
      this.getReviewMes();
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
</style>