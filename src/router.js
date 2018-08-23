import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Login from './views/Login.vue'
import SignUp from './views/SignUp.vue'
import ViewAll from './views/ViewAll.vue'
import AddDevice from './views/AddDevice.vue'
import Device from './views/Device.vue'
import Org from './views/Org.vue'
import AddOrg from './views/AddOrg.vue'
import Drivers from './views/Drivers.vue'
import Vehicles from './views/Vehicles.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'device',
      component: Device
    },
    {
      path: '/addDevice',
      name: 'addDevice',
      component: ViewAll
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/org',
      name: 'org',
      component: Org
    },
    {
      path: '/addOrg',
      name: 'addOrg',
      component: AddOrg
    },
    {
      path: '/drivers',
      name: 'drivers',
      component: Drivers
    },
    {
      path: '/vehicle',
      name: 'vehicles',
      component: Vehicles
    }
  ]
})
