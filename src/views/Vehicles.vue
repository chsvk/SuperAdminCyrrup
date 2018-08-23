<template>
    <div class="drivers">
        <div class="infographic">
        <h1>Vehicles</h1>
        <h3>Select Organization</h3>
        <select v-on:change="run" name="Organization" id="">
            <option value="0">Select Organization</option>
            <option v-for="org in orgs" :value="org.organisation_id">{{org.name}}</option>
        </select>
        </div>
        <div class="driversList">
        <div class="card" v-for="vehicle in vehicles">
            <h2>Name: {{vehicle.vehicle_id}}</h2>
            <h2>ID: {{vehicle.vehicle_reg_number}}</h2>
            <button>Edit Vehicle</button>
            <button>Delete</button>
        </div>
    </div>
    </div>
</template>

<script>
import {db} from '../main'
export default {
    data(){
        return{
            vehicles: [],
            orgs: []
        }
    },
    mounted(){
        this.getOrg();
    },
    methods: {
        getOrg: function(e){
                var collectionRef = db.collection("admin_api_requests");
				var responseCollectionRef = db.collection("admin_response");
				var userObject = {
				   	 userId:"10"
				}
				collectionRef.add({
				    api_name:"organisation_get_list",
				    request:userObject
				})
				.then((docRef)=> {
				    console.log("Request object successfully created")
				    docRef.onSnapshot(doc => {
                        
					if(doc.data().response.check){
                        this.orgs = doc.data().response.organisation_list;
                        console.log(this.orgs);
                    }
				    })
				    }).catch(err => {
                        console.log('this error');
				    console.log(err)
                })
    },
    run: function(e){
        if(e.target.options.selectedIndex > 0) {
                var id = e.target.options[e.target.options.selectedIndex].value;
             var collectionRef = db.collection("admin_api_requests");
                var responseCollectionRef = db.collection("admin_response");
                var userObject = {
                        userId:"10",
                     organisation_id: id
                }
                collectionRef.add({
                    api_name:"organisation_get_vehicle_driver",
                    request:userObject
                })
                .then((docRef)=> {
                    console.log("Request object successfully created")
                    docRef.onSnapshot(doc=>{
                        console.log(doc.data());
                    if(doc.data().response.check){
                        this.vehicles = doc.data().response.vehicle_list;
                        console.log(this.vehicles);
                    }
                    })
                }).catch(err => {
                    console.log(err)
                })
        }
    }
}
}
</script>

<style lang="scss" scoped>

    .driversList{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: 1em;
    }
    .card {
    /* Add shadows to create the "card" effect */
	padding: 20px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    }

     /* On mouse-over, add a deeper shadow */
    .card:hover {
        box-shadow: 0 8px 16px 0 rgba(255,165,0,0.6);
    }

    .infographic{
        padding: 2em;
    }

</style>

