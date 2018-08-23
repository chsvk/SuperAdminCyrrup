<template>
  <div id="app">
    <nav>
      <ul>
        <li><router-link class="brand" to="/">Admin DashBoard</router-link></li>
        <li class="r" v-on:click="logout" v-if="logged"><a>Logout</a></li>
        <li class="r" v-if="logged"><router-link to="/platform"><a>Platform</a></router-link></li>
        <li class="r" v-if="logged"><router-link to="/vehicle"><a>Vehicle</a></router-link></li>
        <li class="r" v-if="logged"><router-link to="/drivers"><a>Drivers</a></router-link></li>
        <li class="r" v-if="logged"><router-link to="/org"><a>Organization</a></router-link></li>
        <li class="r" v-if="logged"><router-link to="/"><a>Device</a></router-link></li>
      </ul>
    </nav>
    <hr>
    <router-view/>
  </div>
</template>

<script>
import firebase from 'firebase'
import router from './router.js'
export default {
  name: 'app',
  router,
  data(){
    return{
      logged: false,
    }
  },
  mounted() {
    this.checkUser();
  },
  methods: {
    checkUser: function(){
      var vm = this;
      firebase.auth().onAuthStateChanged(function(user){
        if(user){
          console.log('LoggedIn');
          vm.logged = true;
          router.push('/');
        }else{
          router.push('/login');
          console.log('No Login');
        }
      });
    },
    logout: function(){
      var vm = this;
      firebase.auth().signOut().then(function() {
        vm.logged = false;
        router.push('/login');
      }).catch(function(error) {
        // An error happened.
      });
    }
  }
}
</script>


<style lang="scss">
@import url(http://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300ita‌​lic,400italic,500,500italic,700,700italic,900italic,900);
  
  *{
    font-family: 'Roboto';
  }

  .brand{
    font-size: 2em;
    margin: 1em;
    font-weight: bolder;
    color: orange;
  }
  
  ul{
    list-style-type: none;
  }

  li{
    text-decoration: none;
    display: inline;
  }

  li a{
    text-decoration: none;
    color: black;
    font-size: 1em;
    margin: 1em;
  }

  .r{
    float: right;
  }

</style>
