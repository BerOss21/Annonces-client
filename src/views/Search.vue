<template>
    <div>
        <section id="main">
            <div class="container">
                <Filter/>
                <div class="row">
                    <Content/>
                    <RightSidebar/>
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
    name:"Search",
    components: { RightSidebar,Content,Filter },
}
</script>