<template>
    <div class="col-md-8">
        <!-- Content -->
        <div class="card">
            <div class="card-header">
                <h3>Dernières annonces</h3>
            </div>
            <div class="card-body" v-if="paginate[0]">
                <template v-if="paginate[0]">
                    <div class="card mb-3 border border-primary" style="width:100%" v-for="(annoucement,index) in paginate" :key="index">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <router-link :to="{name:'Show',params:{id:annoucement.id,title:annoucement.title}}">
                                    <img :src="annoucement.image.encoded"  alt="" style="width:100%;height:100%">
                                </router-link>
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <router-link :to="{name:'Show',params:{id:annoucement.id,title:annoucement.title}}">
                                        <h5 class="card-title">{{annoucement.title}}</h5>
                                    </router-link>
                                    <p class="card-text text-danger h5">{{annoucement.price}} DH</p>
                                    <p class="card-text"><small class="text-muted">{{annoucement.category.name}}</small></p>
                                    <p class="pt-1" style="border-top:1px solid rgba(0,0,0,0.3)">{{annoucement.created_at}} / {{annoucement.cities.map(i=>i.name).join(" ")}}</p>
                                </div>
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
                </template>
                <div v-else class="alert alert-warning text-center mx-auto">
                    Aucune résultat trouvée 
                </div>
            </div>
            <div v-else class="d-flex justify-content-center">
                <div class="spinner-border text-danger m-5" role="status">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState,mapActions} from "vuex";
    export default {
        name: "Content",
        data(){
            return{
                success:false,
                page_number:1
            }
        },
        computed:{
            paginate() {
                return this.annoucements.slice((this.page_number - 1) * 12, this.page_number * 12);
            },
            numberOfPages(){
                return Math.ceil(this.annoucements.length/12);
            },
            ...mapState({
                annoucements:"filter"
            })
        },
        methods:{
            changePage(page){
                this.page_number=page;
            },
            ...mapActions({
                getAnnoucements:"getAnnoucements"
            }),
        },
          
        mounted(){
            window.scrollTo(0,0);
            this.getAnnoucements().then(()=>{
                this.success=true;
            });
        }
    }
</script>