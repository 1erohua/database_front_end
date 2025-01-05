<template>
  <div class="fan-likes-song">
    <div class="container_wrap">
      <div class="batchOption">
        <el-button v-if="false" icon="el-icon-plus" type="success" @click="newAdd($event)"
          >新增喜欢的歌曲</el-button
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
          >刷新喜欢的歌曲表</el-button
        >
      </div>

      <el-table
        :data="tableData"
        border
        class=""
        @selection-change="handleCurrentChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column v-if="false" prop="SongID" label="歌曲ID" width="150">
        </el-table-column>
        <el-table-column prop="SongName" label="歌曲名称" width="150">
        </el-table-column>
        <el-table-column prop="Lyricist" label="作词人" width="150">
        </el-table-column>
        <el-table-column prop="Composer" label="作曲人" width="150">
        </el-table-column>
        <el-table-column prop="AlbumID" label="专辑ID" width="150">
        </el-table-column>
        <el-table-column prop="SongCode" label="歌曲代码" width="150">
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
      :songInfo="songInfo"
      @updateSong="updateSong"
    ></Dialog>
  </div>
</template>

<script>
import { getFanLikedSongs, addLikedSong, deleteLikedSong, updateLikedSong } from "@/api/request";
import Pagination from "@/components/pagination";
import Dialog from "./Dialog.vue";

export default {
  name: "FanLikesSong",
  components: {
    Pagination,
    Dialog,
  },
  created() {
    // 获取所有喜欢的歌曲信息
    this.getLikedSongs();
  },
  data() {
    return {
      tableData: [],
      pagiDataAll: 0,
      dialogEditVisible: { value: false },
      songInfo: {},
      selectedData: [],
      fanId: this.$store.state.fanId,
    };
  },
  methods: {
    // 获取喜欢的歌曲信息
    getLikedSongs() {
      getFanLikedSongs(this.fanId).then((res) => {
        this.tableData = res.data;
        this.pagiDataAll = Math.ceil(res.data.length / 10); // 假设每页显示10条数据
      });
    },
    // 分页跳转
    currentChange(item) {
      this.getLikedSongs(item - 1);
    },
    // 修改喜欢的歌曲信息
    handleEdit(index, row) {
      this.songInfo = row;
      this.dialogEditVisible.value = true;
    },
    // 删除喜欢的歌曲信息
    handleDelete(index, row) {
      this.$confirm("确认删除？")
        .then(() => {
          deleteLikedSong(this.fanId, row.SongID)
            .then(() => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getLikedSongs();
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
            await deleteLikedSong(this.fanId, item.SongID);
            this.$message({
              type: "info",
              message: "第" + (index + 1) + "条记录，删除成功!",
            });
          });
          this.$message({
            type: "success",
            message: "全部删除成功!",
          });
          this.getLikedSongs();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除选中",
          });
        });
    },
    // 新增喜欢的歌曲
    newAdd(event) {
      this.lostBlur(event);
      this.songInfo = {}; // 清空表单
      this.dialogEditVisible.value = true;
    },
    // 刷新喜欢的歌曲表
    refresh(event) {
      this.lostBlur(event);
      this.getLikedSongs();
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
    // 更新喜欢的歌曲信息
    updateSong(data) {
      this.getLikedSongs();
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