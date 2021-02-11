<template>
    <div class="col-8 col-12-medium imp-medium">
        <!-- Content -->
        <article class="box post">
            <nav aria-label="breadcrumb mb-5">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Mon profile</li>
                </ol>
            </nav>
            <div class="card">
                <div class="card-header d-flex">
                    <h3>Informations personnels</h3>
                    <router-link :to="{name:'EditProfile'}" class="btn btn-primary ml-auto">Modifier</router-link>
                </div>
                <div class="card-body" v-if="user">
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Nom:</strong> {{user.name}}</li>
                        <li class="list-group-item"><strong>Email:</strong> {{user.email}}</li>
                        <li class="list-group-item"><strong>Mobile:</strong> {{user.mobile || "Non disponible"}}</li>
                        <li class="list-group-item">
                            <strong>Avatar: </strong>
                            <img :src="user.avatar.encoded" alt="avatar" class="rounded" style="width:50px;height:50px">
                        </li>
                    </ul>
                </div>
                <div class="d-flex justify-content-center" v-else>
                    <div class="spinner-border text-danger m-5" role="status">
                    </div>
                </div>
            </div>
        </article>
    </div>
</template>
<script>
    import {
        mapGetters
    } from "vuex";
    export default {
        name: "Profile",
        computed: mapGetters({
            user: "user"
        })
    }
</script>