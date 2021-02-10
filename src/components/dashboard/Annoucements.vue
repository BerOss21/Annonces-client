<template>
    <div class="col-md-8  imp-medium">
        <!-- Content -->
        <article class="box post">
            <nav aria-label="breadcrumb mb-5">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Annonces</li>
                </ol>
            </nav>
            <header> 
                <h2 class="mb-2">Gérer vos annonces</h2>  
                <div class="d-flex mb-3">
                    <router-link :to="{name:'CreateAnnoucement'}" class="btn btn-primary ml-auto">Ajouter une annonce</router-link>
                </div>            
            </header>
            <div class="table-responsive mt-4">
                <table class="table display" id="table_id" style="min-width:2000px;height:300px;overflow:scroll;" >
                    <thead>
                        <tr>
                            <th scope="col">Image</th>
                            <th scope="col">Titre</th>
                            <th scope="col">Description</th>
                            <th scope="col">Categorie</th>
                            <th scope="col">Ville</th>
                            <th scope="col">Annonceur</th>
                            <th scope="col">Prix en MAD</th>
                            <th scope="col">Gallerie</th>
                            <th scope="col">Date</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody v-if="annoucements[0]">
                        <tr v-for="(annoucement,index) in annoucements" :key="index">
                            <td><img :src="annoucement.image.encoded" :alt="annoucement.title" style="width:100px"></td>
                            <td>{{annoucement.title}}</td>
                            <td>{{annoucement.description.slice(0,30)}} ...</td>
                            <td>{{annoucement.category.name}}</td>
                            <td>
                                <span v-for="(item,index) in annoucement.cities" :key="index" >
                                    {{item.name}} <br>
                                </span>
                            </td>
                            <td>{{annoucement.user.name}}</td>
                            <td>{{annoucement.price}}</td>
                            <td>
                                <img  v-for="(item,index) in annoucement.galleries" :key="index" :src="item.image.encoded" alt="gallery" style="width:40px">
                            </td>
                            <td>{{annoucement.created_at}}</td>
                            <td>
                                <div class="d-flex">
                                    <router-link :to="{name:'EditAnnoucement',params:{id:annoucement.id}}" class="btn btn-primary btn-sm mr-1">modifier</router-link>
                                    <a href="/" class="btn btn-danger btn-sm mr-1" @click.prevent="deleteAnnoucement(annoucement.id)">supprimer</a>
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
       // mapState,
        mapGetters,
        mapActions
    } from 'vuex';
    export default {
        name: "Annoucements",
        data(){
            return{
                annoucements:""
            }
        },
        computed:{
            /*...mapState({
                annoucements:"annoucements"
            }),*/
            ...mapGetters({
                user:"user"
            })
        },
        methods:{
            deleteAnnoucement(id){
                if(confirm("Supprimer cette annonce")){
                    axios.delete(`/api/annoucements/${id}`,{ headers: { "Authorization": `Bearer ${this.user.token || ""}` } }).then(res=>{
                        if(res.data.success){
                            alert("L'annonce est bien supprimée");
                            let url=this.user.role=="admin"?("/api/annoucements"):('/api/myAnnoucements');
                            axios.get(url,{ headers: { "Authorization": `Bearer ${this.user.token || ""}` } }).then(res=>{
                                if(res.data.annoucements){
                                        this.annoucements=res.data.annoucements
                                    }
                                }).catch(err=>{
                                    console.log("error",err)
                                })
                        }
                        else{
                            alert("L'annonce n'est pas supprimée");
                        }
                    }).catch(err=>{
                        console.log("err",err);
                    })    
                }    
            },
           ...mapActions({
                getAnnoucements: 'getAnnoucements'
            })
        },
        mounted(){
            let url=this.user.role=="admin"?("/api/annoucements"):('/api/myAnnoucements');
            axios.get(url,{ headers: { "Authorization": `Bearer ${this.user.token || ""}` } }).then(res=>{
               if(res.data.annoucements){
                    this.annoucements=res.data.annoucements
                }
             }).catch(err=>{
                console.log("error",err)
            })
        },
       

    }
</script>