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
                <table class="table display" id="table_id" v-if="success">
                    <thead>
                        <tr>
                            <th scope="col">Image</th>
                            <th scope="col">Name</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(category,index) in paginate" :key="index">
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
                </table>
                <div v-else class="d-flex justify-content-center">
                    <div class="spinner-border text-danger m-5" role="status">
                    </div>
                </div>
            </div>
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li class="page-item"  v-for="index in numberOfPages" :key="index"><a class="page-link" href="#" @click.prevent="changePage(index)">{{index}}</a></li>
                     <li class="page-item">
                        <a class="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
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
                success:false,
                page_number:1,  
            }
        },
        computed:
        {
            paginate() {
                return this.categories.slice((this.page_number - 1) * 5, this.page_number * 5);
            },
            numberOfPages(){
                return Math.ceil(this.categories.length/5);
            },
            ...mapState({
                categories:"categories"
            }),
            ...mapGetters({
                user:"user"
            })
        },
        methods:{
            changePage(page){
                this.page_number=page;
            },

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