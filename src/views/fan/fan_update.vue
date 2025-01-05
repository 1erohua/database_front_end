<template>
  <div class="fan-update">
    <div class="container_wrap">
      <el-form :model="fanInfo" ref="fanInfo" label-width="100px">
        <el-form-item label="乐迷ID">
          <el-input v-model="fanInfo.FanID" disabled></el-input>
        </el-form-item>
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
        <el-form-item label="教育背景">
          <el-input v-model="fanInfo.Education"></el-input>
        </el-form-item>
        <el-form-item label="乐迷代码">
          <el-input v-model="fanInfo.FanCode"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('fanInfo')">提交修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getFanInfo, updateFanInfo } from "@/api/request";

export default {
  name: "FanUpdate",
  data() {
    return {
      fanInfo: {
        FanID: "",
        Name: "",
        Gender: "",
        Age: null,
        Occupation: "",
        Education: "",
        FanCode: "",
      },
    };
  },
  created() {
    // 获取乐迷信息
    this.getFanInfo();
  },
  methods: {
    // 获取乐迷信息
    getFanInfo() {
      const fanId = this.$store.state.fanId;
      getFanInfo(fanId).then((res) => {
        this.fanInfo = res.data;
      });
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateFanInfo(this.fanInfo.FanID, this.fanInfo)
            .then(() => {
              this.$message({ message: "更新成功", type: "success" });
            })
            .catch((err) => {
              this.$message.error("更新失败!");
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
.fan-update {
  .container_wrap {
    padding: 20px;
  }
  .el-form-item {
    margin-bottom: 20px;
  }
}
</style>