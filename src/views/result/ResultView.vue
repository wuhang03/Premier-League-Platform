<template>
  <div class="player">
    <!-- 公共导航栏 -->
    <Header></Header>

    <p>搜索词: {{ searchTerm }}</p>
    <div class="team-con">
      <div class="team-left">
        <div class="team-info">
          <img class="team-logo" :src="logo" alt="team" />
          <div class="info-con">
            <p class="team-name">
              {{ name }}
              <img src="@/assets/cont.png" alt="" />
            </p>
            <p>
              <span class="wid150">
                <b>成 立：</b>
                {{ founded }}
              </span>
              <span class="wid150">
                <b>国 家：</b>
                {{ country }}
              </span>
              <span class="wid150">
                <b>城 市：</b>
                {{ city }}
              </span>
            </p>
            <p>
              <span class="wid350">
                <b>主 场：</b>
                {{ venue }}
              </span>
              <span class="wid150">
                <b>容 纳：</b>
                {{ capacity }}
              </span>
            </p>
            <p>
              <span class="wid350">
                <b>地 址：</b>
                {{ address }}
              </span>
              <span class="wid150">
                <b>全欧排名：</b>
                {{ ranking }}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div class="team-right">
        <div class="info-left">
          <div class="name">{{ coach }}</div>
          <div class="detail-info">
            <ul>
              <li>
                <span>俱乐部：</span>
                {{ name }}
              </li>
              <li>
                <span>国家：</span>
                {{ nation }}
              </li>
              <li>
                <span>年龄：</span>
                {{ age }}
              </li>
            </ul>
          </div>
          <img :src="avatar" alt="" />
        </div>
      </div>
    </div>

    <div class="under">
      <el-card shadow="hover">
        <h1>城市</h1>
        <el-divider></el-divider>
        <div class="showBlock">
          <p class="address">{{ this.city }}</p>

          <div class="other">
            <p class="wind">
              <span>维度: {{ this.latitude }} </span>
            </p>
            <p class="humidity">
              经度: {{ this.longitude }}
            </p>
            <p id="reporttime">人口: {{ this.population }}</p>
          </div>
        </div>
      </el-card>
      <div class="venueimage">
        <img :src="venueimg" alt="" />
      </div>
      <el-card shadow="hover">
        <h1>天气</h1>
        <el-divider></el-divider>
        <div class="showBlock">
          <p class="address">{{ address }}</p>
          <p class="temperature">
            <span class="weather">
              {{ temp }} ℃
              <span><i class="mainWeather" :class="getIcon"></i></span>
            </span>
          </p>

          <div class="other">
            <p class="wind">
              <span>风速: {{ wind }} kph</span>
            </p>
            <p class="humidity">
              <i class="el-icon-odometer"></i> 湿度: {{ humidity }}
            </p>
            <p id="reporttime">消息发布时间: {{ localtime }}</p>
          </div>
        </div>
      </el-card>
    </div>
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
      rankingData: [],
      loading: false,
      searchTerm: "",
      name: "",
      logo: "",
      country: "",
      city: "",
      venue: "",
      capacity: "",
      address: "",
      id: "",

      coach: "",
      nation: "",
      age: "",
      avatar: "",

      venueimg: "",

      weathericon: "",
      temp: "",
      humidity: "",
      wind: "",
      localtime: "",

      population: "",
      latitude: "",
      longitude: "",

      ranking: "",
    };
  },
  created() {
    this.searchTerm = this.$route.query.searchTerm;
    this.fetchTeam();
    this.fetchRankings();
  },
  methods: {
    async fetchTeam() {
      const axios = require("axios");
      const getTeam = {
        method: "GET",
        url: "https://api-football-beta.p.rapidapi.com/teams",
        params: {
          season: "2023",
          league: "39",
          name: this.searchTerm,
        },
        headers: {
          "X-RapidAPI-Key":
            "878c7bcabemsh391866c4810b568p17944djsnf406f86467e1",
          "X-RapidAPI-Host": "api-football-beta.p.rapidapi.com",
        },
      };
      try {
        const response = await axios.request(getTeam);
        const info = response.data.response[0];
        this.id = info.team.id;
        this.name = info.team.name;
        this.logo = info.team.logo;
        this.founded = info.team.founded;
        this.country = info.team.country;
        this.city = info.venue.city;
        this.venue = info.venue.name;
        this.capacity = info.venue.capacity;
        this.address = info.venue.address;
        this.venueimg = info.venue.image;
        this.loading = true;
        this.fetchCoach();
        this.fetchWeather();
        this.fetchCity();
      } catch (error) {
        console.error(error);
      }
    },

    async fetchCity() {
      const axios = require("axios");

      const options = {
        method: "GET",
        url: "https://city-by-api-ninjas.p.rapidapi.com/v1/city",
        params: {
          name: this.city,
          limit: "1",
        },
        headers: {
          "X-RapidAPI-Key":
            "878c7bcabemsh391866c4810b568p17944djsnf406f86467e1",
          "X-RapidAPI-Host": "city-by-api-ninjas.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        this.population = response.data[0].population;
        this.latitude = response.data[0].latitude;
        this.longitude = response.data[0].longitude;
        console.log(this.population);
      } catch (error) {
        console.error(error);
      }
    },

    async fetchCoach() {
      const axios = require("axios");
      const getCoach = {
        method: "GET",
        url: "https://api-football-beta.p.rapidapi.com/coachs",
        params: { team: this.id },
        headers: {
          "X-RapidAPI-Key":
            "878c7bcabemsh391866c4810b568p17944djsnf406f86467e1",
          "X-RapidAPI-Host": "api-football-beta.p.rapidapi.com",
        },
      };
      try {
        const response = await axios.request(getCoach);
        const coach = response.data.response[0];
        this.coach = coach.name;
        this.age = coach.age;
        this.avatar = coach.photo;
        this.nation = coach.birth.country;
      } catch (error) {
        console.error(error);
      }
    },

    async fetchWeather() {
      const axios = require("axios");
      
      const options = {
        method: "GET",
        url: "https://weatherapi-com.p.rapidapi.com/current.json",
        params: { q: this.city },
        headers: {
          "X-RapidAPI-Key":
            "878c7bcabemsh391866c4810b568p17944djsnf406f86467e1",
          "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        const current = response.data.current;
        const location = response.data.location;
        this.temp = current.temp_c;
        this.humidity = current.humidity;
        this.wind = current.wind_kph;
        this.weathericon = current.condition.icon;
        this.localtime = location.localtime;
      } catch (error) {
        console.error(error);
      }
    },

    async fetchRankings() {
      const axios = require("axios");
      const options = {
        method: "GET",
        url: "https://footapi7.p.rapidapi.com/api/rankings/uefa/clubs",
        headers: {
          "X-RapidAPI-Key":
            "878c7bcabemsh391866c4810b568p17944djsnf406f86467e1",
          "X-RapidAPI-Host": "footapi7.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        const rankings = response.data.rankings;
        let length = 100;
        for (let i = 0; i < length; i++) {
          console.log(rankings[i].rowName);
          if(this.searchTerm.includes(rankings[i].rowName)){
            this.ranking = i+1;
            break;
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style>
b {
  color: darkgray;
}
.team-con {
  width: 1200px;
  overflow: hidden;
  margin: 0 auto;
  display: flex;
}
.team-con .team-left {
  width: 580px;
  float: left;
}
.team-con .team-left .team-info {
  width: 680px;
  height: 225px;
  background: #f7f7f7;
  margin-right: 20px;
  padding: 28px 5px 28px 28px;
  box-sizing: border-box;
  margin-bottom: 20px;
}
.team-con .team-left .team-info .team-logo {
  width: 130px;
  height: 130px;
  margin-top: 20px;
  margin-right: 8px;
  overflow: hidden;
  display: block;
  float: left;
}
.team-con .team-left .team-info .info-con {
  margin-top: -10px;
  line-height: 24px;
  font-size: 14px;
  width: 495px;
  float: left;
}
.team-con .team-left .team-info .info-con .team-name {
  font-size: 24px;
  color: #333;
  white-space: nowrap;
  overflow: visible;
  text-overflow: ellipsis;
}
.team-con .team-left .team-info .info-con .team-name img {
  width: 30px;
  position: relative;
  top: 8px;
  margin-left: 8px;
}
.team-con .team-left .team-info .info-con .wid350 {
  display: inline-block;
  width: 260px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.team-con .team-left .team-info .info-con .wid150 {
  display: inline-block;
  width: 130px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.team-con .team-right {
  width: 580px;
  height: 220px;
  background: #f7f7f7;
  margin-bottom: 20px;
  padding: 35px 30px;
  box-sizing: border-box;
}
.team-con .team-right .info-left {
  width: 430px;
  float: left;
  margin-right: 20px;
}
.team-con .team-right .info-left .name {
  color: #333;
  font-size: 24px;
}
.team-con .team-right .info-left .name img {
  margin-left: 10px;
  position: relative;
  top: 4px;
  height: 25px;
  width: inherit;
}
.team-con .team-right .info-left .detail-info ul {
  width: 145px;
  line-height: 30px;
  font-size: 14px;
  float: left;
  list-style: none;
}
.team-con .team-right .info-left .detail-info ul li {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.team-con .team-right .info-left .detail-info ul li span {
  text-align: justify;
  -moz-text-align-last: justify;
  text-align-last: justify;
  width: 60px;
  display: inline-block;
}
.team-con .team-right .info-left img {
  float: right;
  width: 100px;
  height: auto;
  vertical-align: top;
}

.under {
  display: flex;
  justify-content: space-between;
}
.under .venueimage {
  height: auto;
  width: 800px;
  margin-left: 0;
}

.under .el-card {
  background-color: white ;
  height: 450px;
  color: #000;
  margin-right: 100px;
  width: 300px;
}

.under h1 {
  margin: 0px 0px 10px 10px;
}

.under .showBlock {
  margin-top: 10px;
}

.under .temperature {
  font-size: 50px;
}

.under .weather {
  margin-left: 20px;
  font-size: 35px;
}

.under .address {
  font-size: 20px;
}

.under .other {
  margin-top: 10px;
}

.under .other p {
  margin-top: 10px;
  font-size: 18px;
}

.under #reporttime {
  margin-top: 10px;
  font-size: 14px;
}

.under .mainWeather {
  float: right;
  margin-top: 10px;
  margin-right: 10%;
  font-size: 120px;
}

.under .showBlock {
  margin-left: 10px;
}
</style>
