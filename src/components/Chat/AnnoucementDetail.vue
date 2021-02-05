<template>
    <div class="col-md-4">
        <div class="card">
            <img :src="annoucement?annoucement.image.encoded:''" class="card-img-top" :alt="annoucement?annoucement.title:''">
            <div class="card-body">
                <h5 class="card-title">{{annoucement?annoucement.title:''}}</h5>
                <p class="card-text text-info">{{annoucement?annoucement.price:''}} DH<br><span class="text-secondary">{{annoucement?annoucement.created_at:''}}</span></p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <h3>Description</h3>
                    <p class="card-text">
                        {{annoucement?annoucement.description:''}}
                    </p>
                </li>
                <li class="list-group-item">
                    <h3>Localisation</h3>
                    <p class="card-text">
                        {{annoucement?annoucement.cities.map(i=>i.name).join(" "):''}}
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import {
        mapState,
        mapActions,
        mapMutations
    } from "vuex";
    export default {
        name: "AnnoucementDetail",
        computed: {
            ...mapState(["annoucement"])
        },
        methods: {
            ...mapActions({
                getSingle: "getSingle"
            }),
            ...mapMutations({
                clearAnnoucement: "clearAnnoucement"
            })
        },
        mounted() {
            this.getSingle(this.$route.params.id);
        },
    }
</script>