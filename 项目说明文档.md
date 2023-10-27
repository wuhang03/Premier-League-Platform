# 英超联赛信息平台文档

[TOC]



## 一、项目背景

​		本项目是一个提供英超联赛信息的网页，用户可以浏览球队的排名、球员的排名，同时还可以搜索自己感兴趣的球队，并获得球队和教练的信息。

​		本项目的灵感来源于本人对足球联赛的喜爱，处于项目体量的考虑，将球队限制在英超联赛当中。页面的设置部分参考英超联赛官网https://www.premierleague.com/以及懂球帝球队页面https://dongqiudi.com/team/50000515.html。

## 二、功能说明

### 1. 球队榜

<img src="C:\Users\86134\Desktop\courses\微服务架构\Assignment\Assignment 1\4.png" style="zoom:33%;" />

​		通过点击导航栏中的球队帮，页面跳转至显示球队排名的页面，按照积分从高到低对球队进行排序，同时显示球队的名称、场次等信息



### 2. 球员榜

<img src="C:\Users\86134\Desktop\courses\微服务架构\Assignment\Assignment 1\5.png" style="zoom:33%;" />

​		通过点击导航栏上的球员榜，页面会跳转至显示球员信息的页面，按照进球数由高到低显示球员信息，包含球员姓名、球队、国籍、年龄等信息。



### 3. 搜索

​		在主页的搜索框当中，用户可以输入自己感兴趣的球队名称，点击搜索之后会跳转至结果页面，显示搜索的球队信息以及教练，同时在下方会显示对应的球场图片。

<img src="C:\Users\86134\Desktop\courses\微服务架构\Assignment\Assignment 1\1.png" style="zoom:33%;" />

<img src="C:\Users\86134\Desktop\courses\微服务架构\Assignment\Assignment 1\3.png" style="zoom:33%;" />

## 三、项目设计

### 1. 项目结构

​		本项目使用vue编写前端界面，并通过axios发送请求调用api，将返回的数据进行渲染后显示在页面上。由于调用现有的api，因此本项目没有进行后端的编写。

​		vue工程项目的配置和部署步骤可参考《配置与部署.pdf》文件。项目中的代码都存放在src文件夹当中。

```
src
├─assets
│  └─images
├─components
├─plugins
├─router
├─store
└─views
    ├─home
    │  └─banner
    ├─player
    ├─result
    └─team
```

* assets：存放项目所需的静态资源，如图片、字体等。

* components：存放项目的可复用组件，可以在不同的页面中引用。

* plugins：存放项目的插件，如第三方库、工具等。

* router：存放项目的路由配置文件，用于管理页面之间的跳转。

* store：存放项目的全局状态管理文件，用于存储和管理全局共享的数据。

* views：存放项目的页面文件，每个文件夹对应一个页面，页面内可以包含子组件。



### 2. 页面设计与Api调用

#### （1）主页

<img src="C:\Users\86134\Desktop\courses\微服务架构\Assignment\Assignment 1\1.png" style="zoom:33%;" />

​		主页由三部分组成： 导航栏、轮播图和脚注，其中导航栏和脚注作为单独的组件编写，放在components文件夹中，每一个页面都使用。轮播图使用Element UI组件。轮播图中间有一个搜索框，供用户输入文字，在用户输入的同时，下方的信息框会对用户的输入进行匹配，并显示能匹配的球队名称，为用户提示。

​		本页面使用的api是standings(见附录)，获取所有球队的信息存放在数组当中，每次用户输入都进行匹配并显示符合的球队名。

​		该api返回的数据格式如下

```
{
    "get": "standings",
    "parameters": {
        "league": "39",
        "season": "2023"
    },
    "errors": [],
    "results": 1,
    "paging": {
        "current": 1,
        "total": 1
    },
    "response": [
        {
            "league": {
                "id": 39,
                "name": "Premier League",
                "country": "England",
                "logo": "https://media-4.api-sports.io/football/leagues/39.png",
                "flag": "https://media-4.api-sports.io/flags/gb.svg",
                "season": 2023,
                "standings": [
                    [
                        {
                            "rank": 1,
                            "team": {
                                "id": 47,
                                "name": "Tottenham",
                                "logo": "https://media-4.api-sports.io/football/teams/47.png"
                            },
                            "points": 20,
                            "goalsDiff": 10,
                            "group": "Premier League",
                            "form": "WWDWW",
                            "status": "same",
                            "description": "Promotion - Champions League (Group Stage: )",
                            "all": {
                                "played": 8,
                                "win": 6,
                                "draw": 2,
                                "lose": 0,
                                "goals": {
                                    "for": 18,
                                    "against": 8
                                }
                            },
                            "home": {
                                "played": 3,
                                "win": 3,
                                "draw": 0,
                                "lose": 0,
                                "goals": {
                                    "for": 6,
                                    "against": 2
                                }
                            },
                            "away": {
                                "played": 5,
                                "win": 3,
                                "draw": 2,
                                "lose": 0,
                                "goals": {
                                    "for": 12,
                                    "against": 6
                                }
                            },
                            "update": "2023-10-20T00:00:00+00:00"
                        },
                        // 以下是重复格式的数据
                        ...
                    ]
                ]
            }
        }
    ]
}
```

​		

​		对该api发送axios请求及处理数据的代码如下

```
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
        this.teamData.push(array[i].team.name);
      }
    } catch (error) {
      console.error(error);
    }
  },
```



#### （2）结果页面

<img src="C:\Users\86134\Desktop\courses\微服务架构\Assignment\Assignment 1\3.png" style="zoom:33%;" />

