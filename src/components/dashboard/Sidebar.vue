<template>
    <div class="col-md-4">
        <!-- Sidebar -->
        <section class="box">
            <a href="#" class="image featured"><img src="images/pic09.jpg" alt="" /></a>
            <header>
                <h3>Sed etiam lorem nulla</h3>
            </header>
            <p>Lorem ipsum dolor sit amet sit veroeros sed amet blandit consequat veroeros lorem blandit
                adipiscing et feugiat phasellus tempus dolore ipsum lorem dolore.</p>
            <footer>
                <a href="#" class="button alt">Magna sed taciti</a>
            </footer>
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