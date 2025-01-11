<template>
  <div>
    <!-- 发表评论弹窗 -->
    <el-dialog
      :visible.sync="dialogVisible"
      @close="closeDialog"
      width="30%"
    >
      <el-form :model="reviewForm" ref="reviewForm" label-width="100px">
        <el-form-item label="专辑ID">
          <el-input v-model.number="reviewForm.AlbumID"></el-input>
        </el-form-item>
        <el-form-item label="评论内容">
          <el-input type="textarea" v-model="reviewForm.Comment"></el-input>
        </el-form-item>
        <el-form-item label="评分">
          <el-input-number v-model.number="reviewForm.Rating"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ReviewDialog",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      reviewForm: {
        AlbumID: null,
        Comment: "",
        Rating: null,
      },
    };
  },
  methods: {
    // 关闭弹窗
    closeDialog() {
      this.$emit("closeDialog");
    },
    // 提交表单
    submitForm() {
      this.$emit("submitReview", this.reviewForm);
      this.closeDialog();
    },
  },
};
</script>

<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 20px;
}
</style>