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
                    <span>{{user.name}} <span class="badge bg-danger text-white"> {{unreadNotifications.length}} </span></span>
                </a>
                <div id="logout" ref="logout" class="mt-2 d-none" style="position:absolute;width:100%;z-index:100;">
                        <ul class="list-group text-left" style="font-size:12px;max-height:300px;overflow-y:scroll;">
                            <li class="list-group-item list-group-item-action" :class="notification.read_at?'list-group-item-light':'list-group-item-warning'" v-for="(notification,index) in notifications" :key="index">
                                <h6><img :src="notification.data.message.from.avatar.encoded" alt="avatat" style="width:30px"> {{notification.data.message.from.name}} </h6>
                                {{notification.data.message.content.slice(0,10)}}<a href="" @click.prevent="makeAsRead(notification.id)"><i v-if="!notification.read_at" class="fas fa-eye float-right"></i></a>
                            </li>
                        </ul>
                    <button class="btn btn-danger btn-block" @click="Logout">Se deconnecter <i class="fas fa-sign-out-alt"></i></button>
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
    import { mapGetters,mapMutations,mapState,mapActions} from 'vuex';
    import axios from "axios";
    export default {
        name:"Navbar",
        computed:{
            ...mapGetters([
                'user',
            ]),
            ...mapState(["notifications","unreadNotifications"])
        },
        methods:{
            ...mapMutations(["updateNotifications","updateStorage"]),
            DisplayLogout(){
               this.$refs.logout.classList.toggle("d-none");
            },
            makeAsRead(id){
                axios.post(`/api/makeNotificationAsRead/${id}`,{},{
                    headers: {
                        "Authorization": `Bearer ${this.user.token || ""}`
                    }
                }).then(res=>{
                    if(res.data.success){
                       this.getNotifications();
                    }
                })
            },
            Logout(){
                localStorage.clear();
                sessionStorage.clear();
                this.updateNotifications();
                this.updateStorage();
                this.$router.push({name:"Login"});
            },
            ...mapActions(["getNotifications"])
        },
        beforeMount(){
            this.getNotifications();
        },
        mounted(){
            window.Echo.private('App.Models.User.' + this.user.id).notification((data) => {
                console.log("notification data", data);
                 this.getNotifications();
            });
        }
    }
</script>