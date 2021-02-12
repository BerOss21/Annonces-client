<template>
    <div>
        <section id="main">
            <div class="container">
                <nav aria-label="breadcrumb mb-5">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <router-link :to="{name:'Home'}">Acceuil</router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Recherche</li>
                    </ol>
                </nav>
                <Filter />
                <div class="row">
                    <Content />
                    <RightSidebar />
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import RightSidebar from '../components/Search/RightSidebar.vue';
    import Content from '../components/Search/Content.vue';
    import Filter from '../components/Search/Filter.vue';
    export default {
        name: "Search",
        components: {
            RightSidebar,
            Content,
            Filter
        },
    }
</script>