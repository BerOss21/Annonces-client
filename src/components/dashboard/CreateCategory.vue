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
                <h2 class="mb-2">Ajouter une catégorie</h2>
                <div class="d-flex mb-3">
                    <router-link :to="{name:'CategoriesList'}" class="btn btn-primary ml-auto">Retourner</router-link>
                </div>
            </header>
            <div>
                <form enctype="multipart/form-data" ref="form" @submit.prevent="onSubmit">
                    <div class="form-group">
                        <label for="name">Nom</label>
                        <input type="text" id="name" v-model="name">
                    </div>                 
                    <div class="mb-3">
                        <label for="formFile" class="form-label">Image</label>
                        <input class="form-control" type="file" @change="onImageChange" id="formFile">
                    </div>
                    <input type="submit" value="Créer" class="btn btn-block btn-primary mt-3">
                </form>
            </div>
        </article>
    </div>
</template>
<script>

    import axios from "axios";
    import {mapGetters} from "vuex";
    export default {
        name: "CreateCategory",
        data() {
            return {
                name: "",
                image: {},
            }
        },
        computed:{
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

            onSubmit() {
                axios.post("/api/categories", {
                    name: this.name,
                    image: this.image,
                },{ headers: { "Authorization": `Bearer ${this.user.token || ""}` } }).then(res => {
                    if (res.data.success) {
                        alert("La catégorie est ajoutée avec success");
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
        },

    }
</script>