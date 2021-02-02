<template>
    <div class="col-8 col-12-medium imp-medium">
        <!-- Content -->
        <article class="box post">
            <nav aria-label="breadcrumb mb-5">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Création</li>
                </ol>
            </nav>
            <header>
                <h2 class="mb-2">Ajouter une annonce</h2>
                <div class="d-flex mb-3">
                    <router-link :to="{name:'Annoucements'}" class="btn btn-primary ml-auto">Retourner</router-link>
                </div>
            </header>
            <div>
                <form enctype="multipart/form-data" ref="form" @submit.prevent="onSubmit">
                    <div class="form-group">
                        <label for="title">Titre</label>
                        <input type="text" id="title" v-model="title">
                    </div>
                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea v-model="description" id="description"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="title">Categorie</label>
                        <select name="categories" v-model="category">
                            <option v-for="(category,index) in categories" :value="category.id" :key="index">
                                {{category.name}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="title">Villes</label>
                        <select name="city[]" v-model="city" multiple>
                            <option v-for="(city,index) in cities" :value="city.id" :key="index">
                                {{city.name}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="price">Prix en MAD</label>
                        <input type="number" id="price" v-model="price">
                    </div>
                    <div class="mb-3">
                        <label for="formFile" class="form-label">Image</label>
                        <input class="form-control" type="file" @change="onImageChange" id="formFile">
                    </div>
                    <div class="mb-3">
                        <label for="formMultipleFile" class="form-label">Gallery d'image</label>
                        <input class="form-control" type="file" @change="onGalleryChange" id="formmultipleFile" multiple>
                    </div>
                    <input type="submit" value="Créer" class="btn btn-block btn-primary mt-3">
                </form>
            </div>
        </article>
    </div>
</template>
<script>
    import {
        mapState,
        mapGetters,
        mapActions
    } from 'vuex';
    import axios from "axios";
    export default {
        name: "CreateAnnoucement",
        data() {
            return {
                title: "",
                description: "",
                category: "",
                city:[],
                price:"",
                image: {},
                gallery:[]
            }
        },
        computed:{ 
           ...mapState({
            categories: 'categories',
            cities:'cities'
           }),
           ...mapGetters([
                'user',
            ])
        },
        methods: {
            // method for converting file to base64
            getBase64(file) {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = error => reject(error);
                });
            },
            //

            onImageChange(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length) {
                    console.log('no files');
                }
                this.getBase64(files[0]).then(
                    data => {
                        console.log(data);
                        this.image=data
                    }
                );
            },

              onGalleryChange(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length) {
                    console.log('no files');
                }
                files.forEach(item => {
                    this.getBase64(item).then(
                        data => {
                            this.gallery.push(data)
                        }
                    );
                });
               
            },
            onSubmit() {
                axios.post("/api/annoucements", {
                    title: this.title,
                    description: this.description,
                    category_id: this.category,
                    image: this.image,
                    price:this.price,
                    cities:this.city,
                    gallery:this.gallery
                },{ headers: { "Authorization": `Bearer ${this.user.token || ""}` } }).then(res => {
                    if (res.data.success) {
                        alert("L'annonce est ajoutée avec success");
                        this.$refs.form.reset()
                    } else {
                        alert("Création echouée")
                    }
                }).catch(err => {
                    console.log("errors", err.response);
                    let errors=Object.values(err.response.data.errors).join("\r\n");
                    alert(errors);
                })
            },
            ...mapActions({
                getCategories: 'getCategories',
                getCities: 'getCities'
            })
        },
        mounted() {
            this.getCategories();
            this.getCities();
        }

    }
</script>