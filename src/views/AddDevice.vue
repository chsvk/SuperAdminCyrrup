<template>
    <div class="addDevice">
        <div class="head">
        <h1>Add New Device</h1>
        <span class="submitted" v-if="submitted">Submitted Device</span>
        <button v-if="submitted" v-on:click="this.reset">Add New</button>
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
            <section>
                <h3>Organization ID:</h3>
                <input v-model="orgid" type="text">
            </section>
            <section>
                <h3>Driver ID:</h3>
                <input v-model="driverid" type="text">
            </section>
            <section>
                <h3>Vehicle ID:</h3>
                <input v-model="vehicleid" type="text">
            </section>
            <button v-on:click="submit">Add Device</button>
        </div>
    </div>
</template>

<script>
import { db } from '../main'
export default {
    name: 'add',
    data(){
        return{
            userid: '',
            imei: '',
            mobile: '',
            device: '',
            orgid: '',
            driverid: '',
            vehicleid: '',
            submitted: false,
        }
    },
    methods: {
        submit: function(){
            var vm = this;
            console.log("add new device");
				var collectionRef = db.collection("admin_api_requests");
				var responseCollectionRef = db.collection("admin_response");
				var userObject = {
				    userId: this.userid,
				    imeiNumber: this.imei,
					mobileNumber: this.mobile,
					deviceName: this.device,
					organization_id: this.orgid,
					driver_id: this.driverid,
					vehicle_id: this.vehicleid
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
        },
        reset: function(){
            this.submitted = false;
            this.userid = '';
            this.imei = '';
            this.mobile = '';
            this.device = '';
            this.orgid = '';
            this.driverid = '';
            this.vehicleid = '';
        }
    }
}
</script>

<style lang="scss" scoped>

    .addDevice{
        width: 85%;
        margin: 0 auto;

        h1{
            margin-top: 2.5em;
            text-align: center;
        }

        section{
            display: grid;
            grid-template-columns: 50% auto;
            margin: 1em;
        }

        .head{
            display: grid;
            grid-template-columns: 60% 20% 20%;
        }

        .submitted{
            color: green;
        }
    }

</style>

