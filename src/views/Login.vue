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
        <md-button v-on:click="login" class="md-raised md-primary">Login</md-button>
        <md-button v-on:click="signup" class="md-accent">Sign Up</md-button>
    </div>
</template>

<script>
import axios from 'axios'
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
            axios.post('https://vapi.cyrrup.com/api/vbb-auth/login/', {
                    "username": "preetam@cyrrup.com",
                    "password": "momypapa123"
                }
            ).then(function(e){
                firebase.auth().signInWithCustomToken(e.data.token).then(function(e){
                    console.log(e);
                }).catch(function(e){
                    console.log(e.message);
                })
                console.log(e);
            }).catch(function(e){
                console.log(e.message);
            })

            // firebase.auth().signInWithEmailAndPassword(this.username, this.password).then(function(user){
            //     firebase.auth().onAuthStateChanged(function(user) {
            //     if (user) {
            //         router.push('/');
            //     } else {
            //         // No user is signed in.
            //     }
            //     });
            // })
            // .catch(function(error) {
            // // Handle Errors here.
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // console.log('Error');
            // // ...
            // });
        },
        signup: function(){
            router.push('/signup');
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

