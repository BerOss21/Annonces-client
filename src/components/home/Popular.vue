<template>
    <section id="main">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <section>
                        <header class="major">
                            <h2>Les plus populaires</h2>
                        </header>
                        <div class="row" v-if="popular[0]">
                            <div class="col-md-4 col-12" v-for="(item,index) in popular" :key="index">
                                <section class="box" style="position:relative">
                                    <span class="badge badge-primary" style="position:absolute;top:5px;right:5px;z-index:100">{{item.views}} vues</span>
                                    <router-link :to="{name:'Show',params:{id:item.id,title:item.title}}" class="image featured"><img :src="item.image.encoded" alt="image" /></router-link>
                                    <header>
                                        <h5>{{item.title.slice(0,20)}} ...</h5>
                                    </header>
                                    <p>{{item.description.slice(0,50)}} ...</p>
                                    <strong class="text-danger">{{item.price}} DH</strong><br>
                                    <i>{{item.cities.map(i=>i.name).join(" ")}}</i>
                                    <footer>
                                        <ul class="actions">
                                            <li><router-link :to="{name:'Show',params:{id:item.id,title:item.title}}" class="button alt">Voir Plus</router-link></li>
                                        </ul>
                                    </footer>
                                </section>
                            </div>
                        </div>
                        <div v-else class="d-flex justify-content-center">
                            <div class="spinner-border text-danger m-5" role="status">
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </section>


</template>

<script>
    import {mapGetters,mapActions} from "vuex";
    export default {
        name:"Popular",
        computed:mapGetters(["popular"]),
        methods:mapActions(["getAnnoucements"]),
        beforeMount(){
            this.getAnnoucements();
        }
    }
</script>