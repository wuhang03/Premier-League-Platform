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
            </p>
          </div>
        </div>
      </div>

      <div class="team-right">
        <div class="info-left">
          <div class="name">{{coach}}</div>
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
          <img
            :src="avatar"
            alt=""
          />
        </div>
      </div>
    </div>
    
    <div class="venueimage">
      <img :src="venueimg" alt="">
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

      coach:"",
      nation:"",
      age:"",
      avatar: "",

      venueimg:"",
    };
   
  },
  created() {
    this.searchTerm = this.$route.query.searchTerm;
    this.fetchTeam();
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
      } catch (error) {
        console.error(error);
      }
    },

    async fetchCoach() {
      const axios = require("axios");
      console.log(this.id);
      const getCoach = {
        method: "GET",
        url: "https://api-football-beta.p.rapidapi.com/coachs",
        params: { team: this.id },
        headers: {
          "X-RapidAPI-Key":
            "",
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
  width: 130px;
  height: auto;
  vertical-align: top;
}
.venueimage{
  height: auto;
  width: 600px;
}
</style>
