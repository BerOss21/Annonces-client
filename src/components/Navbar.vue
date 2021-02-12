<template>
    <!-- Logo -->
    <h1><a href="">Annonces.ma</a></h1>
    <!-- Nav -->
    <nav id="nav">
        <ul>
            <li>
                <router-link to="/">Accueuil</router-link>
            </li>
            <!--<li class="opener link"> 
                <router-link :to="{name:'Categories'}">Categories</router-link>
            </li>-->
            <li>
                <router-link :to="{name:'Search'}">Recherche</router-link>
            </li>

            <li v-if="user">
                <router-link :to="{name:'Dashboard'}">Dashboard</router-link>
            </li>
            <li v-if="user" style="position:relative;text-align:center">
                <a href="" @click.prevent="DisplayLogout">
                    <img :src="user.avatar.encoded" alt="avatar" class="rounded-circle mr-1"
                        style="width:30px;height:30px">
                    <span>{{user.name}} <i class="fab fa-facebook-messenger h4 ml-3"
                            :class="unreadNotifications.length?'text-danger':''"></i><span class="badge bg-transparent"
                            :class="unreadNotifications.length?'text-danger':'text-dark'" style="vertical-align:top">
                            {{unreadNotifications.length}} </span></span>
                </a>
                <div ref="logout" class="mt-2 logout d-none" style="position:absolute;width:100%;z-index:100;">
                    <ul class="list-group text-left" style="font-size:12px;max-height:300px;overflow-y:scroll;">
                        <template v-if="success">
                            <template v-if="notifications[0]">
                                <router-link
                                    :to="{name:'Chat',params:{id:notification.data.message.annoucement_id,title:'Detail annonce'}}"
                                    class="list-group-item list-group-item-action text-dark"
                                    :class="notification.read_at?'list-group-item-light':'list-group-item-warning'"
                                    v-for="(notification,index) in notifications" :key="index">
                                    <h6><img :src="notification.data.message.from.avatar.encoded" alt="avatat"
                                            style="width:30px"> {{notification.data.message.from.name}} </h6>
                                    {{notification.data.message.content.slice(0,10)}}<a href=""
                                        @click.prevent="makeAsRead(notification.id)" data-bs-toggle="tooltip" data-bs-placement="top" title="Marquer comme lue" ><i v-if="!notification.read_at"
                                            class="fas fa-eye float-right"></i></a>
                                </router-link>
                            </template>
                            <div v-else class="alert alert-warning text-center mx-auto">
                                Aucune notification disponible
                            </div>
                        </template>
                        <div v-else class="d-flex justify-content-center">
                            <div class="spinner-border text-danger m-5" role="status">
                            </div>
                        </div>
                    </ul>
                    <button class="btn btn-danger btn-block" @click="Logout">Se deconnecter <i
                            class="fas fa-sign-out-alt"></i></button>
                </div>
            </li>
            <template v-else>
                <li>
                    <router-link :to="{name:'Login'}">S'identifier</router-link>
                </li>
                <li>
                    <router-link :to="{name:'Register'}">S'inscrire</router-link>
                </li>
            </template>
        </ul>
    </nav>
    <div class="panel">
        <nav>
            <ul class="p-0">
                <router-link class="text-dark" to="/">
                    <li class="list-group-item list-group-item-dark list-group-item-action">Accueuil</li>
                </router-link>
                <!--<router-link class="text-dark" :to="{name:'Categories'}">
                    <li class="list-group-item list-group-item-dark list-group-item-action">
                    Categories
                    </li>
                </router-link>-->
                <router-link class="text-dark" :to="{name:'Search'}">
                    <li class="list-group-item list-group-item-dark list-group-item-action">Recherche</li>
                </router-link>
                <router-link class="text-dark" :to="{name:'Dashboard'}">
                    <li v-if="user" class="list-group-item list-group-item-dark list-group-item-action">Dashboard</li>
                </router-link>
                <li v-if="user" class="list-group-item list-group-item-dark list-group-item-action"
                    style="position:relative;">
                    <a href="" @click.prevent="DisplayLogout" class="text-dark">
                        <img :src="user.avatar.encoded" alt="avatar" class="rounded-circle mr-1" style="width:40px">
                        <span>{{user.name}} <i class="fab fa-facebook-messenger h4 ml-3"
                                :class="unreadNotifications.length?'text-danger':''"></i><span
                                class="badge bg-transparent"
                                :class="unreadNotifications.length?'text-danger':'text-dark'"
                                style="vertical-align:top"> {{unreadNotifications.length}} </span></span>
                    </a>
                    <div ref="logout2" class="mt-2 logout d-none"
                        style="position:absolute;left:0;width:100%;z-index:100;">
                        <ul class="list-group text-left" style="font-size:12px;max-height:300px;overflow-y:scroll;">
                            <template v-if="success">
                                <template v-if="notifications[0]">
                                    <router-link
                                        :to="{name:'Chat',params:{id:notification.data.message.annoucement_id,title:'Detail annonce'}}"
                                        class="list-group-item list-group-item-action text-dark"
                                        :class="notification.read_at?'list-group-item-light':'list-group-item-warning'"
                                        v-for="(notification,index) in notifications" :key="index">
                                        <h6><img :src="notification.data.message.from.avatar.encoded" alt="avatat"
                                                style="width:30px"> {{notification.data.message.from.name}} </h6>
                                        {{notification.data.message.content.slice(0,10)}}<a href=""
                                            @click.prevent="makeAsRead(notification.id)" data-bs-toggle="tooltip" data-bs-placement="top" title="Marquer comme lue"><i v-if="!notification.read_at"
                                                class="fas fa-eye float-right"></i></a>
                                    </router-link>
                                </template>
                                <div v-else class="alert alert-warning text-center mx-auto">
                                    Aucune notification disponible
                                </div>
                            </template>
                            <div v-else class="d-flex justify-content-center">
                                <div class="spinner-border text-danger m-5" role="status">
                                </div>
                            </div>
                        </ul>
                        <button class="btn btn-danger btn-block" @click="Logout">Se deconnecter <i
                                class="fas fa-sign-out-alt"></i></button>
                    </div>
                </li>
                <template v-else>
                    <router-link class="text-dark" :to="{name:'Login'}">
                        <li class="list-group-item list-group-item-dark list-group-item-action">S'identifier</li>
                    </router-link>
                    <router-link class="text-dark" :to="{name:'Register'}">
                        <li class="list-group-item list-group-item-dark list-group-item-action">S'inscrire</li>
                    </router-link>
                </template>
            </ul>
        </nav>
    </div>
