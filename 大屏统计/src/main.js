import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import axios from 'axios'
import service from '../service.js'
import { sha256 } from 'js-sha256'
import * as echarts from 'echarts/lib/echarts';
// import Vue from 'vue'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  
axios.defaults.baseURL='http://106.15.195.23:8081';//设置基址
// Vue.prototype.$echarts = echarts
// Vue.prototype.$sha256 = sha256
app.use(ElementPlus)
app.use(router)
app.use(service)
// app.use(sha256)
app.mount('#app')