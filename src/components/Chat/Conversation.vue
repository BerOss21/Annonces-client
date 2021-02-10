<template>
    <div class="col-md-8">
        <nav aria-label="breadcrumb mb-5">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link :to="{name:'Search'}">Annonces</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Conversation</li>
            </ol>
        </nav>
        <div>
            <div class="card">
                <div class="card-header">
                    <h3>Conversation</h3>
                </div>
                <div class="card-body" style="height:600px;overflow-y:scroll">
                    <div class="container col-10">
                        <div class="col-5 mb-3"
                            :class="message.from.id==user.id?'ml-auto alert alert-success':'alert alert-secondary'"
                            v-for="(message,index) in messages" :key="index">
                            <img :src="message.from.avatar.encoded"  alt="avatar" style="width:30px;height:30px;vertical-align:top" class="rounded-circle mr-1">
                            <strong class="card-title"> {{message.from.name==user.name?"Vous":message.from.name}}</strong>
                            <p class="card-text mt-2">{{message.content}}</p>
                            <i class="float-right mt-2"><small>{{message.created_at}}</small></i>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                </div>
                <div class="card-footer text-muted">
                    <form v-if="receiver && annoucement.user_id==user.id || annoucement.user_id!=user.id" @submit.prevent="SentMessage" ref="form">
                        <div class="form-group mb-3">
                            <textarea class="form-control" placeholder="Ecrire votre message ici"
                                v-model="content" @focus="makeAsRead"></textarea>
                            <input type="submit" class="btn btn-danger btn-block form-control p-1 mt-3" value="Envoyer">
                        </div>
                    </form>
                </div>
                <div class="card-footer text-muted" v-if="annoucement.user_id && annoucement.user_id==user.id">
                   <div class="row">
                        <div v-for="(item,index) in list" :key="index" class="col-2 text-center">
                            <a href="" @click.prevent="selectUser(item.id)" style="position:relative;color:white">
                                 <img :src="item.avatar.encoded" alt="avatar" class="rounded-circle" :class="unreadNotifications.some(i=>i.data.message.from.id==item.id)?'unread':''"  style="width:100%">
                                 <span v-if="unreadNotifications.some(i=>i.data.message.from.id==item.id)" class="badge bg-danger" style="position:absolute;top:-8px">{{unreadNotifications.filter(i=>i.data.message.from.id==item.id).length}}</span>
                            </a>
                            <small>{{item.name}}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from "axios";
    import {
        mapState,
        mapGetters,
        mapActions
    } from "vuex";
  

    export default {
        name: "Conversation",
        data() {
            return {
                content: "",
                receiver: "",
                allMessages: "",
                list: "",
            }
        },
        computed: {
            ...mapState(["annoucement","unreadNotifications"]),
            ...mapGetters(['user']),
            messages() {
                if (this.receiver) {
                    return this.allMessages.filter(item => item.from.id == this.receiver || item.to.id == this
                        .receiver);
                } else {

                    return this.annoucement.user_id == this.user.id ? "" : this.allMessages;
                }
            },
        },
        methods: {
            ...mapActions(["getSingle","getNotifications"]),
            SentMessage() {
                axios.post("/api/messages", {
                    to: this.annoucement.user_id == this.user.id ? this.receiver : this.annoucement.user_id,
                    content: this.content,
                    annoucement_id: this.$route.params.id
                }, {
                    headers: {
                        "Authorization": `Bearer ${this.user.token || ""}`
                    }
                }).then(res => {
                    if (res.data.success) {
                        this.allMessages.push(res.data.success);
                        this.content = "",
                            this.$refs.form.reset();
                    }
                }).catch(err => {
                    console.log("error", err)
                })
            },
            selectUser(id) {
                this.receiver = id;
            },
            getMessages() {
                let prop = this.annoucement.user_id == this.user.id ? "true" : "";
                axios.get(`/api/getMessages/${this.$route.params.id}/${this.user.id}/${prop}`, {
                    headers: {
                        "Authorization": `Bearer ${this.user.token || ""}`
                    }
                }).then(res => {
                    if (res.data.messages) {
                        this.allMessages = res.data.messages;
                    }
                    if (res.data.list) {
                        // filtre pour avoir la liste des utilisateur ayant contacté l'annonceur
                        let data = res.data.list.map(item => Object.values(item).filter(i => i.id != this.user
                            .id)[0]);//on a maintenant dans la variable data la liste des contacts avec des contacts dupliqués
                        this.list = Array.from(new Set(data.map(a => a.id))).map(id => {//pour enlever les contacts dupliqués
                            return data.find(a => a.id === id)
                        });
                    }
                }).catch(err => {
                    console.log("error", err)
                })
            },
            makeAsRead(){
                axios.post(`/api/makeAsRead/${this.user.id}/${this.receiver}`,{},{
                    headers: {
                        "Authorization": `Bearer ${this.user.token || ""}`
                    }
                }).then(res=>{
                    if(res.data.success){
                        this.getNotifications();
                    }
                })
            }
        },
        watch: {
            annoucement() {
                this.getMessages();//demander les messages une fois l'annonce est recupérée.
            }
        },
        mounted() {
            this.getSingle(this.$route.params.id);
            this.getNotifications();
            window.Echo.private('App.Models.User.' + this.user.id).notification((data) => {
                console.log("notification data", data);
                if(this.annoucement.user_id == this.user.id){ // si l'utilisateur authentifié est l'annonceur if faut updater la list des contact .
                    let listOfId=this.list.map(i=>i.id);
                    if(listOfId.includes(data.message.from.id)){ //ne mettre à jour la liste des contacts que s'il s'agit d'un contact qui n'exist pas encore.
                        this.allMessages.push(data.message) 
                    }
                    else{
                        this.getMessages(); //pour modifier la liste des contacts il faut demander à nouveau la liste des messages est executer les filtres javascript.
                    }
                }
                this.allMessages.push(data.message) //si non il suffit d'ajouter le nouveau message au liste des messages.
            });
        }
    }
</script>
<style lang="css" scoped>
    .unread{
        border:3px solid red;
    }
   

</style>