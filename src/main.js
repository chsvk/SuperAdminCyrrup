import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'


Vue.config.productionTip = false
Vue.use(VueFire)
Vue.use(VueMaterial)

firebase.initializeApp({
  apiKey: "AIzaSyAJYfNfeuDpFqNacL6Ah1yPPOGUmkf77u8",
  authDomain: "vbb-dev.firebaseapp.com",
  databaseURL: "https://vbb-dev.firebaseio.com",
  projectId: "vbb-dev",
})
export const db = firebase.firestore()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
