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
                <h2 class="mb-2">Modifier mon profile</h2>
                <div class="d-flex mb-3">
                    <router-link :to="{name:'Profile'}" class="btn btn-primary ml-auto">Retourner</router-link>
                </div>
            </header>
            <div>
                <form enctype="multipart/form-data" ref="form" @submit.prevent="onSubmit">
                    <div class="form-group">
                        <label for="name">Nom</label>
                        <input type="text" id="name"  v-model="name">
                    </div>
                    <div class="form-group">
                        <label for="name">Email</label>
                        <input type="email" id="name"  v-model="email">
                    </div>
                    <div class="form-group">
                        <label for="mobile">Mobile</label>
                        <input type="numbre" id="mobile"  v-model="mobile">
                    </div>
                    <div class="mb-3">
                        <label for="formFile" class="form-label">Avatar</label>
                        <input class="form-control" type="file" @change="onImageChange" id="formFile">
                        <div v-if="avatar" class="mt-2" style="width:100%">
                            <img v-if="avatar" :src="avatar" alt="image" style="50%">
                        </div>
                    </div>
                
                    <input type="submit" value="Modifier" class="btn btn-block btn-primary mt-3">
                </form>
            </div>
        </article>
    </div>
</template>
<script>
    import axios from "axios";
    import {mapGetters,mapMutations} from "vuex";
    export default {
        name: "EditProfile",
        data() {
            return {
                name:"",
                email:"",
                mobile:"",
                avatar: "",
            }
        },
        computed:mapGetters({
            user:"user"
        }),
        methods: {
             ...mapMutations({
                updateStorage: 'updateStorage'
            }),
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
                        this.avatar=data
                    }
                );
            },

            onSubmit() {
                axios.patch(`/api/user/update/${this.user.id}`, {
                    name: this.name,
                    email:this.email,
                    mobile:this.mobile,
                    avatar: this.avatar,
                },{ headers: { "Authorization": `Bearer ${this.user.token || ""}` } }).then(res => {
                    if (res.data.success) {
                        let NewUser=this.user;
                        NewUser.name=res.data.success.name;
                        NewUser.email=res.data.success.email;
                        NewUser.mobile=res.data.success.mobile;
                        NewUser.avatar=res.data.success.avatar;
                        if(localStorage.user){
                            localStorage.setItem("user",JSON.stringify(NewUser));
                            this.updateStorage();
                        }
                        else{
                            sessionStorage.setItem("user",JSON.stringify(NewUser));
                            this.updateStorage();
                        }
                        alert("Votre profile est modifiée avec success");
                        this.$refs.form.reset()
                        this.$router.push({name:"Profile"});
                    } else if(res.data.error){
                        alert(res.data.error)
                    }
                    else{
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
           this.name=this.user.name,
           this.email=this.user.email,
           this.mobile=this.user.mobile,
           this.avatar=this.user.avatar.encoded
           
        }

    }
</script>