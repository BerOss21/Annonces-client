<template>
    <div class="col-md-8">
        <nav aria-label="breadcrumb mb-5">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link :to="{name:'Search'}">Annonces</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Details</li>
            </ol>
        </nav>
        <div class="card mb-3" v-if="annoucement">
            <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img :src="annoucement.image?annoucement.image.encoded:''" class="card-img-top"
                            :alt="annoucement.title">
                    </div>
                    <div class="carousel-item" v-for="item in annoucement.galleries" :key="item.id">
                        <img :src="item.image?item.image.encoded:''" class="d-block w-100" :alt="annoucement">
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Précédent</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Suivant</span>
                </a>
            </div>
            <div class="card-body">
                <h5 class="card-title">{{annoucement.title || ""}}</h5>
                <p class="card-text">{{annoucement.description || ""}}</p>
                <p class="card-text"><small class="text-muted">{{annoucement.created_at || ""}}</small></p>
            </div>
        </div>
        <div v-else class="d-flex justify-content-center">
            <div class="spinner-border text-danger m-5" role="status">
            </div>
        </div>
    </div>
</template>
<script>
    import {
        mapActions,
        mapState,
        mapMutations
    } from 'vuex';

    export default {
        name: "Details",
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
        beforeMount(){
            this.clearAnnoucement();
        },
        mounted(){
            this.getSingle(this.$route.params.id);
        }
    }
</script>