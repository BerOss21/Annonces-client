<template>
    <div class="col-md-8">
        <nav aria-label="breadcrumb mb-5">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link :to="{name:'Search'}">Annonces</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Convesation</li>
            </ol>
        </nav>
        <div>
            <div class="card">
                <div class="card-header">
                    <h3> Conversation</h3>        
                </div>
                <div class="card-body">
                    <div class="container col-10">
                        <div class="col-5 mb-3">
                            <h5 class="card-title">Special title</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        </div>
                        <div class="col-5 ml-auto mb-3">
                            <h5 class="card-title">Special title</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        </div>
                    </div>
                </div>
                <div class="card-footer text-muted">
                    <form action="">
                        <div class="form-group mb-3">
                            <textarea class="form-control" placeholder="Ecrire votre message ici"></textarea>
                            <input type="submit" class="btn btn-danger btn-block form-control p-1 mt-3" value="envoyer">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "Conversation",
    }
</script>