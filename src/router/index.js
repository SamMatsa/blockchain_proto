import Vue from 'vue'
import Router from 'vue-router'
import MachineOverview from '../views/MachineOverview.vue'
import ProductOverview from '../views/ProductOverview.vue'
import ServiceEngineerOverview from '../views/ServiceEngineerOverview.vue'
import Login from '@/components/Login'
import Register from '@/components/Register'
import SecretPage from '@/components/SecretPage'


Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
  {
    path: '/',
    name: 'Machine',
    component: MachineOverview, 
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/machine',
    name: 'Machine',
    component: MachineOverview, 
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/product',
    name: 'Product',
    component: ProductOverview,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/service',
    name: 'Service',
    component: ServiceEngineerOverview,
    meta: {
      requiresAuth: true
    }
  },
  {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
          guest: true,
          plainLayout: true,
      }
  },
  {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
          guest: true
      }
  },
  {
    path: '/secret-page',
    name: 'SecretPage',
    component: SecretPage,
    meta: {
        requiresAuth: true,
    }
  }
  ]
})   


router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
      if (localStorage.getItem('jwt') == null) {
          next({
              path: '/login',
              params: { nextUrl: to.fullPath }
          })
      } else {
          let user = JSON.parse(localStorage.getItem('user'))
          if(to.matched.some(record => record.meta.is_admin)) {
              if(user.is_admin == 1){
                  next()
              }
              else{
                  next({ name: 'Product'})
              }
          }else {
              next()
          }
      }
  } else if(to.matched.some(record => record.meta.guest)) {
      if(localStorage.getItem('jwt') == null){
          next()
      }
      else{
          next({ name: 'Product'})
      }
  }else {
      next()
  }
})


export default router
