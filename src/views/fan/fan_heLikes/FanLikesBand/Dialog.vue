<template>
  <div>
    <!-- 修改弹窗 -->
    <el-dialog
      :visible.sync="dialogEditVisible.value"
      @close="childClose"
      width="30%"
    >
      <el-form :model="bandInfo" ref="bandInfo" label-width="100px">
        <el-form-item label="乐队名称">
          <el-input v-model="bandInfo.BandName"></el-input>
        </el-form-item>
        <el-form-item label="成立日期">
          <el-date-picker
            v-model="bandInfo.FormationDate"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="乐队描述">
          <el-input type="textarea" v-model="bandInfo.BandDescription"></el-input>
        </el-form-item>
        <el-form-item label="队长ID">
          <el-input v-model.number="bandInfo.LeaderID"></el-input>
        </el-form-item>
        <el-form-item label="乐队代码">
          <el-input v-model="bandInfo.BandCode"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('bandInfo')"
            >确认修改</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { addLikedBand, updateBand } from "@/api/request";

export default {
  name: "BandDialog",
  props: {
    dialogEditVisible: {
      type: Object,
      default() {
        return {};
      },
    },
    bandInfo: {
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
          if (this.bandInfo.BandID) {
            // 更新乐队信息
            updateBand(this.bandInfo.BandID, this.bandInfo)
              .then(() => {
                this.$message({ message: "更新成功", type: "success" });
                this.$emit("updateBand", this.bandInfo);
                this.childClose();
              })
              .catch((err) => {
                this.$message.error("更新失败!");
              });
          } else {
            // 新增乐队
            addLikedBand(this.$store.state.fanId, this.bandInfo.BandID)
              .then(() => {
                this.$message({ message: "新增成功", type: "success" });
                this.$emit("updateBand", this.bandInfo);
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