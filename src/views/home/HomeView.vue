<!-- 搜索界面 -->
<template>
  <div class="home">
    <!-- 公共导航栏 -->
    <Header></Header>

    <div class="banner">
      <!-- 轮播图 -->
      <Banner></Banner>

      <!-- 搜索框 -->
      <div class="search">
        <!-- <div class="title">欢迎来到英超</div> -->
        <div class="input">
          <el-input
            placeholder="请输入球队名称"
            v-model="input"
            @focus="getInput"
            @blur="leaveInput"
            clearable
          ></el-input>
          <el-button type="primary" @click="search">搜索</el-button>
        </div>
        <div class="list" v-show="isShow" @click="getInput">
          <ul class="hot-teams">
            <li
              v-for="item in filteredData"
              :key="item"
              @click="handleClick(item)"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 公共底部 -->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Banner from "./banner/Banner.vue";

export default {
  components: {
    Header,
    Footer,
    Banner,
  },
  data() {
    return {
      input: "",
      isShow: "",
      teamData: [],
      maxTeams: 5,
      clickedItem: "",
    };
  },
  methods: {
    search() {
      this.$router.push({ path: "/result", query: { searchTerm: this.input } });
      console.log(this.input);
    },
    getInput() {
      this.isShow = true;
    },
    leaveInput() {
      this.isShow = false;
      console.log("blur");
    },
    handleClick(item) {
      this.clickedItem = item;
      this.input = item;
      console.log(this.input);
      this.search();
    },
    onInfoBoxClick(event) {
    }
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
        "X-RapidAPI-Key": "",
        "X-RapidAPI-Host": "api-football-beta.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      let length = response.data.response[0].league.standings[0].length;
      const array = response.data.response[0].league.standings[0];
      // console.log(array);
      for (let i = 0; i < length; i++) {
        this.teamData.push(array[i].team.name);
      }
    } catch (error) {
      console.error(error);
    }
  },
  computed: {
    filteredData() {
      console.log(this.input);
      return this.teamData
        .filter((item) => item.includes(this.input))
        .slice(0, this.maxTeams);
    },
  },
};
</script>

<style lang="less" scoped>
.banner {
  position: relative;
  .search {
    position: absolute;
    width: 100%;
    top: 50%;
    z-index: 99;

    .title {
      margin: 200 auto;
      font-size: 40px;
      color: white;
      font-weight: 700;
      text-shadow: 0 5px 5px rgb(0 0 0 / 10%);
      text-align: center;
    }
    .input {
      display: flex;
      width: 500px;
      margin: 0 auto;
      left: 300px;
    }
  }
}
.list {
  background-color: white;
  width: 430px;
  height: 100px;
  position: absolute;
  left: 310px;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 20px;
  .hot-teams {
    font-size: 14px;
    color: #999;
    position: absolute;
    top: 0;
    margin-top: 10px;
    padding-left: 0;
    list-style: none;
  }
}
</style>
