<template>
  <div>
    <section id="header">
     <Navbar/>
    </section>
  </div>
  <router-view />
</template>

<script>

import Navbar from './components/Navbar.vue';

export default {
  components:{Navbar}
}
</script>


<style lang="scss">

</style>
