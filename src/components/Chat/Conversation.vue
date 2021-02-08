<template>
    <div class="col-md-8">
        <nav aria-label="breadcrumb mb-5">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link :to="{name:'Search'}">Annonces</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Convesation</li>
            </ol>
        </nav>
        <div>
            <div class="card">
                <div class="card-header">
                    <h3>Conversation</h3>
                </div>
                <div class="card-body">
                    <div class="container col-10">
                        <div class="col-5 mb-3"
                            :class="message.from.id==user.id?'ml-auto alert alert-success':'alert alert-secondary'"
                            v-for="(message,index) in messages" :key="index">
                            <h5 class="card-title">{{message.from.name}}</h5>
                            <p class="card-text">{{message.content}}</p>
                        </div>
                    </div>
                </div>
                <div class="card-footer text-muted">
                    <form @submit.prevent="SentMessage" ref="form">
                        <div class="form-group mb-3">
                            <textarea class="form-control" placeholder="Ecrire votre message ici"
                                v-model="content"></textarea>
                            <input type="submit" class="btn btn-danger btn-block form-control p-1 mt-3" value="envoyer">
                        </div>
                    </form>
                </div>
                <div class="card-footer text-muted" v-if="annoucement.user_id && annoucement.user_id==user.id">
                    <ul>
                        <li v-for="(item,index) in list" :key="index">
                            <a href="" @click.prevent="selectUser(item.id)"> {{item.name}} </a>
                        </li>
                    </ul>
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
            ...mapState(["annoucement"]),
            ...mapGetters(['user']),
            messages() {
                if (this.receiver) {
                    return this.allMessages.filter(item => item.from.id == this.receiver || item.to.id == this
                        .receiver);
                } else {

                    return this.annoucement.user_id == this.user.id ? "" : this.allMessages;
                }
            },
            /*echo(){
                 return new Echo({
                            broadcaster: 'pusher',
                            key: "MyAppId",
                            cluster: "mt1",
                            forceTLS: false,
                            wsHost: window.location.hostname,
                            wsPort: 6001,
                            wssHost: window.location.hostname,
                            wssPort: 6001,
                            disableStats: true,
                            enabledTransports: ['ws', 'wss'],
                            auth: {
                                headers: {
                                    Authorization: `Bearer ${this.user.token}`,
                                    Accept: 'application/json',
                                },
                            },
                        })
            }*/
        },
        methods: {
            ...mapActions({
                getSingle: "getSingle"
            }),
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
                        this.getMessages();
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
                        let data = res.data.list.map(item => Object.values(item).filter(i => i.id != this.user
                            .id)[0]);
                        this.list = Array.from(new Set(data.map(a => a.id))).map(id => {
                            return data.find(a => a.id === id)
                        });
                    }
                }).catch(err => {
                    console.log("error", err)
                })
            }
        },
        watch: {
            annoucement() {
                this.getMessages();
            }
        },
        mounted() {
            this.getSingle(this.$route.params.id);
            window.Echo.private('App.Models.User.' + this.user.id).notification((data) => {
                console.log("notification data", data);
                this.getMessages();
            });
        }
    }
</script>