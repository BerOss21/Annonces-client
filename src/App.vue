<template>
  <div>
    <section id="header">
     <Navbar/>
    </section>
  </div>
  <router-view />
  <Footer/>
</template>

<script>

import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
export default {
  components:{Navbar,Footer}
}
</script>


<style lang="scss">

</style>
