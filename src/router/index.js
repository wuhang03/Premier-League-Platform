import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import ResultView from '../views/result/ResultView.vue'
const Player=()=>import("../views/player/PlayerView.vue")
const Team = () => import("../views/team/TeamView.vue")

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/team',
    name: 'team',
    component: Team
  },
  {
    path: '/player',
    name: 'player',
    component: Player
  },
  {
    path: '/result',
    name: 'result',
    component: ResultView
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
