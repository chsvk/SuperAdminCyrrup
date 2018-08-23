<template>
<div class="org">
    <div class="line">
    <h1>Organizations</h1>
    <router-link to="/addOrg"><button class="btn">Add New</button></router-link>
    </div>
    <div class="orgs">
        <div class="card" v-for="org in orgs">
            <h2>Name: {{org.name}}</h2>
            <h2>ID: {{org.organisation_id}}</h2>
            <button>View Devices</button>
            <button>Disable</button>
        </div>
    </div>
    </div>
</template>

<script>
import {db} from '../main'
export default {
    data(){
        return{
            orgs: [],
        }
    },
    mounted() {
        this.getOrg();
    },
    methods: {
        getOrg: function(){
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
        }
    }
}
</script>

<style lang="scss" scoped>

    .line{
        display: grid;
        grid-template-columns: 50% auto;
        padding: 1em;
    }

    .orgs{
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: 1em;
	}
    .btn{
        float: right;
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

