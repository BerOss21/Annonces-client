<template>
    <div class="col-md-4">
        <!-- RightSidebar -->
        <div class="card">
            <div class="card-header">
                <h3>Populaires</h3>
            </div>
            <div class="card-body">
                <section class="box" v-for="(item,index) in popular" :key="index">
                    <a href="#" class="image featured"><img :src="item.image.encoded" :alt="item.title" /></a>
                    <header>
                        <h3>{{item.title}}</h3>
                    </header>
                    <p>{{item.description.slice(0,50)}} ...</p>

                    <span class="badge bg-info text-dark p-1">{{item.views}} vues</span>
                    <footer>
                        <a href="#" class="button alt">Voir plus</a>
                    </footer>
                </section>
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