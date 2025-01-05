<template>
  <!-- 定义一个容器来放置 ECharts 图表 -->
  <div class="echarts">
    <!-- 
      :class 动态绑定 class，根据传入的 className 设置样式类
      :id 动态绑定 id，根据传入的 idName 设置唯一标识
      :style 动态绑定样式，根据传入的 width 和 height 设置图表的宽度和高度
    -->
    <div
      :class="className"
      :id="idName"
      :style="{ width: width + 'px', height: height + 'px' }"
    ></div>
  </div>
</template>

<script>
// 引入 ECharts 库
import echarts from "echarts";

export default {
  // 组件名称
  name: "echarts",
  
  // 定义组件的 props，用于接收父组件传递的数据
  props: {
    // className 是一个字符串类型的 prop，用于设置图表的样式类
    className: {
      type: String,
    },
    // idName 是一个字符串类型的 prop，用于设置图表的唯一标识
    idName: {
      type: String,
    },
    // width 是一个数字类型的 prop，用于设置图表的宽度
    width: {
      type: Number,
    },
    // height 是一个数字类型的 prop，用于设置图表的高度
    height: {
      type: Number,
    },
  },
  
  // data 函数返回组件的初始数据
  data() {
    return {};
  },

  // mounted 是 Vue 的生命周期钩子函数，在组件挂载到 DOM 后执行
  mounted() {
    // 在这里可以调用初始化图表的方法
    this.initChart();
  },

  // methods 对象包含组件的方法
  methods: {
    // initChart 方法用于初始化 ECharts 图表
    initChart() {
      // 使用 echarts.init 方法初始化图表实例
      // document.getElementById(this.idName) 获取 DOM 元素
      let myChart = echarts.init(document.getElementById(this.idName));
      
      // 在这里可以设置图表的配置项和数据
      // 例如：myChart.setOption({...});
    },
  },
};
</script>

<style lang='scss' scoped>
/* 这里可以编写组件的样式 */
</style>