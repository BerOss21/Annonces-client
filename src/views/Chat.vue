<template>
    <div>      
        <section id="main">
            <div class="container">
                <div class="row">
                    <Conversation/>
                    <AnnoucementDetail/>
                </div>
            </div>
        </section>
    </div>   
</template>

<script>
import AnnoucementDetail from '../components/Chat/AnnoucementDetail.vue';
import Conversation from '../components/Chat/Conversation.vue';
export default {
    name:"Chat",
    components:{AnnoucementDetail,Conversation}
}
</script>