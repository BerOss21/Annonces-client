<template>
    <section id="intro" class="container">
        <div class="row" v-if="categories[0]">
            <div v-for="(category,index) in categories" class="col-md-3" :key="index">
                <section class="first p-0 mb-0">
                    <router-link :to="{name:'Categories',params:{id:category.id,name:category.name}}">
                        <i class="icon solid featured alt2 fa-folder-open"></i>
                    </router-link>
                    <header>
                        <h5>{{category.name}}</h5>
                    </header>
                </section>
            </div>
        </div>
        <div v-else class="d-flex justify-content-center">
            <div class="spinner-border text-danger m-5" role="status">
            </div>
        </div>
    </section>
</template>
<script>
import {mapState,mapActions} from "vuex";
export default {
    name:"intro",
    computed:mapState(["categories"]),
    methods:mapActions(["getCategories"]),
    beforeMount(){
        this.getCategories();
    }
}
</script>