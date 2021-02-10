<template>
    <div class="col-md-4">
        <!-- Sidebar -->
        <section>
            <a href="#" class="image featured"><img :src="user.avatar.encoded" alt="avatar" /></a>
        </section>
        
        <ul class="list-group">
            <router-link  :to="{name:'Annoucements'}"><li class="list-group-item list-group-item-action ">Mes annonces</li></router-link>
            <router-link  :to="{name:'CategoriesList'}" v-if="user.role=='admin'"><li class="list-group-item list-group-item-action">Categories</li></router-link>
            <router-link  :to="{name:'CitiesList'}" v-if="user.role=='admin'"><li class="list-group-item list-group-item-action">Villes</li></router-link>
            <router-link  :to="{name:'Profile'}"><li class="list-group-item list-group-item-action">Mon profile</li></router-link>
        </ul>
      
    </div>
</template>
<script>
import {mapGetters} from "vuex";
export default {
    name:"Sidebar",
    computed:mapGetters({
        user:"user"
    })
}
</script>