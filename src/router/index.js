import Vue from 'vue'
import Router from 'vue-router'
import index1 from '@/pages/index1'
import index2 from '@/pages/index2'
import index3 from '@/pages/index3'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index1',
      component: index1
    },
    {
      path: '/index2',
      name: 'index2',
      component: index2
    },
    {
      path: '/index3',
      name: 'index3',
      component: index3
    }
  ]
})
