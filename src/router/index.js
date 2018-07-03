import Vue from 'vue'
import Router from 'vue-router'
import Home from 'pages/home/home'
import page1 from 'pages/page1/page1'
import page2 from 'pages/page2/page2'
import page3 from 'pages/page3/page3'
import layout from 'pages/layout/layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',  //路由默认跳转
      redirect: 'layout'
    },
    {
      path: '/layout',
      name: 'layout',
      component: layout
    },
    {
      path: '/view',
      name: 'view',
      component: layout
    }
  ],
  linkActiveClass: 'active'
})
