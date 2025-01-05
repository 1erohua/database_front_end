<template>
  <div class="fan-likes">
    <div class="container_wrap">
      <div class="batchOption">
        <el-button icon="el-icon-refresh" type="warning" @click="refresh($event)"
          >刷新列表</el-button
        >
      </div>

      <!-- 未关注的乐队 -->
      <el-table :data="unfollowedBands" border class="table">
        <el-table-column prop="BandName" label="乐队名称" width="150">
        </el-table-column>
        <el-table-column prop="FormationDate" label="成立日期" width="150">
        </el-table-column>
        <el-table-column prop="BandDescription" label="乐队描述" width="200">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-plus"
              @click="followBand(scope.row.BandID)"
              >关注</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 未关注的专辑 -->
      <el-table :data="unfollowedAlbums" border class="table">
        <el-table-column prop="AlbumName" label="专辑名称" width="150">
        </el-table-column>
        <el-table-column prop="ReleaseDate" label="发行日期" width="150">
        </el-table-column>
        <el-table-column prop="AlbumDescription" label="专辑描述" width="200">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-plus"
              @click="followAlbum(scope.row.AlbumID)"
              >关注</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 未关注的歌曲 -->
      <el-table :data="unfollowedSongs" border class="table">
        <el-table-column prop="SongName" label="歌曲名称" width="150">
        </el-table-column>
        <el-table-column prop="Lyricist" label="作词人" width="150">
        </el-table-column>
        <el-table-column prop="Composer" label="作曲人" width="150">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-plus"
              @click="followSong(scope.row.SongID)"
              >关注</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 未参加的演唱会 -->
      <el-table :data="unattendedConcerts" border class="table">
        <el-table-column prop="ConcertName" label="演唱会名称" width="150">
        </el-table-column>
        <el-table-column prop="ConcertDate" label="演唱会日期" width="150">
        </el-table-column>
        <el-table-column prop="Location" label="地点" width="150">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-plus"
              @click="attendConcert(scope.row.ConcertID)"
              >参加</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {
  getUnfollowedBands,
  getUnfollowedAlbums,
  getUnfollowedSongs,
  getUnattendedConcerts,
  addLikedBand,
  addLikedAlbum,
  addLikedSong,
  addAttendedConcert,
} from "@/api/request";

export default {
  name: "FanHeLikes",
  data() {
    return {
      unfollowedBands: [],
      unfollowedAlbums: [],
      unfollowedSongs: [],
      unattendedConcerts: [],
    };
  },
  computed: {
    fanId() {
      return this.$store.state.fanId;
    },
  },
  created() {
    this.getUnfollowedData();
  },
  methods: {
    // 获取所有未关注的数据
    getUnfollowedData() {
      getUnfollowedBands(this.fanId).then((res) => {
        this.unfollowedBands = res.data;
      });
      getUnfollowedAlbums(this.fanId).then((res) => {
        this.unfollowedAlbums = res.data;
      });
      getUnfollowedSongs(this.fanId).then((res) => {
        this.unfollowedSongs = res.data;
      });
      getUnattendedConcerts(this.fanId).then((res) => {
        this.unattendedConcerts = res.data;
      });
    },
    // 刷新列表
    refresh(event) {
      this.lostBlur(event);
      this.getUnfollowedData();
    },
    // 关注乐队
    followBand(bandId) {
      addLikedBand(this.fanId, bandId).then(() => {
        this.$message({ type: "success", message: "关注成功!" });
        this.getUnfollowedData();
      });
    },
    // 关注专辑
    followAlbum(albumId) {
      addLikedAlbum(this.fanId, albumId).then(() => {
        this.$message({ type: "success", message: "关注成功!" });
        this.getUnfollowedData();
      });
    },
    // 关注歌曲
    followSong(songId) {
      addLikedSong(this.fanId, songId).then(() => {
        this.$message({ type: "success", message: "关注成功!" });
        this.getUnfollowedData();
      });
    },
    // 参加演唱会
    attendConcert(concertId) {
      addAttendedConcert(this.fanId, concertId).then(() => {
        this.$message({ type: "success", message: "参加成功!" });
        this.getUnfollowedData();
      });
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
.fan-likes {
  .batchOption {
    margin-bottom: 5px;
    .el-button {
      font-size: 10px;
      padding: 5px;
    }
  }
  .table {
    margin-bottom: 20px;
  }
}
</style>