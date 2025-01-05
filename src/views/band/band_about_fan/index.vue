<template>
  <div class="fans-detail">
    <div class="container_wrap">
      <div class="batchOption">
        <el-button icon="el-icon-refresh" type="warning" @click="refresh">刷新歌迷表</el-button>
      </div>

      <el-tabs v-model="activeTab" @tab-click="handleTabClick">
        <el-tab-pane label="喜欢本乐队的歌迷" name="bandFans">
          <el-table :data="bandFans" border>
            <el-table-column prop="FanID" label="歌迷ID" width="150"></el-table-column>
            <el-table-column prop="Name" label="姓名" width="150"></el-table-column>
            <el-table-column prop="Gender" label="性别" width="100"></el-table-column>
            <el-table-column prop="Age" label="年龄" width="100"></el-table-column>
            <el-table-column prop="Occupation" label="职业" width="150"></el-table-column>
            <el-table-column prop="Education" label="教育" width="150"></el-table-column>
            <el-table-column prop="FanCode" label="歌迷代码" width="150"></el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="喜欢本乐队专辑的歌迷" name="albumFans">
          <el-table :data="albumFans" border>
            <el-table-column prop="FanID" label="歌迷ID" width="150"></el-table-column>
            <el-table-column prop="Name" label="姓名" width="150"></el-table-column>
            <el-table-column prop="Gender" label="性别" width="100"></el-table-column>
            <el-table-column prop="Age" label="年龄" width="100"></el-table-column>
            <el-table-column prop="Occupation" label="职业" width="150"></el-table-column>
            <el-table-column prop="Education" label="教育" width="150"></el-table-column>
            <el-table-column prop="FanCode" label="歌迷代码" width="150"></el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="喜欢本乐队歌曲的歌迷" name="songFans">
          <el-table :data="songFans" border>
            <el-table-column prop="FanID" label="歌迷ID" width="150"></el-table-column>
            <el-table-column prop="Name" label="姓名" width="150"></el-table-column>
            <el-table-column prop="Gender" label="性别" width="100"></el-table-column>
            <el-table-column prop="Age" label="年龄" width="100"></el-table-column>
            <el-table-column prop="Occupation" label="职业" width="150"></el-table-column>
            <el-table-column prop="Education" label="教育" width="150"></el-table-column>
            <el-table-column prop="FanCode" label="歌迷代码" width="150"></el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="参加本乐队演唱会的歌迷" name="concertFans">
          <el-table :data="concertFans" border>
            <el-table-column prop="FanID" label="歌迷ID" width="150"></el-table-column>
            <el-table-column prop="Name" label="姓名" width="150"></el-table-column>
            <el-table-column prop="Gender" label="性别" width="100"></el-table-column>
            <el-table-column prop="Age" label="年龄" width="100"></el-table-column>
            <el-table-column prop="Occupation" label="职业" width="150"></el-table-column>
            <el-table-column prop="Education" label="教育" width="150"></el-table-column>
            <el-table-column prop="FanCode" label="歌迷代码" width="150"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getBandFans, getAlbumFans, getSongFans, getBandConcerts } from "@/api/request";

export default {
  name: "FansDetail",
  data() {
    return {
      activeTab: "bandFans",
      bandFans: [],
      albumFans: [],
      songFans: [],
      concertFans: [],
    };
  },
  created() {
    this.getFansData();
  },
  methods: {
    async getFansData() {
      const bandId = this.$store.state.bandId;
      this.bandFans = (await getBandFans(bandId)).data;
      this.albumFans = (await getAlbumFans(bandId)).data;
      this.songFans = (await getSongFans(bandId)).data;
      this.concertFans = (await getBandConcerts(bandId)).data;
    },
    refresh() {
      this.getFansData();
    },
    handleTabClick(tab) {
      this.activeTab = tab.name;
    },
  },
};
</script>

<style lang="scss" scoped>
.fans-detail {
  .batchOption {
    margin-bottom: 5px;
    .el-button {
      font-size: 10px;
      padding: 5px;
    }
  }
}
</style>