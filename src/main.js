import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload";

Vue.config.productionTip = false
Vue.use(ElementUI)
// 添加事件总线对象
Vue.prototype.$bus=new Vue()
//安装toast插件
Vue.use(toast)
//使用懒加载插件
Vue.use(VueLazyload,{
  loading:require('./assets/img/common/top.png')
})
//解决移动端300ms延迟
FastClick.attach(document.body)
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
