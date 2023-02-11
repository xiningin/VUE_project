import { createRouter, createWebHistory} from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
	component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue')
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView_2.vue')
  },
  {
    path: '/overView',
    name: 'overView',
    component: () => import(/* webpackChunkName: "person" */ '../views/DataOverView.vue')
  },
  {
    path: '/person',
    name: 'person',
    component: () => import(/* webpackChunkName: "person" */ '../views/PersonView.vue')
  },
  {
    path: '/analysis',
    name: 'analysis',
    component: () => import(/* webpackChunkName: "person" */ '../views/QuestionnaireAnalysis.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
