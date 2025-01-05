<template>
  <div>
    <!-- 评论弹窗 -->
    <el-dialog
      :visible.sync="dialogEditVisible.value"
      @close="childClose"
      width="30%"
    >
      <el-form :model="reviewInfo" ref="reviewInfo" label-width="100px">
        <el-form-item label="专辑ID">
          <el-input v-model="reviewInfo.AlbumID"></el-input>
        </el-form-item>
        <el-form-item label="评论内容">
          <el-input type="textarea" v-model="reviewInfo.Comment"></el-input>
        </el-form-item>
        <el-form-item label="评分">
          <el-input v-model="reviewInfo.Rating"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('reviewInfo')"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { addAlbumReview, rateAlbum } from "@/api/request";

export default {
  name: "ReviewDialog",
  props: {
    dialogEditVisible: {
      type: Object,
      default() {
        return {};
      },
    },
    reviewInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    childClose() {
      this.dialogEditVisible.value = false;
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const fanId = this.$store.state.fanId;
          const albumId = this.reviewInfo.AlbumID;
          const comment = this.reviewInfo.Comment;
          const rating = this.reviewInfo.Rating;

          addAlbumReview(fanId, albumId, { Comment: comment })
            .then(() => {
              rateAlbum(fanId, albumId, { Rating: rating })
                .then(() => {
                  this.$message({ message: "评论成功", type: "success" });
                  this.$emit("updateReview", this.reviewInfo);
                  this.childClose();
                })
                .catch((err) => {
                  this.$message.error("评分失败!");
                });
            })
            .catch((err) => {
              this.$message.error("评论失败!");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 20px;
}
</style>