import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'



// import Element from 'element-ui'
// Vue.use(Element, {
//   size: 'medium' // set element-ui default size
// })

Vue.use(ElementUI)
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})