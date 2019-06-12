import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/components/Auth'
import Home from '@/components/Home'
import createReport from '@/components/Reports/createReport'
import createDirectory from '@/components/Reports/createDirectory'
import reportView from '@/components/Reports/reportView'
import userChange from '@/components/manager/userChange'
Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  let token = localStorage.getItem('accessToken')
  if (token) {
    next()
    return
  }
  next('/auth')
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/manager/userChange',
      name: 'userChange',
      component: userChange,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/Home/createReport',
      name: 'createReport',
      component: createReport,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/Home/createDirectory',
      name: 'createDirectory',
      component: createDirectory,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/Home/reportView',
      name: 'reportView',
      component: reportView,
      beforeEnter: ifNotAuthenticated
    }
  ]
})
