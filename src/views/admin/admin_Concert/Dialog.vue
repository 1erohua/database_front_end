<template>
  <div>
    <!-- 修改弹窗 -->
    <el-dialog
      :visible.sync="dialogEditVisible.value"
      @close="childClose"
      width="30%"
    >
      <el-form :model="concertInfo" ref="concertInfo" label-width="100px">
        <el-form-item label="演唱会名称">
          <el-input v-model="concertInfo.ConcertName"></el-input>
        </el-form-item>
        <el-form-item label="演唱会日期">
          <el-date-picker
            v-model="concertInfo.ConcertDate"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="地点">
          <el-input v-model="concertInfo.Location"></el-input>
        </el-form-item>
        <el-form-item label="乐队ID">
          <el-input v-model.number="concertInfo.BandID"></el-input>
        </el-form-item>
        <el-form-item label="演唱会代码">
          <el-input v-model="concertInfo.ConcertCode"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('concertInfo')"
            >确认修改</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { updateConcert, addConcert } from "@/api/request";

export default {
  name: "ConcertDialog",
  props: {
    dialogEditVisible: {
      type: Object,
      default() {
        return {};
      },
    },
    concertInfo: {
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
          if (this.concertInfo.ConcertID) {
            // 更新演唱会信息
            updateConcert(this.concertInfo.ConcertID, this.concertInfo)
              .then(() => {
                this.$message({ message: "更新成功", type: "success" });
                this.$emit("updateConcert", this.concertInfo);
                this.childClose();
              })
              .catch((err) => {
                this.$message.error("更新失败!");
              });
          } else {
            // 新增演唱会
            addConcert(this.concertInfo)
              .then(() => {
                this.$message({ message: "新增成功", type: "success" });
                this.$emit("updateConcert", this.concertInfo);
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