<!-- <template>
  <div class="login">
    <h2>乐队与乐迷管理系统</h2>
    <el-form
      :model="loginForm"
      status-icon
      :rules="rules"
      ref="loginForm"
      label-width="100px"
      class="demo-loginForm login-form"
    >
      <el-form-item label="用户名" prop="code">
        <el-input
          type="text"
          autocomplete="off"
          v-model="loginForm.code"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item login-form-submit>
        <el-button
          class="login-submit"
          type="primary"
          @click="submitForm('loginForm')"
          >登录</el-button
        >
      </el-form-item>
      <p>登录账号admin 密码123456</p>
    </el-form>
  </div>
</template> -->

<template>
  <div class="login">
    <h2>乐队与乐迷管理系统</h2>
    <el-form
      :model="loginForm"
      status-icon
      :rules="rules"
      ref="loginForm"
      label-width="100px"
      class="demo-loginForm login-form"
    >
      <el-form-item label="用户名" prop="code">
        <el-input
          type="text"
          autocomplete="off"
          v-model="loginForm.code"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-select v-model="loginForm.role" placeholder="请选择角色">
          <el-option label="Manager" value="Manager"></el-option>
          <el-option label="BandMember" value="BandMember"></el-option>
          <el-option label="Fan" value="Fan"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item login-form-submit>
        <el-button
          class="login-submit"
          type="primary"
          @click="submitForm('loginForm')"
          >登录</el-button
        >
      </el-form-item>
      <p>登录账号admin 密码123456</p>
    </el-form>
  </div>
</template>






<!-- 
<script>
export default {
  name: "Login",  // 组件名称

  // 数据定义部分
  data() {
    // 校验用户名输入
    const validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));  // 如果用户名为空，返回错误信息
      } else {
        callback();  // 否则通过校验
      }
    };

    // 校验密码输入
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));  // 如果密码为空，返回错误信息
      } else {
        if (value.length < 6) {
          callback(new Error("密码不能少于6位"));  // 如果密码长度小于6位，返回错误信息
        }
        callback();  // 否则通过校验
      }
    };

    return {
      // 表单数据对象
      loginForm: {
        code: "",  // 用户名
        password: "",  // 密码
      },
      // 表单校验规则
      rules: {
        code: [
          { required: true, trigger: "blur", validator: validateUsername },  // 用户名必填，失去焦点时触发校验
        ],
        password: [{ validator: validatePass, trigger: "blur" }],  // 密码校验，失去焦点时触发校验
      },
    };
  },
  methods: {
    // 提交登录表单
    submitForm(loginForm) {
      this.$refs[loginForm].validate((valid) => {  // 校验表单
        if (valid) {
          // 如果校验通过，调用登录接口
          this.$store.dispatch("login", this.loginForm).then((res) => {
            let {data} = res  // 解构返回的数据
            console.log(data);
            if(data.code == 1000){  // 如果返回码为1000，表示登录成功
              this.$message({ message:data.message, type: "success" });  // 显示成功消息
              // 获取登录用户信息
              // this.$store.dispatch("getInfo",data)

              this.$router.push({ path: this.redirect || '/' })  // 跳转到首页或指定页面
            }else {
              this.$message({ message:data.message, type: "warning" });  // 显示警告消息
            }
          }).catch((error)=> {
            // 登录失败时显示错误信息
            this.$message({ message: error.message, type: "error" });
          });
        } else {
          console.log("error submit!!");  // 校验失败，打印错误信息
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();  // 调用Element UI的resetFields方法重置表单
    },
  },
};
</script>
 -->

<script>
export default {
  name: "Login",  // 组件名称

  // 数据定义部分
  data() {
    // 校验用户名输入
    const validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));  // 如果用户名为空，返回错误信息
      } else {
        callback();  // 否则通过校验
      }
    };

    // 校验密码输入
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));  // 如果密码为空，返回错误信息
      } else {
        if (value.length < 1) {
          callback(new Error("密码不能少于1位"));  // 如果密码长度小于6位，返回错误信息
        }
        callback();  // 否则通过校验
      }
    };

    // 校验角色选择
    const validateRole = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择角色"));  // 如果角色为空，返回错误信息
      } else {
        callback();  // 否则通过校验
      }
    };

    return {
      // 表单数据对象
      loginForm: {
        code: "",  // 用户名
        password: "",  // 密码
        role: "",  // 角色
      },
      // 表单校验规则
      rules: {
        code: [
          { required: true, trigger: "blur", validator: validateUsername },  // 用户名必填，失去焦点时触发校验
        ],
        password: [{ validator: validatePass, trigger: "blur" }],  // 密码校验，失去焦点时触发校验
        role: [{ required: true, trigger: "change", validator: validateRole }],  // 角色校验，选择时触发校验
      },
    };
  },
  methods: {
    // 提交登录表单
    submitForm(loginForm) {
      this.$refs[loginForm].validate((valid) => {  // 校验表单
        if (valid) {
          // 如果校验通过，调用登录接口
          console.log("这是第一步")
          this.$store.dispatch("login", this.loginForm).then((res) => {

          console.log("这是第二步")
          let {data} = res  // 解构返回的数据

          console.log(data);

          this.$message({ message:data.message, type: "success" });  // 显示成功消息

          // 获取登录用户信息
          // this.$store.dispatch("getInfo",data)
          this.$router.push({ path: this.redirect || '/' })  // 跳转到首页或指定页面
          }).catch((error)=> {
            // 登录失败时显示错误信息
            this.$message({ message: error.message, type: "error" });
          });
        } else {
          console.log("error submit!!");  // 校验失败，打印错误信息
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();  // 调用Element UI的resetFields方法重置表单
    },
  },
};
</script>




<style lang="scss" scoped>
.login {
  padding-top: 100px;  // 登录容器上边距
  text-align: center;  // 内容居中
}
h2 {
  color: #500877;  // 标题颜色
  padding: 20px;  // 标题内边距
}
.login-form {
  margin: auto;  // 表单居中
  max-width: 500px;  // 表单最大宽度
  .el-form-item__label {
    color: #000000;  // 表单标签颜色
  }
  
}
.login-form-submit {
  text-align: center;  // 提交按钮居中
}
.login-submit {
  display: block;  // 按钮块级显示
  margin: 0 auto;  // 按钮居中
  text-align: center;  // 按钮文本居中
  width: 200px;  // 按钮宽度
}
</style>