<template>
    <div>
        <section id="main">
            <div class="container">
                <div class="row">
                    <ContentCategories/>
                    <RightSidebarCategories/>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import RightSidebarCategories from '../components/categories/RightSidebarCategories.vue';
import ContentCategories from '../components/categories/ContentCategories.vue';

export default {
    name:"Search",
    components: { RightSidebarCategories,ContentCategories},
}
</script>