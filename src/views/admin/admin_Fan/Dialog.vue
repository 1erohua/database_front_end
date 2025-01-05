<template>
  <div>
    <!-- 修改弹窗 -->
    <el-dialog
      :visible.sync="dialogEditVisible.value"
      @close="childClose"
      width="30%"
    >
      <el-form :model="fanInfo" ref="fanInfo" label-width="100px">
        <el-form-item label="姓名">
          <el-input v-model="fanInfo.Name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="fanInfo.Gender" placeholder="请选择性别">
            <el-option label="男" value="Male"></el-option>
            <el-option label="女" value="Female"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model.number="fanInfo.Age"></el-input>
        </el-form-item>
        <el-form-item label="职业">
          <el-input v-model="fanInfo.Occupation"></el-input>
        </el-form-item>
        <el-form-item label="教育程度">
          <el-input v-model="fanInfo.Education"></el-input>
        </el-form-item>
        <el-form-item label="粉丝代码">
          <el-input v-model="fanInfo.FanCode"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('fanInfo')"
            >确认修改</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { updateFan, addFan } from "@/api/request";

export default {
  name: "FanDialog",
  props: {
    dialogEditVisible: {
      type: Object,
      default() {
        return {};
      },
    },
    fanInfo: {
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
          if (this.fanInfo.FanID) {
            // 更新粉丝信息
            updateFan(this.fanInfo.FanID, this.fanInfo)
              .then(() => {
                this.$message({ message: "更新成功", type: "success" });
                this.$emit("updateFan", this.fanInfo);
                this.childClose();
              })
              .catch((err) => {
                this.$message.error("更新失败!");
              });
          } else {
            // 新增粉丝
            addFan(this.fanInfo)
              .then(() => {
                this.$message({ message: "新增成功", type: "success" });
                this.$emit("updateFan", this.fanInfo);
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