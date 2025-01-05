<template>
  <div>
    <!-- 修改弹窗 -->
    <el-dialog
      :visible.sync="dialogEditVisible.value"
      @close="childClose"
      width="30%"
    >
      <el-form :model="songInfo" ref="songInfo" label-width="100px">
        <el-form-item label="歌曲名称">
          <el-input v-model="songInfo.SongName"></el-input>
        </el-form-item>
        <el-form-item label="作词人">
          <el-input v-model="songInfo.Lyricist"></el-input>
        </el-form-item>
        <el-form-item label="作曲人">
          <el-input v-model="songInfo.Composer"></el-input>
        </el-form-item>
        <el-form-item label="专辑ID">
          <el-input v-model.number="songInfo.AlbumID"></el-input>
        </el-form-item>
        <el-form-item label="歌曲代码">
          <el-input v-model="songInfo.SongCode"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('songInfo')"
            >确认修改</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { updateLikedSong, addLikedSong } from "@/api/request";

export default {
  name: "SongDialog",
  props: {
    dialogEditVisible: {
      type: Object,
      default() {
        return {};
      },
    },
    songInfo: {
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
          if (this.songInfo.SongID) {
            // 更新喜欢的歌曲信息
            updateLikedSong(this.$store.state.fanId, this.songInfo.SongID, this.songInfo)
              .then(() => {
                this.$message({ message: "更新成功", type: "success" });
                this.$emit("updateSong", this.songInfo);
                this.childClose();
              })
              .catch((err) => {
                this.$message.error("更新失败!");
              });
          } else {
            // 新增喜欢的歌曲
            addLikedSong(this.$store.state.fanId, this.songInfo)
              .then(() => {
                this.$message({ message: "新增成功", type: "success" });
                this.$emit("updateSong", this.songInfo);
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