import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about', 
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/dept',
    name: 'dept', 
    component: () => import(/* webpackChunkName: "about" */ '../views/DeptView.vue')
  },
  {
    path: '/emp',
    name: 'emp', 
    component: () => import(/* webpackChunkName: "about" */ '../views/EmpView.vue')
  },
  {
    path: '/kpi',
    name: 'kpi', 
    component: () => import(/* webpackChunkName: "about" */ '../views/KpiView.vue')
  },
  {
    path: '/ana',
    name: 'ana', 
    component: () => import(/* webpackChunkName: "about" */ '../views/AnaView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
