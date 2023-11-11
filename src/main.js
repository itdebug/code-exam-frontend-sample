import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en'

import Element from 'element-ui'

import App from './App'

import router from './router'

Vue.use(ElementUI)

Vue.use(Element, {
  size: 'medium' // set element-ui default size
})


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
