<template>
    <div class="col-8 col-12-medium imp-medium">
        <!-- Content -->
        <article class="box post">
            <nav aria-label="breadcrumb mb-5">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Modification</li>
                </ol>
            </nav>
            <header>
                <h2 class="mb-2">Modifier le nom de la ville</h2>
                <div class="d-flex mb-3">
                    <router-link :to="{name:'CitiesList'}" class="btn btn-primary ml-auto">Retourner</router-link>
                </div>
            </header>
            <div>
                <form enctype="multipart/form-data" ref="form" @submit.prevent="onSubmit">
                    <div class="form-group">
                        <label for="name">Nom de la ville</label>
                        <input type="text" id="name" v-model="name">
                    </div>       
                    <input type="submit" value="Modifier" class="btn btn-block btn-primary mt-3">
                </form>
            </div>
        </article>
    </div>
</template>
<script>
    import axios from "axios";
    import {mapGetters} from "vuex";
    export default {
        name: "EditCategory",
        data() {
            return {
                name:"",
            }
        },
        computed:{
            ...mapGetters([
                'user',
            ])
        },
        methods: {  
            onSubmit() {
                axios.patch(`/api/cities/${this.$route.params.id}`, {
                    name: this.name,
                },{ headers: { "Authorization": `Bearer ${this.user.token || ""}` } }).then(res => {
                    if (res.data.success) {
                        alert("La ville est modifiée avec success");
                        this.$refs.form.reset()
                        this.$router.push({name:"CitiesList"});
                    } else {
                        alert("Modification échouée")
                    }
                }).catch(err => {
                    console.log("errors", err.response);
                    let errors=Object.values(err.response.data.errors).join("\r\n");
                    alert(errors);
                })
            }
        },
        mounted() {
            axios.get(`/api/cities/${this.$route.params.id}/edit`,{ headers: { "Authorization": `Bearer ${this.user.token || ""}` } }).then(res=>{
                if(res.data.city){
                    this.name= res.data.city.name
                }
            })
           
        }

    }
</script>