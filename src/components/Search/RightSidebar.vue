<template>
    <div class="col-md-4">
        <!-- RightSidebar -->
        <div class="card">
            <div class="card-header">
                <h3>Populaires</h3>
            </div>
            <div class="card-body" v-if="popular[0]">
                <section class="box" v-for="(item,index) in popular" :key="index">
                    <router-link :to="{name:'Show',params:{id:item.id,title:item.title}}" class="image featured"><img :src="item.image.encoded" :alt="item.title" /></router-link>
                    <header>
                        <h3>{{item.title}}</h3>
                    </header>
                    <p>{{item.description.slice(0,50)}} ...</p>

                    <span class="badge bg-info text-dark p-1">{{item.views}} vues</span>
                    <footer>
                        <router-link :to="{name:'Show',params:{id:item.id,title:item.title}}"  class="button alt">Voir plus</router-link>
                    </footer>
                </section>
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
        mapGetters
    } from "vuex";
    export default {
        name: "RightSidebar",
        computed: {
            ...mapGetters({
                popular: "popular"
            })
        }
    }
</script>