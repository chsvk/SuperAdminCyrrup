<template>
    <div id="device">
		<div class="organizationList inline">
			<h2>Select Organization</h2>
			<select v-on:change="run" name="Organization" id="">
            <option value="0">All</option>
            <option v-for="organization in organizations" :value="organization.organisation_id">{{organization.name}}</option>
        </select>
		</div>
		<div class="innerNav inline">
        <h2>List of Devices</h2>
		<router-link to="/addDevice"><button>Add New</button></router-link>
		</div>
		<div class="devices">
				<div class="card" v-for="device in devices">
					<h3>Name : {{device.device_name}}</h3>
					<h3>ID : {{device.device_id}}</h3>
					<h3>Status : {{device.device_status}}</h3>
					<h3>Operator : {{device.operator_number}}</h3>
					<button @click="showModal">Edit</button>
					<button>Remove</button>
		</div>
		</div>
		<modal
      v-show="isModalVisible"
      @close="closeModal">
	  <modal-header>Hello</modal-header>
		</modal>
		</div>
</template>

<script>
import { db } from '../main'
import modal from '../components/Modal.vue'
export default {
	components: {
		modal
	},
    data(){
        return{
			devices: [],
			organizations: [],
			OrgLoaded: false,
			isModalVisible: false,
        }
    },
    mounted() {
		this.fetchDeviceList(0);
		this.getOrgList();
    },
    methods: {
		showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
	  },
        fetchDeviceList: function(e) {
				console.log("fetch device list execution started");
				var collectionRef = db.collection("admin_api_requests");
				if(e == 0){
					var userObject = {
						user_id: "10"
					}
				}else{
					var userObject = {
				   	 user_id:"10",
					 organisation_id: e,	
				}
				}
				collectionRef.add({
				    api_name:"device_get_list",
				    request:userObject
				})
				.then((docRef)=> {
				    console.log("Request object successfully created")
				    docRef.onSnapshot(doc=>{
					this.devices = doc.data().response.device_list;
					console.log(doc.data());
				    })
				}).catch(err => {
				    console.log(err)
				})
			},
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
            var vm = this;
            if(e.target.options.selectedIndex > 0) {
                var id = e.target.options[e.target.options.selectedIndex].value;
				vm.selectedOrg = id;
				console.log(id);
             	this.fetchDeviceList(id);
		}
		if(e.target.options.selectedIndex == 0){
			this.fetchDeviceList(0);
		}
        }
    }

}
</script>

<style lang="scss" scoped>

    #device{
        width: 90%;
        margin: 0 auto; 
    }

	.innerNav{
		h2{
			float: left;
		}
		button{
			margin: 1em;
			float: right;
		}
	}

	.devices{
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-gap: 1em;
	}

	.inline{
		display: grid;
		grid-template-columns: 50% auto;
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

</style>

