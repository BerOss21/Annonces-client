<template>
    <div class="col-md-8  imp-medium">
        <!-- Content -->
        <article class="box post">
            <nav aria-label="breadcrumb mb-5">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Villes</li>
                </ol>
            </nav>
            <header> 
                <h2 class="mb-2">Gérer vos villes</h2>  
                <div class="d-flex mb-3">
                    <router-link :to="{name:'CreateCity'}" class="btn btn-primary ml-auto">Ajouter une ville</router-link>
                </div>            
            </header>
            <div class="table-responsive mt-4">
                <table class="table display" id="table_id" v-if="success">
                    <thead>
                        <tr>
                            <th scope="col">Nom de la ville</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(city,index) in paginate" :key="index">
                            <td>{{city.name}}</td>
                            <td>
                                <div class="d-flex">
                                    <router-link :to="{name:'EditCity',params:{id:city.id}}" class="btn btn-primary btn-sm mr-1">modifier</router-link>
                                    <a href="/" class="btn btn-danger btn-sm mr-1" @click.prevent="deleteCity(city.id)">supprimer</a>
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
        name: "CitiesList",
        data(){
            return{
                success:false,
                page_number:1, 
            }
        },
        computed:
        {
            paginate() {
                return this.cities.slice((this.page_number - 1) * 5, this.page_number * 5);
            },
            numberOfPages(){
                return Math.ceil(this.cities.length/5);
            },
            ...mapState({
                cities:"cities"
            }),
            ...mapGetters({
                user:"user"
            })
        },
        methods:{
            changePage(page){
                this.page_number=page;
            },

            deleteCity(id){
                if(confirm("Supprimer cette ville ?")){
                    axios.delete(`/api/cities/${id}`,{ headers: { "Authorization": `Bearer ${this.user.token || ""}` } }).then(res=>{
                        if(res.data.success){
                            alert("La ville est bien supprimée");
                            this.getCities();
                        }
                        else{
                            alert("La ville n'est pas supprimée");
                        }
                    }).catch(err=>{
                        console.log("err",err);
                    })    
                }    
            },
           ...mapActions({
                getCities: 'getCities'
            })
        },
        mounted(){
            this.getCities().then(()=>{
                this.success=true;
            });
        },
       

    }
</script>