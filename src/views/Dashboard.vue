<template>
    <section id="main mb-0">
        <div class="container">
            <div class="row">  
                <!-- Sidebar -->       
                <Sidebar class="mt-5"/>
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