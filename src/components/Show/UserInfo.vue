<template>
    <div class="col-md-4">
        <div class="card">
            <h5 class="card-header">Annonceur</h5>
            <div class="card-body" v-if="annoucement">
                <img :src="annoucement.user?annoucement.user.avatar.encoded:''" :alt="annoucement.name" style="width:100%">            
                <h5 class="mt-2">
                    {{annoucement.user?annoucement.user.name:''}}
                </h5>
                <p class="card-text">{{annoucement.user?annoucement.user.email:''}}</p>
                <p class="card-text">Mobile : </p>
                <router-link :to="{name:'Chat'}" class="btn btn-primary btn-block">Chat</router-link>
            </div>
            <div v-else class="d-flex justify-content-center">
                <div class="spinner-border text-danger m-5" role="status">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
     import {
        mapState,mapActions,mapMutations
    } from "vuex";
    export default {
        name: "UserInfo",
        computed: {
            ...mapState(["annoucement"])
        },
        methods:{
            ...mapActions({
                getSingle:"getSingle"
            }),
            ...mapMutations({
                clearAnnoucement:"clearAnnoucement"
            })
        },
        mounted(){
            this.getSingle(this.$route.params.id);
        },
        beforeMount(){
            this.clearAnnoucement();
        }
    }
</script>