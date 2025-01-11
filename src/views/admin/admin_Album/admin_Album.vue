<template>
  <div class="album-detail">
    <div class="container_wrap">
      <div class="batchOption">
        <el-button icon="el-icon-plus" type="success" @click="newAdd($event)"
          >新增专辑</el-button
        >
        <el-button
          icon="el-icon-delete"
          type="danger"
          @click="batchDelete($event)"
          >删除选中</el-button
        >
        <el-button
          icon="el-icon-refresh"
          type="warning"
          @click="refresh($event)"
          >刷新专辑表</el-button
        >
      </div>

      <el-table
        :data="tableData"
        border
        class=""
        @selection-change="handleCurrentChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column v-if="false" prop="AlbumID" label="专辑ID" width="150">
        </el-table-column>
        <el-table-column prop="AlbumName" label="专辑名称" width="150">
        </el-table-column>
        <el-table-column prop="ReleaseDate" label="发布日期" width="150">
          <template slot-scope="scope">
            {{ formatDate(scope.row.ReleaseDate) }}
          </template>
        </el-table-column>
        <el-table-column prop="AlbumDescription" label="专辑描述" width="200">
        </el-table-column>
        <el-table-column prop="BandID" label="乐队ID" width="150">
        </el-table-column>
        <el-table-column prop="AlbumCode" label="专辑代码" width="150">
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
              >修改</el-button
            >
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination">
      <Pagination
        :pageCount="pagiDataAll"
        @cpnPageJumpTo="currentChange"
      ></Pagination>
    </div>

    <!-- 弹窗 -->
    <Dialog
      :dialogEditVisible="dialogEditVisible"
      :albumInfo="albumInfo"
      @updateAlbum="updateAlbum"
    ></Dialog>
  </div>
</template>

<script>
import { getAllAlbums, deleteAlbum } from "@/api/request";
import Pagination from "@/components/pagination";
import Dialog from "./Dialog.vue";
import moment from "moment";

export default {
  name: "AlbumDetail",
  components: {
    Pagination,
    Dialog,
  },
  created() {
    // 获取所有专辑信息
    this.getAlbumMes();
  },
  data() {
    return {
      tableData: [],
      pagiDataAll: 0,
      dialogEditVisible: { value: false },
      albumInfo: {},
      selectedData: [],
    };
  },
  methods: {
    // 获取专辑信息
    getAlbumMes() {
      getAllAlbums().then((res) => {
        this.tableData = res.data;
        this.pagiDataAll = Math.ceil(res.data.length / 10); // 假设每页显示10条数据
      });
    },
    // 分页跳转
    currentChange(item) {
      this.getAlbumMes(item - 1);
    },
    // 修改专辑信息
    handleEdit(index, row) {
      this.albumInfo = { ...row, ReleaseDate: moment(row.ReleaseDate).format('YYYY-MM-DD HH:mm:ss') };
      this.dialogEditVisible.value = true;
    },
    // 删除专辑信息
    handleDelete(index, row) {
      this.$confirm("确认删除？")
        .then(() => {
          deleteAlbum(row.AlbumID)
            .then(() => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getAlbumMes();
            })
            .catch((err) => {
              this.$message.error("删除失败!");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 批量删除
    batchDelete(event) {
      this.lostBlur(event);
      this.$confirm("确认删除选中？")
        .then(() => {
          this.selectedData.forEach(async (item, index) => {
            await deleteAlbum(item.AlbumID);
            this.$message({
              type: "info",
              message: "第" + (index + 1) + "条记录，删除成功!",
            });
          });
          this.$message({
            type: "success",
            message: "全部删除成功!",
          });
          this.getAlbumMes();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除选中",
          });
        });
    },
    // 新增专辑
    newAdd(event) {
      this.lostBlur(event);
      this.albumInfo = { ReleaseDate: moment().format('YYYY-MM-DD HH:mm:ss') }; // 清空表单并设置默认日期
      this.dialogEditVisible.value = true;
    },
    // 刷新专辑表
    refresh(event) {
      this.lostBlur(event);
      this.getAlbumMes();
    },
    // 处理选中项
    handleCurrentChange(rows) {
      this.selectedData = rows;
    },
    // 失焦处理
    lostBlur(event) {
      let target = event.target;
      if (target.nodeName == "SPAN") {
        target = event.target.parentNode;
      }
      target.blur();
    },
    // 更新专辑信息
    updateAlbum(data) {
      this.getAlbumMes();
    },
    // 格式化日期
    formatDate(date) {
      return moment(date).format('YYYY-MM-DD HH:mm:ss');
    }
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