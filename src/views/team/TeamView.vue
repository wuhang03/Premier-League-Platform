<!-- 搜索界面 -->
<template>
  <div class="team">
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
          width="100"
          header-align="center"
        ></el-table-column>
        <el-table-column
          prop="logo"
          label="球队"
          width="200"
          header-align="center"
        >
          <template slot-scope="scope">
            <div class="team-row">
              <img class="image" :src="scope.row.logo" />
              <p>{{ scope.row.team }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="played"
          label="场次"
          width="100"
          header-align="center"
        ></el-table-column>
        <el-table-column
          prop="win"
          label="赢"
          width="100"
          header-align="center"
        ></el-table-column>
        <el-table-column
          prop="draw"
          label="平"
          width="100"
          header-align="center"
        ></el-table-column>
        <el-table-column
          prop="lose"
          label="输"
          width="100"
          header-align="center"
        ></el-table-column>
        <el-table-column
          prop="for"
          label="进球"
          width="100"
          header-align="center"
        ></el-table-column>
        <el-table-column
          prop="against"
          label="失球"
          width="100"
          header-align="center"
        ></el-table-column>
        <el-table-column
          prop="goalsDiff"
          label="净胜球"
          width="100"
          header-align="center"
        ></el-table-column>
        <el-table-column
          prop="points"
          label="积分"
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
    loading: true;
  },
  mounted: async function () {
    const axios = require("axios");
    let that = this;
    const options = {
      method: "GET",
      url: "https://api-football-beta.p.rapidapi.com/standings",
      params: {
        season: "2023",
        league: "39",
      },
      headers: {
        "X-RapidAPI-Key": "630fcae455msh4e70829c2d25e94p105a05jsn55eca3b18e02",
        "X-RapidAPI-Host": "api-football-beta.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      let length = response.data.response[0].league.standings[0].length;
      const array = response.data.response[0].league.standings[0];
      for (let i = 0; i < length; i++) {
        that.tableData.push({
          rank: array[i].rank,
          logo: array[i].team.logo,
          team: array[i].team.name,
          played: array[i].all.played,
          win: array[i].all.win,
          draw: array[i].all.draw,
          lose: array[i].all.lose,
          points: array[i].points,
          for: array[i].all.goals.for,
          against: array[i].all.goals.against,
          goalsDiff: array[i].goalsDiff,
        });
      }
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style lang="less" scoped>
.team-row {
  display: flex;
  align-items: center;
}

.image {
  width: 30px;
  height: auto;
  margin-right: 10px;
}
</style>
