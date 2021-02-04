<template>
    <div class="col-md-8">
        <!-- Content -->
        <div class="card">
            <div class="card-header">
                <h3>Dernières annonces</h3>
            </div>
            <div class="card-body">
                <div class="card mb-3 border border-primary" style="width:100%" v-for="(annoucement,index) in annoucements" :key="index">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <router-link :to="{name:'Show',params:{id:annoucement.id}}">
                                 <img :src="annoucement.image.encoded"  alt="" style="width:100%;height:100%">
                            </router-link>
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <router-link :to="{name:'Show',params:{id:annoucement.id}}">
                                    <h5 class="card-title">{{annoucement.title}}</h5>
                                </router-link>
                                <p class="card-text text-danger h5">{{annoucement.price}} DH</p>
                                <p class="card-text"><small class="text-muted">{{annoucement.category.name}}</small></p>
                                <p class="pt-1" style="border-top:1px solid rgba(0,0,0,0.3)">{{annoucement.created_at}} / {{annoucement.cities.map(i=>i.name).join(" ")}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState,mapActions} from "vuex";
    export default {
        name: "Content",
        computed:{
            ...mapState({
                annoucements:"filter"
            })
        },
        methods:mapActions({
            getAnnoucements:"getAnnoucements"
        }),
        mounted(){
            this.getAnnoucements();
        }
    }
</script>