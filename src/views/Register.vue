<template>
    <div class="container mt-5 col-md-6">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        S'inscrire
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="Register" ref="form">
                            <div class="form-group">
                                <input id="name" type="text" class="form-control" name="name" v-model="name"
                                    autocomplete="name" autofocus placeholder="Nom">
                            </div>

                            <div class="form-group">
                                <input id="email" type="email" v-model="email" class="form-control" name="email"
                                    autocomplete="email" placeholder="Email">
                            </div>

                            <div class="form-group">
                                <input id="password" type="password" v-model="password" class="form-control"
                                    name="password" autocomplete="new-password" placeholder="Mot de passe">
                            </div>

                            <div class="form-group">
                                <input id="password-confirm" type="password" v-model="password_confirmation"
                                    class="form-control" name="password_confirmation" autocomplete="new-password"
                                    placeholder="Confirmer le mot de passe">
                            </div>
                            <div class="input-group mb-3">
                                <label class="input-group-text" for="inputGroupFile01">Avatar</label>
                                <input type="file" class="form-control" id="inputGroupFile01" @change="onAvatarChange">
                            </div>
                            <button type="submit" class="btn btn-primary btn-block">
                                Inscription
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from "axios";
    import {mapMutations } from "vuex";
    export default {
        name: "Register",
        data() {
            return {
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
                avatar:""
            }
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
            
            onAvatarChange(e) {
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
            ...mapMutations({
                updateStorage: 'updateStorage'
            }),
            Register() {
                axios.post("/api/user/register", {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    confirm: this.password_confirmation,
                    avatar:this.avatar
                }).then(res => {
                    if (res.data.success) {
                        let user = JSON.stringify(res.data.success);
                        localStorage.setItem("user", user);
                        this.$refs.form.reset();
                        this.updateStorage();
                        this.$router.push({
                            name: "Home"
                        });
                    } else {
                        alert("Inscription échouée")
                    }
                }).catch(err => {
                    console.log("errors", err.response);
                    let errors = Object.values(err.response.data.error).join("\r\n");
                    alert(errors);
                })
            }
        }
    }
</script>