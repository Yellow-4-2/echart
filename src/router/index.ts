import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    // 左栏 3 个详情页
    {
      path: '/inspect',
      name: 'inspect',
      component: () => import('../views/InspectDetail.vue'),
      meta: { title: '抽检情况详情' }
    },
    {
      path: '/complaint',
      name: 'complaint',
      component: () => import('../views/ComplaintDetail.vue'),
      meta: { title: '消费投诉详情' }
    },
    {
      path: '/recall',
      name: 'recall',
      component: () => import('../views/RecallDetail.vue'),
      meta: { title: '产品召回详情' }
    },
    // 右栏 3 个详情页
    {
      path: '/opinion',
      name: 'opinion',
      component: () => import('../views/OpinionDetail.vue'),
      meta: { title: '舆情数据详情' }
    },
    {
      path: '/penalty',
      name: 'penalty',
      component: () => import('../views/PenaltyDetail.vue'),
      meta: { title: '行政处罚详情' }
    },
    {
      path: '/crime',
      name: 'crime',
      component: () => import('../views/CrimeDetail.vue'),
      meta: { title: '违法信息详情' }
    }
  ]
})

export default router
