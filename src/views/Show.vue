<template>
    <div>
        <section id="main">
            <div class="container">
                <div class="row">
                    <Details />
                    <UserInfo />
                </div>
            </div>
        </section>
    </div>
</template>
<script>
    import Details from '../components/Show/Details.vue';
    import UserInfo from '../components/Show/UserInfo.vue';
    export default {
        name: "Show",
        components: {
            Details,
            UserInfo
        },
    }
</script>