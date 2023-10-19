<!-- 搜索界面 -->
<template>
  <div class="player">
    <!-- 公共导航栏 -->
    <Header></Header>

    <div class="table">
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
        height="500"
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ background: 'skyblue', color: 'white' }"
      >
        <el-table-column
          prop="rank"
          label="排名"
          width="50"
          header-align="center"
        ></el-table-column>
        <el-table-column label="球员" width="200" header-align="center">
          <template slot-scope="scope">
            <div class="player-row">
              <img
                class="avatar"
                :src="scope.row.avatar"
                width="50"
                height="auto"
              />
              <p>{{ scope.row.name }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="球队" width="200" header-align="center">
          <template slot-scope="scope">
            <div class="team-row">
              <img
                class="logo"
                :src="scope.row.logo"
                width="50"
                height="auto"
              />
              <p>{{ scope.row.team }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="nation"
          label="国籍"
          width="100"
          header-align="center"
        ></el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
          width="100"
          header-align="center"
        ></el-table-column>
        <el-table-column
          prop="height"
          label="身高"
          width="100"
          header-align="center"
        ></el-table-column>
        <el-table-column
          prop="weight"
          label="体重"
          width="100"
          header-align="center"
        ></el-table-column>
        <el-table-column
          prop="goals"
          label="进球数"
          width="100"
          header-align="center"
        ></el-table-column>
        <el-table-column
          prop="assists"
          label="助攻数"
          width="100"
          header-align="center"
        ></el-table-column>
        <el-table-column
          prop="games"
          label="出场数"
          width="100"
          header-align="center"
        ></el-table-column>
      </el-table>
    </div>
    <!-- 公共底部 -->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      tableData: [],
    };
  },
  mounted: async function () {
    const axios = require("axios");
    let that = this;
    const options = {
      method: "GET",
      url: "https://api-football-beta.p.rapidapi.com/players/topscorers",
      params: {
        season: "2023",
        league: "39",
      },
      headers: {
        "X-RapidAPI-Key": "",
        "X-RapidAPI-Host": "api-football-beta.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      const array = response.data.response;
      console.log(array);
      let length = array.length;
      for (let i = 0; i < length; i++) {
        that.tableData.push({
          rank: i + 1,
          avatar: array[i].player.photo,
          name: array[i].player.name,
          logo: array[i].statistics[0].team.logo,
          team: array[i].statistics[0].team.name,
          nation: array[i].player.nationality,
          age: array[i].player.age,
          height: array[i].player.height,
          weight: array[i].player.weight,
          goals: array[i].statistics[0].goals.total,
          assists:array[i].statistics[0].goals.assists === null? 0: array[i].statistics[0].goals.assists,
          games: array[i].statistics[0].games.appearences,
        });
      }
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style lang="less" scoped>
.player-row {
  display: flex;
  align-items: center;
}
.team-row {
  display: flex;
  align-items: center;
}
.avatar {
  width: 50px;
  height: auto;
  margin-right: 10px;
}
.logo {
  width: 40px;
  height: auto;
  margin-right: 10px;
}
</style>
