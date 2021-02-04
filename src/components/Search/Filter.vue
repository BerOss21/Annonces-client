<template>
    <div class="col-12 bg-secondary mb-5" style="padding:15px">
        <form>
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <input type="text" class="form-control" v-model="q" placeholder="Mots clés" @keyup="filter">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <select class="form-control form-select" v-model="category" @change="filter">
                            <option value="" selected>Toutes les catégories</option>
                            <option v-for="category in categories" :key="category.id" :value="category.id" >{{category.name}}</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <select class="form-control form-select" v-model="city" @change="filter">
                            <option value="" selected>Toutes les villes</option>
                            <option v-for="city in cities" :key="city.id" :value="city.id" >{{city.name}}</option>
                        </select>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import {mapActions,mapState} from "vuex";
export default {
    name:"Filter",
    data(){
        return{ 
            q:"",
            category:"",
            city:""  
        }
    },
    computed:{
        ...mapState({
            categories:"categories",
            cities:"cities"
        })
    },
    methods:{
        ...mapActions({
            getCities:"getCities",
            getCategories:"getCategories"
        }),
        /*...mapMutations({
            filter:"filter"
        }),*/
       filter(){
            this.$store.commit("filter",{
                "q":this.q,
                "category":this.category,
                "city":this.city
            })
       }
        
    },
    mounted(){
        this.getCategories();
        this.getCities();
    }
}
</script>