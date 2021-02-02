<template>
    <div>
        <div class="container mt-5 col-6">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header">S'identifier</div>
                        <div class="card-body">
                            <form ref="form" @submit.prevent="Login">
                                <div class="form-group">
                                    <input id="email" type="text" class="form-control" name="email" v-model="email"
                                            autocomplete="email" placeholder="Email">
                                </div>
                                <div class="form-group">
                                    <input id="password" type="password" class="form-control" name="password"
                                            v-model="password" autocomplete="current-password" placeholder="Mot de passe">
                                </div>
                                
                                <div class="form-group"> 
                                    <a class="btn btn-link" href="">Mot de passe oublié</a>
                                            
                                </div>

                                <div class="form-check col-md-6">
                                    <input class="form-check-input" type="checkbox" v-model="remember" name="remember" id="remember">
                                    <label class="form-check-label" for="remember">
                                        Remember Me
                                    </label>
                                </div>
                           

                                <button type="submit" class="btn btn-primary btn-block mt-2">
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from "axios";
    import {mapMutations} from "vuex";
    export default {
        name: "Login",
        data() {
            return {
                email: "",
                password: "",
                remember: false
            }
        },
        methods: {
            ...mapMutations({
                updateStorage: 'updateStorage'
            }),
            Login() {
                axios.post("/api/user/login", {
                    email: this.email,
                    password: this.password
                }).then(res => {
                    if (res.data.success) {
                        let user = JSON.stringify(res.data.success);
                        if (this.remember) {
                            localStorage.set("user", user);
                             this.$refs.form.reset();
                             this.updateStorage();
                             this.$router.push({
                                name: "Home"
                             });
                        } else {
                            sessionStorage.setItem("user", user);
                             this.$refs.form.reset();
                             this.updateStorage();
                             this.$router.push({
                                name: "Home"
                              });
                          }
                    } else {
                        alert("Indentification échouée")
                    }
                }).catch(err => {
                    console.log("errors", err.response);
                   // let errors = Object.values(err.response.data.error).join("\r\n");
                    alert(err.response.data.error);
                })
            }
        }
    }
</script>