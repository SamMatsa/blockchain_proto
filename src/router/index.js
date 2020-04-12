import Vue from 'vue'
import VueRouter from 'vue-router'
import MachineOverview from '../views/MachineOverview.vue'
import ProductOverview from '../views/ProductOverview.vue'
import Home from '../views/Home.vue'
import ServiceEngineerOverview from '../views/ServiceEngineerOverview.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/machine',
    name: 'Machine',
    component: MachineOverview
  },
  {
    path: '/product',
    name: 'Product',
    component: ProductOverview
  },
  {
    path: '/service',
    name: 'Service',
    component: ServiceEngineerOverview
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
