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
    path: '/dept',
    name: 'dept', 
    component: () => import('../views/DeptView.vue')
  },
  {
    path: '/emp',
    name: 'emp', 
    component: () => import('../views/EmpView.vue')
  },
  {
    path: '/salary',
    name: 'salary',
    component: () => import('../views/SalaryView.vue')
  },
  {
    path: '/kpi',
    name: 'kpi', 
    component: () => import('../views/KpiView.vue')
  },
  {
    path: '/ana',
    name: 'ana', 
    component: () => import('../views/AnaView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
