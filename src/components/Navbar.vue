<template>
    <!-- Logo -->
    <h1><a href="">Annonces</a></h1>
    <!-- Nav -->
    <nav id="nav">
        <ul>
            <li><router-link to="/">Accueuil</router-link></li>
            <li class="opener">
                <router-link :to="{name:'Categories'}">Categories</router-link>
                <ul>
                    <li><router-link to="#">Lorem ipsum dolor</router-link></li>
                    <li><router-link to="#">Magna phasellus</router-link></li>
                    <li><router-link to="#">Etiam dolore nisl</router-link></li>
                    <li>
                        <router-link to="#">Phasellus consequat</router-link>
                        <ul>
                            <li><router-link to="#">Magna phasellus</router-link></li>
                            <li><router-link to="#">Etiam dolore nisl</router-link></li>
                            <li><router-link to="#">Veroeros feugiat</router-link></li>
                            <li><router-link to="#">Nisl sed aliquam</router-link></li>
                            <li><router-link to="#">Dolore adipiscing</router-link></li>
                        </ul>
                    </li>
                    <li><router-link to="#">Veroeros feugiat</router-link></li>
                </ul>
            </li>
            <li><router-link :to="{name:'Search'}">Recherche</router-link></li>
         
            <li v-if="user"><router-link :to="{name:'Dashboard'}">Dashboard</router-link></li>
            <li v-if="user" style="position:relative;text-align:center">
                <a href="" @click.prevent="DisplayLogout">
                    <img :src="user.avatar.encoded" alt="avatar" class="rounded-circle mr-1" style="width:40px">
                    <span>{{user.name}} <i class="fas fa-arrow-down"></i></span>
                </a>
                <div id="logout" ref="logout" class="mt-2 d-none" style="position:absolute;width:100%">
                    <span class="badge btn btn-danger btn-small" @click="Logout">Se deconnecter <i class="fas fa-sign-out-alt"></i></span>
                </div>
            </li>
            <template v-else>
                <li><router-link :to="{name:'Login'}">S'identifier</router-link></li>
                <li><router-link :to="{name:'Register'}">S'inscrire</router-link></li>
            </template>
        </ul>
    </nav>
</template>

<script>
    import { mapGetters , mapMutations} from 'vuex'
    export default {
        name:"Navbar",
        computed:{
            ...mapGetters([
                'user',
            ])
        },
        methods:{
            DisplayLogout(){
                this.$refs.logout.classList.toggle("d-none");
            },
            ...mapMutations({
                updateStorage: 'updateStorage'
            }),
            Logout(){
                localStorage.clear();
                sessionStorage.clear();
                this.updateStorage();
                this.$router.push({name:"Login"});
            }
        }
    }
</script>