</template>

<script>
    import {
        mapGetters,
        mapMutations,
        mapState,
        mapActions
    } from 'vuex';
    import axios from "axios";
    export default {
        name: "Navbar",
        data() {
            return {
                success: false
            }
        },
        computed: {
            ...mapGetters([
                'user',
            ]),
            title(id) {
                return this.annoucements ? this.annoucements.filter(i => i.id == id) : "title";
            },
            ...mapState(["notifications", "unreadNotifications"])
        },
        methods: {
            ...mapMutations(["updateNotifications", "updateStorage"]),

            DisplayLogout() {
                this.$refs.logout.classList.toggle("d-none");
                this.$refs.logout2.classList.toggle("d-none");
            },
            makeAsRead(id) {
                axios.post(`/api/makeNotificationAsRead/${id}`, {}, {
                    headers: {
                        "Authorization": `Bearer ${this.user.token || ""}`
                    }
                }).then(res => {
                    if (res.data.success) {
                        this.getNotifications();
                    }
                })
            },
            Logout() {
                localStorage.clear();
                sessionStorage.clear();
                this.updateNotifications();
                this.updateStorage();
                this.$router.push({
                    name: "Login"
                });
            },
            ...mapActions(["getNotifications"])
        },
        mounted() {
            this.getNotifications().then(() => {
                this.success = true;
            });
            console.log("notifications", this.notifications);
            window.Echo.private('App.Models.User.' + this.user.id).notification((data) => {
                console.log("notification data", data);
                this.getNotifications();
            });
        }
    }
</script>