<template>
  <div class="fan-review">
    <div class="container_wrap">
      <div class="batchOption">
        <el-button icon="el-icon-plus" type="success" @click="openDialog">发表评论</el-button>
        <el-button icon="el-icon-delete" type="danger" @click="batchDelete">删除选中</el-button>
        <el-button icon="el-icon-refresh" type="warning" @click="refresh">刷新评论</el-button>
      </div>

      <el-table :data="reviewData" border @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="ReviewID" label="评论ID" width="100"> </el-table-column>
        <el-table-column prop="AlbumID" label="专辑ID" width="100"> </el-table-column>
        <el-table-column prop="Comment" label="评论内容" width="200"> </el-table-column>
        <el-table-column prop="Rating" label="评分" width="100"> </el-table-column>
        <el-table-column prop="ReviewDate" label="评论日期" width="150">
          <template slot-scope="scope">
            <!-- 格式化日期为 YYYY-MM-DD -->
            {{ formatDate(scope.row.ReviewDate) }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row.ReviewID)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 发表评论弹窗 -->
    <ReviewDialog :dialogVisible="dialogVisible" @closeDialog="closeDialog" @submitReview="submitReview"></ReviewDialog>
  </div>
</template>

<script>
import { getFanReviews, deleteAlbumReview, addAlbumReview } from "@/api/request";
import ReviewDialog from "./ReviewDialog.vue";
import { mapState } from "vuex";

export default {
  name: "FanReview",
  components: {
    ReviewDialog,
  },
  data() {
    return {
      reviewData: [],
      dialogVisible: false,
      selectedReviews: [],
    };
  },
  computed: {
    ...mapState({
      fanId: (state) => state.fanId, // 从 store 中获取当前歌迷的 fanId
    }),
  },
  created() {
    this.getReviews();
  },
  methods: {
    // 获取评论
    getReviews() {
      getFanReviews(this.fanId).then((res) => {
        let { reviews } = res.data;
        if (Array.isArray(reviews)) {
          this.reviewData = reviews; // 直接赋值
        } else {
          console.error('Expected an array, but got:', typeof res.data);
          this.reviewData = []; // 如果数据格式不正确，设置为空数组
        }
      }).catch((error) => {
        console.error('Failed to fetch reviews:', error);
        this.reviewData = []; // 如果请求失败，设置为空数组
      });
    },
    // 格式化日期为 YYYY-MM-DD
    formatDate(date) {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = (d.getMonth() + 1).toString().padStart(2, "0");
      const day = d.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    // 打开发表评论弹窗
    openDialog() {
      this.dialogVisible = true;
    },
    // 关闭弹窗
    closeDialog() {
      this.dialogVisible = false;
    },
    // 提交评论
    submitReview(data) {
      // 生成当前日期，格式为 YYYY-MM-DD
      const currentDate = new Date().toISOString().split('T')[0]; // 提取 YYYY-MM-DD 部分
      const reviewData = {
        ...data,
        ReviewDate: currentDate, // 添加评论日期
      };

      addAlbumReview(this.fanId, data.AlbumID, reviewData).then(() => {
        this.$message({ message: "评论发表成功", type: "success" });
        this.getReviews();
        this.closeDialog();
      });
    },
    // 删除评论
    handleDelete(reviewId) {
      this.$confirm("确认删除该评论？")
        .then(() => {
          deleteAlbumReview(this.fanId, reviewId).then(() => {
            this.$message({ message: "删除成功", type: "success" });
            this.getReviews();
          });
        })
        .catch(() => {
          this.$message({ type: "info", message: "已取消删除" });
        });
    },
    // 批量删除
    batchDelete() {
      this.$confirm("确认删除选中评论？")
        .then(() => {
          this.selectedReviews.forEach((reviewId) => {
            deleteAlbumReview(this.fanId, reviewId);
          });
          this.$message({ message: "批量删除成功", type: "success" });
          this.getReviews();
        })
        .catch(() => {
          this.$message({ type: "info", message: "已取消删除" });
        });
    },
    // 刷新评论
    refresh() {
      this.getReviews();
    },
    // 处理选中项
    handleSelectionChange(rows) {
      this.selectedReviews = rows.map((row) => row.ReviewID);
    },
  },
};
</script>

<style lang="scss" scoped>
.fan-review {
  .batchOption {
    margin-bottom: 5px;
    .el-button {
      font-size: 10px;
      padding: 5px;
    }
  }
}
</style>