​		结果界面根据用户的输入显示对应的球队信息，分别展示球队信息以及球队主教练信息，并在页面的下方显示球队的球场图片。

​		出于对球场信息的完善，后续添加城市以及天气的相关信息，放在球场图片两侧，效果如上图所示。

​		这个页面调用了四个接口：teams,coaches,weather和city, 分别获得球队的信息，教练的信息, 城市的信息以及球场的天气信息。首先调用teams的接口，根据球队的名称进行搜索，获取返回数据中的球队id以及城市名称，再使用这些数据调用其他的api，并接受数据。

​		接口返回的数据格式分别如下

```
// coaches
{
    "get": "coachs",
    "parameters": {
        "team": "33"
    },
    "errors": [],
    "results": 3,
    "paging": {
        "current": 1,
        "total": 1
    },
    "response": [
        {
            "id": 19,
            "name": "O. Solskjær",
            "firstname": "Ole Gunnar",
            "lastname": "Solskjær",
            "age": 50,
            "birth": {
                "date": "1973-02-26",
                "place": "Kristiansund",
                "country": "Norway"
            },
            "nationality": "Norway",
            "height": null,
            "weight": null,
            "photo": "https://media-4.api-sports.io/football/coachs/19.png",
            "team": {
                "id": 33,
                "name": "Manchester United",
                "logo": "https://media-4.api-sports.io/football/teams/33.png"
            },
            // 以下是无关数据
       	    ...
        },
    ]
}

//teams
{
    "get": "teams",
    "parameters": {
        "league": "39",
        "name": "Manchester United",
        "season": "2023"
    },
    "errors": [],
    "results": 1,
    "paging": {
        "current": 1,
        "total": 1
    },
    "response": [
        {
            "team": {
                "id": 33,
                "name": "Manchester United",
                "code": "MUN",
                "country": "England",
                "founded": 1878,
                "national": false,
                "logo": "https://media-4.api-sports.io/football/teams/33.png"
            },
            "venue": {
                "id": 556,
                "name": "Old Trafford",
                "address": "Sir Matt Busby Way",
                "city": "Manchester",
                "capacity": 76212,
                "surface": "grass",
                "image": "https://media-4.api-sports.io/football/venues/556.png"
            }
        }
    ]
}

//city
{
	name:"Manchester"
	latitude:53.4794
	longitude:-2.2453
	country:"GB"
	population:2705000
	is_capital:false
}
```

​		发送请求与处理数据的代码如下：

```
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
```



#### （3）球队榜页面

<img src="C:\Users\86134\Desktop\courses\微服务架构\Assignment\Assignment 1\4.png" style="zoom:33%;" />

​		球队榜界面通过表格的方式呈现球队的排名信息，根据球队的积分从高到低进行显示。

​		该页面同样使用的是standings api，数据格式省略，发送请求的代码如下

```
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
```



#### （4）球员榜界面

<img src="C:\Users\86134\Desktop\courses\微服务架构\Assignment\Assignment 1\5.png" style="zoom:33%;" />

​		球员榜界面通过表格的形式呈现球员的信息，按照进球数的多少由高到低进行排名，并显示球员的头像、姓名、球队、身高体重等信息。

​		该界面使用的api是top scorers,返回的数据格式如下：

```
{
    "get": "players/topscorers",
    "parameters": {
        "league": "39",
        "season": "2023"
    },
    "errors": [],
    "results": 20,
    "paging": {
        "current": 0,
        "total": 1
    },
    "response": [
        {
            "player": {
                "id": 1100,
                "name": "E. Haaland",
                "firstname": "Erling",
                "lastname": "Braut Haaland",
                "age": 23,
                "birth": {
                    "date": "2000-07-21",
                    "place": "Leeds",
                    "country": "England"
                },
                "nationality": "Norway",
                "height": "194 cm",
                "weight": "88 kg",
                "injured": false,
                "photo": "https://media-4.api-sports.io/football/players/1100.png"
            },
            "statistics": [
                {
                    "team": {
                        "id": 50,
                        "name": "Manchester City",
                        "logo": "https://media-4.api-sports.io/football/teams/50.png"
                    },
                    "league": {
                        "id": 39,
                        "name": "Premier League",
                        "country": "England",
                        "logo": "https://media-4.api-sports.io/football/leagues/39.png",
                        "flag": "https://media-4.api-sports.io/flags/gb.svg",
                        "season": 2023
                    },
                    "games": {
                        "appearences": 8,
                        "lineups": 8,
                        "minutes": 710,
                        "number": null,
                        "position": "Attacker",
                        "rating": "7.512500",
                        "captain": false
                    },
                    "substitutes": {
                        "in": 0,
                        "out": 2,
                        "bench": 0
                    },
                    "shots": {
                        "total": 28,
                        "on": 18
                    },
                    "goals": {
                        "total": 8,
                        "conceded": 0,
                        "assists": 1,
                        "saves": null
                    },
                }
            ]
        },
        // 以下是重复信息
        ...
     ]
}
```



​		发送请求和处理数据的代码如下

```
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
        "X-RapidAPI-Key": "878c7bcabemsh391866c4810b568p17944djsnf406f86467e1",
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
```



## 附录： API

| api          | url                                             | 功能                 |
| ------------ | ----------------------------------------------- | -------------------- |
| api-football | https://www.api-football.com/documentation-beta | 获取球队信息         |
| weather      | https://www.weatherapi.com/docs/                | 获取当地天气         |
| rankings     | https://rapidapi.com/fluis.lacasse/api/footapi7 | 获取球队在全球的排名 |
| city         | https://api-ninjas.com/api/city                 | 获取城市信息         |



以上API均来自于RapidAPI官网https://rapidapi.com/hub