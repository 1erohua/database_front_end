<template>
  <div>
    <!-- 修改弹窗 -->
    <el-dialog
      :visible.sync="dialogEditVisible.value"
      @close="childClose"
      width="30%"
    >
      <el-form :model="memberInfo" ref="memberInfo" label-width="100px">
        <el-form-item label="成员名称">
          <el-input v-model="memberInfo.Name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="memberInfo.Gender" placeholder="请选择性别">
            <el-option label="男" value="Male"></el-option>
            <el-option label="女" value="Female"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model.number="memberInfo.Age"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-input v-model="memberInfo.Role"></el-input>
        </el-form-item>
        <el-form-item label="加入日期">
          <el-date-picker
            v-model="memberInfo.JoinDate"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="离开日期">
          <el-date-picker
            v-model="memberInfo.LeaveDate"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="成员代码">
          <el-input v-model="memberInfo.MemberCode"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('memberInfo')"
            >确认修改</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { updateBandMember, addBandMember } from "@/api/request";

export default {
  name: "MemberDialog",
  props: {
    dialogEditVisible: {
      type: Object,
      default() {
        return {};
      },
    },
    memberInfo: {
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
          if (this.memberInfo.MemberID) {
            // 更新乐队成员信息
            updateBandMember(this.$store.state.bandId, this.memberInfo.MemberID, this.memberInfo)
              .then(() => {
                this.$message({ message: "更新成功", type: "success" });
                this.$emit("updateMember", this.memberInfo);
                this.childClose();
              })
              .catch((err) => {
                this.$message.error("更新失败!");
              });
          } else {
            // 新增乐队成员
            addBandMember(this.$store.state.bandId, this.memberInfo)
              .then(() => {
                this.$message({ message: "新增成功", type: "success" });
                this.$emit("updateMember", this.memberInfo);
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