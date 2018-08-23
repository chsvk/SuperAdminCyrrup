<template>
    <div class="login">
        <md-field>
            <label>Username</label>
            <md-input v-model="username"></md-input>
        </md-field>
        <br>
        <md-field>
            <label>Password</label>
            <md-input v-model="password" type="password"></md-input>
        </md-field>
        <br>
        <md-button v-on:click="signup" class="md-raised md-primary">SignUp</md-button>
        <md-button v-on:click="login" class="md-accent">Login</md-button>
    </div>
</template>

<script>
import firebase from 'firebase'
import router from '../router.js'
export default {
    name: 'login',
    router,
    data(){
        return{
            username: '',
            password: '',
        }
    },
    methods: {
        login: function(){
            router.push('/login');
        },
        signup: function(){
            console.log(this.username);
            firebase.auth().createUserWithEmailAndPassword(this.username, this.password).then(function(user){
                firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    
                    router.push('/home');
                } else {
                    // No user is signed in.
                }
                });
            })
            .catch(function(error) {
            console.log(error.message);
            });
        }
    }

}
</script>

<style lang="scss" scoped>
    
    
    .md-primary{
        background: #03a9f4;
    }

    .login{
        overflow: hidden;
       width: 25%;
       margin: auto;
    }

</style>

