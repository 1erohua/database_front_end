<template>
  <div class="pagination" v-if="pageCount > 0">
    <ul class="epages">
      <li class="page-item" v-if="curPage > 1">
        <button @click="JumpTo(curPage - 1)">&laquo;</button>
      </li>
      <li
        class="page-item"
        :class="{ active: curPage == 1 }"
        @click="JumpTo(1)"
      >
        <button>1</button>
      </li>
      <li class="page-item" v-show="curPage > 5 && pageCount > 10">
        <strong>...</strong>
      </li>
      <li
        class="page-item"
        :class="{ active: curPage == index + offset }"
        v-for="(item, index) in middlePages"
        :key="index"
        @click="JumpTo(index + offset)"
      >
        <button>{{ index + offset }}</button>
      </li>
      <li class="page-item" v-show="curPage < bigLimit && pageCount > 10">
        <strong>...</strong>
      </li>
      <li
        class="page-item"
        :class="{ active: curPage == pageCount }"
        @click="JumpTo(pageCount)"
        v-if="pageCount > 1"
      >
        <button>哗哗哗{{ pageCount }}</button>
      </li>
      <li
        class="page-item"
        :class="{ disabled: curPage == pageCount }"
        v-if="pageCount > 1 && curPage < pageCount - 1"
      >
        <button @click="JumpTo(curPage + 1)">&raquo;</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Pagination", // 组件名称
  data() {
    return {
      curPage: 1, // 当前页码，默认为1
    };
  },
  props: {
    pageCount: {
      type: Number, // 总页数，由父组件传入
    },
  },
  mounted() {}, // 生命周期钩子，组件挂载后执行

  computed: {
    // 计算中间页码的数量
    middlePages() {
      if (this.pageCount <= 2) {
        return 0; // 如果总页数小于等于2，不显示中间页码
      } else if (this.pageCount > 2 && this.pageCount <= 10) {
        return this.pageCount - 2; // 如果总页数在3到10之间，显示所有中间页码
      } else {
        return this.curPage > 999 ? 5 : 8; // 如果当前页大于999，显示5个中间页码，否则显示8个
      }
    },
    // 计算中间页码的结束位置
    bigLimit() {
      return this.middlePages > 5 ? this.pageCount - 6 : this.pageCount - 3;
    },
    // 计算中间页码的起始位置
    offset() {
      if (this.curPage <= 5) {
        return 2; // 如果当前页小于等于5，中间页码从2开始
      } else if (this.curPage >= this.bigLimit) {
        return this.bigLimit - 2; // 如果当前页接近最后一页，中间页码从 bigLimit - 2 开始
      } else {
        return this.middlePages > 5 ? this.curPage - 3 : this.curPage - 2; // 否则，中间页码从 curPage - 3 或 curPage - 2 开始
      }
    },
  },
  methods: {
    // 跳转到指定页码
    JumpTo(index) {
      this.curPage = index; // 更新当前页码
      this.$emit("cpnPageJumpTo", index); // 触发事件，通知父组件页码变化
    },
  },
};
</script>

<style lang='scss' scoped>
.pagination ul {
  display: inline-block;
  width: 600px;
  font-size: 12px;
  li {
    display: inline-block;
    width: 30px;

    margin: 2px 5px;
    button {
      border: none;
      text-decoration: none;
      outline: none;
      width: 100%;
      height: 30px;
      background-color: #fff;
      line-height: 25px;
      border-radius: 4px;
      border: 1px solid #ddd;

      &:hover {
        background: #00a1d6;
        color: #fff;
      }
    }
  }
  .active {
    button {
      border: none;
      text-decoration: none;
      background: #00a1d6;
      color: #fff;
      border: 1px solid #00a1d6;
    }
  }
}
</style>