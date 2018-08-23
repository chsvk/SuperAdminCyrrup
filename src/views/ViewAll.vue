<template>
    <div class="viewall">
        <div class="drops">
        <div class="drop">
        <h3>Select Organization</h3>
        <p class="loaded" v-if="OrgLoaded">Loaded</p>
        <p class="loading" v-else>Loading</p>
        <select v-on:change="run" name="Organization" id="">
            <option value="0">Select Organization</option>
            <option v-for="organization in organizations" :value="organization.organisation_id">{{organization.name}}</option>
        </select>
        </div>
        <div class="drop">
            <h3>Drivers</h3>
            <p class="loaded" v-if="driverLoaded">Loaded</p>
            <p class="loading" v-else>Loading</p>
            <select v-on:change="driverSelected" name="Drivers" id="">
                <option value="0">Select Driver</option>
                <option v-for="driver in drivers" :value="driver.driver_id">{{driver.name}}</option>
            </select>
        </div>
        <div class="drop">
            <h3>Vehicles</h3>
            <p class="loaded" v-if="vehicleLoaded">Loaded</p>
            <p class="loading" v-else>Loading</p>
            <select v-on:change="vehicleSelected" name="Vehicles" id="">
                <option value="0">Select Vehicle</option>
                <option v-for="vehicle in vehicles" :value="vehicle.vehicle_id">{{vehicle.vehicle_reg_number}}}</option>
            </select>
        </div>
        </div>
        <div class="add">
            <section>
                <h3>UserId:</h3>
                <input v-model="userid" type="text">
            </section>
            <section>
                <h3>IMEI Number:</h3>
                <input v-model="imei" type="text">
            </section>
            <section>
                <h3>Mobile Number:</h3>
                <input v-model="mobile" type="text">
            </section>
            <section>
                <h3>Device Name:</h3>
                <input v-model="device" type="text">
            </section>
        </div>
        <button v-on:click="add">Add Device</button>
    </div>
</template>

<script>
import firebase from 'firebase'
import { db } from '../main'
export default {
    name: 'Viewall',
    data(){
        return{
            userid: '',
            imei: '',
            mobile: '',
            device: '',
            organizations: [],
            drivers: [],
            vehicles: [],
            OrgLoaded: false,
            driverLoaded: false,
            vehicleLoaded: false,
            selectedOrg: '',
            selectedDriver: '',
            selectedVehicle: ''
        }
    },
    mounted(){
        this.getOrgList();
    },
    methods: {
        getOrgList: function(){
            this.OrgLoaded = false;
            var vm = this;
           console.log("function execution started");
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
                        vm.OrgLoaded = true;
                        console.log('boi');
                        console.log(doc.data());
                        // console.log(doc.data().response.check);
					if(doc.data().response.check){
                        this.organizations = doc.data().response.organisation_list;
                    }
				    })
				    }).catch(err => {
                        console.log('this error');
				    console.log(err)
                })
        },
        run: function(e){
            this.driverLoaded = false;
            this.vehicleLoaded = false;
            var vm = this;
            if(e.target.options.selectedIndex > 0) {
                var id = e.target.options[e.target.options.selectedIndex].value;
                vm.selectedOrg = id;
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
                    if(doc.data().response.check){
                        vm.driverLoaded = true;
                        vm.vehicleLoaded = true;
                        this.drivers = doc.data().response.driver_list;
                        this.vehicles = doc.data().response.vehicle_list;
                    }
                    })
                }).catch(err => {
                    console.log(err)
                })
        }
        },
        driverSelected: function(e){
            var vm = this;
           if(e.target.options.selectedIndex > 0) {
                var id = e.target.options[e.target.options.selectedIndex].value;
                vm.selectedDriver = id;
           }
        },
        vehicleSelected: function(e){
            var vm = this;
            if(e.target.options.selectedIndex > 0) {
                var id = e.target.options[e.target.options.selectedIndex].value;
                vm.selectedVehicle = id;
            }
        },
        add: function(){
            var vm = this;
            console.log("add new device");
				var collectionRef = db.collection("admin_api_requests");
				var responseCollectionRef = db.collection("admin_response");
				var userObject = {
				    userId: this.userid,
				    imeiNumber: this.imei,
					mobileNumber: this.mobile,
					deviceName: this.device,
					organization_id: this.selectedOrg,
					driver_id: this.selectedDriver,
					vehicle_id: this.selectedVehicle
				}
				collectionRef.add({
				    api_name:"device_add_new",
				    request:userObject
				})
				.then((docRef)=> {
				    console.log("Request object successfully created")
				    docRef.onSnapshot(doc => {
                        vm.submitted = true;
					console.log(doc.data().response)
				   })

				}).catch(err => {
				    console.log(err)
				})
        }
    }
}
</script>

<style lang="scss" scoped>

    .viewall{
        width: 80%;
        margin: 0 auto;
    }

    .drops{
        margin-top: 2em;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;

        .loading{
            color: yellow;
        }

        .loaded{
            color: green;
        }
    }

</style>

