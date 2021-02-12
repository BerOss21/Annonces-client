<template>
        <section id="header" class="p-0 mb-0">
            <!-- Banner -->
			<Banner/>
            <!-- Intro -->
			<Intro/>
             <!-- Popular -->
			<Popular/>

        
        </section>
</template>

<script>
import { mapActions } from 'vuex';
import Banner from "../components/home/Banner";
import Intro from "../components/home/Intro";
import Popular from "../components/home/Popular";

export default {
    name:"Home",
    components:{Banner,Intro,Popular},
    methods:mapActions(["getNotifications"]),
    mounted(){
      this.getNotifications()
    }
}
</script>