import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { title: '首页' },
      component: resolve => require(['@/views/home'], resolve)
    },
    {
      path: '',
      component: Layout,
      children: [{
        name: 'search',
        path: 'search',
        meta: { title: '搜索' },
        component: resolve => require(['@/views/search'], resolve)
      }]
    },
    {
      path: '',
      component: Layout,
      children: [{
        name: 'doctor',
        path: 'doctor',
        meta: { title: '医生' },
        component: resolve => require(['@/views/doctor'], resolve)
      }]
    },
    {
      path: '',
      component: Layout,
      children: [{
        name: 'hospital',
        path: 'hospital',
        meta: { title: '医院' },
        component: resolve => require(['@/views/hospital'], resolve)
      }]
    },
    {
      path: '',
      component: Layout,
      children: [{
        name: 'department',
        path: 'department',
        meta: { title: '科室' },
        component: resolve => require(['@/views/department'], resolve)
      }]
    },
    {
      path: '',
      component: Layout,
      children: [{
        name: 'appliance',
        path: 'appliance',
        meta: { title: '器械' },
        component: resolve => require(['@/views/appliance'], resolve)
      }]
    }
  ]
})
