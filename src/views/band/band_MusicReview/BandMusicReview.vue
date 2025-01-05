<template>
  <div class="music-review">
    <div class="container_wrap">
      <div class="batchOption">
        <el-button icon="el-icon-refresh" type="warning" @click="refresh($event)"
          >刷新乐评表</el-button
        >
      </div>

      <el-table :data="tableData" border class="">
        <el-table-column prop="ReviewID" label="乐评ID" width="150">
        </el-table-column>
        <el-table-column prop="AlbumID" label="专辑ID" width="150">
        </el-table-column>
        <el-table-column prop="FanID" label="粉丝ID" width="150">
        </el-table-column>
        <el-table-column prop="Comment" label="评论" width="200">
        </el-table-column>
        <el-table-column prop="Rating" label="评分" width="150">
        </el-table-column>
        <el-table-column prop="ReviewDate" label="评论日期" width="150">
        </el-table-column>
        <el-table-column prop="ReviewCode" label="乐评代码" width="150">
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination">
      <Pagination
        :pageCount="pagiDataAll"
        @cpnPageJumpTo="currentChange"
      ></Pagination>
    </div>
  </div>
</template>

<script>
import { getBandAlbumReviews } from "@/api/request";
import Pagination from "@/components/pagination";

export default {
  name: "MusicReview",
  components: {
    Pagination,
  },
  created() {
    // 获取乐队乐评信息
    this.getMusicReviews();
  },
  data() {
    return {
      tableData: [],
      pagiDataAll: 0,
    };
  },
  methods: {
    // 获取乐队乐评信息
    getMusicReviews() {
      const bandId = this.$store.state.bandId;
      getBandAlbumReviews(bandId).then((res) => {
        this.tableData = res.data;
        this.pagiDataAll = Math.ceil(res.data.length / 10); // 假设每页显示10条数据
      });
    },
    // 分页跳转
    currentChange(item) {
      this.getMusicReviews(item - 1);
    },
    // 刷新乐评表
    refresh(event) {
      this.lostBlur(event);
      this.getMusicReviews();
    },
    // 失焦处理
    lostBlur(event) {
      let target = event.target;
      if (target.nodeName == "SPAN") {
        target = event.target.parentNode;
      }
      target.blur();
    },
  },
};
</script>

<style lang="scss" scoped>
.batchOption {
  margin-bottom: 5px;
  .el-button {
    font-size: 10px;
    padding: 5px;
  }
}
.pagination {
  text-align: center;
  margin-top: 15px;
}
</style>