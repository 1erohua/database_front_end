<template>
  <div>
    <!-- 修改弹窗 -->
    <el-dialog
      :visible.sync="dialogEditVisible.value"
      @close="childClose"
      width="30%"
    >
      <el-form :model="albumInfo" ref="albumInfo" label-width="100px">
        <el-form-item label="专辑名称">
          <el-input v-model="albumInfo.AlbumName"></el-input>
        </el-form-item>
        <el-form-item label="发布日期">
          <el-date-picker
            v-model="albumInfo.ReleaseDate"
            type="datetime"
            placeholder="选择日期"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="专辑描述">
          <el-input type="textarea" v-model="albumInfo.AlbumDescription"></el-input>
        </el-form-item>
        <el-form-item label="乐队ID">
          <el-input v-model.number="albumInfo.BandID"></el-input>
        </el-form-item>
        <el-form-item label="专辑代码">
          <el-input v-model="albumInfo.AlbumCode"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('albumInfo')"
            >确认修改</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { updateAlbum, addAlbum } from "@/api/request";
import moment from "moment";

export default {
  name: "AlbumDialog",
  props: {
    dialogEditVisible: {
      type: Object,
      default() {
        return {};
      },
    },
    albumInfo: {
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
          if (this.albumInfo.AlbumID) {
            // 更新专辑信息
            updateAlbum(this.albumInfo.AlbumID, this.albumInfo)
              .then(() => {
                this.$message({ message: "更新成功", type: "success" });
                this.$emit("updateAlbum", this.albumInfo);
                this.childClose();
              })
              .catch((err) => {
                this.$message.error("更新失败!");
              });
          } else {
            // 新增专辑
            addAlbum(this.albumInfo)
              .then(() => {
                this.$message({ message: "新增成功", type: "success" });
                this.$emit("updateAlbum", this.albumInfo);
                this.childClose();
              })
              .catch((err) => {
                this.$message.error("新增失败!");
              });
          }
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