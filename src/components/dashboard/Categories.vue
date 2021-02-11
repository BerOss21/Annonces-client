<template>
    <div class="col-md-8  imp-medium">
        <!-- Content -->
        <article class="box post">
            <nav aria-label="breadcrumb mb-5">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Categories</li>
                </ol>
            </nav>
            <header> 
                <h2 class="mb-2">Gérer vos categories</h2>  
                <div class="d-flex mb-3">
                    <router-link :to="{name:'CreateCategory'}" class="btn btn-primary ml-auto">Ajouter une categorie</router-link>
                </div>            
            </header>
            <div class="table-responsive mt-4">
                <table class="table display" id="table_id">
                    <thead>
                        <tr>
                            <th scope="col">Image</th>
                            <th scope="col">Name</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody v-if="success">
                        <tr v-for="(category,index) in categories" :key="index">
                            <td>
                                <img v-if="category.image" :src="category.image.encoded" :alt="category.name" style="width:100px">
                                <span v-else><i class="fas fa-images" style="font-size:25px"></i></span>
                            </td>
                            <td>{{category.name}}</td>
                            <td>
                                <div class="d-flex">
                                    <router-link :to="{name:'EditCategory',params:{id:category.id}}" class="btn btn-primary btn-sm mr-1">modifier</router-link>
                                    <a href="/" class="btn btn-danger btn-sm mr-1" @click.prevent="deleteCategory(category.id)">supprimer</a>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else >
                        <tr>
                            <td>
                                <div class="d-flex justify-content-center">
                                    <div class="spinner-border text-danger m-5" role="status">
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </article>
    </div>
</template>
<script> 
    import axios from 'axios';
    import {
        mapState,
        mapGetters,
        mapActions
    } from 'vuex';
    export default {
        name: "CategoriesList",
        data(){
            return{
                success:false
            }
        },
        computed:
        {
            ...mapState({
                categories:"categories"
            }),
            ...mapGetters({
                user:"user"
            })
        },
        methods:{
            deleteCategory(id){
                if(confirm("Supprimer cette categorie")){
                    axios.delete(`/api/categories/${id}`,{ headers: { "Authorization": `Bearer ${this.user.token || ""}` } }).then(res=>{
                        if(res.data.success){
                            alert("La categorie est bien supprimée");
                            this.getCategories();
                        }
                        else{
                            alert("La categorie n'est pas supprimée");
                        }
                    }).catch(err=>{
                        console.log("err",err);
                    })    
                }    
            },
           ...mapActions({
                getCategories: 'getCategories'
            })
        },
        mounted(){
            this.getCategories().then(()=>{
                this.success=true;
            });
        },
       

    }
</script>