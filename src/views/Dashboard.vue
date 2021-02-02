<template>
    <section id="main">
        <div class="container">
            <div class="row">  
                <!-- Sidebar -->       
                <Sidebar/>
                <!-- Content -->
                <router-view />             
            </div>
        </div>
    </section>
</template>

<script>
    import Sidebar from "../components/dashboard/Sidebar.vue"

    export default {
        name: "Dashboard",
        components: { Sidebar }
    }
</script>