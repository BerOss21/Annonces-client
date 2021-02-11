<template>
    <!-- Footer -->
    <section id="footer" style="background-color:rgba(12,12,12,0.7)">
        <div class="container">
            <div class="row">           
              <div class="col-md-6 col-12">
                    <section>
                        <header>
                            <h2>Qui nous somme ?</h2>
                        </header>
                        <a href="#" class="image featured"><img :src="image" alt="image"  style="width:100%;height:300px"/></a>
                        <p>
                            Un site web spécialisé permettant aux particuliers et aux professionnels de publier ou consulter des petites annonces gratuitement.
                        </p>
                        <footer>
                            <ul class="actions">
                                <li><a href="#" class="button">Demmarer votre recherche</a></li>
                            </ul>
                        </footer>
                    </section>
                </div>
                <div class="col-md-6 col-12">
                    <section class="text-center">
                        <header>
                            <h2>Annonces.ma</h2>
                        </header>
                        <ul class="social">
                            <li><a class="icon brands fa-facebook-f" href="#"><span class="label">Facebook</span></a>
                            </li>
                            <li><a class="icon brands fa-twitter" href="#"><span class="label">Twitter</span></a></li>
                            <li><a class="icon brands fa-linkedin-in" href="#"><span class="label">LinkedIn</span></a>
                            </li>
                        </ul>
                        <ul class="contact">
                            <li class="p-0">
                                <p>
                                    Hay Kortoba<br />
                                    1234 rue 88 37189<br />
                                    Casablanca
                                </p>
                            </li>
                            <li class="p-0">
                                <p><a href="#">contact@annonces.ma</a></p>
                            </li>
                            <li class="p-0">
                                <p>0500000011</p>
                            </li>
                        </ul>
                    </section>
                </div>
                <div class="col-12">

                    <!-- Copyright -->
                    <div id="copyright">
                        <ul class="links">
                            <li>&copy; annonces.ma. All rights reserved.</li>
                            <li>by: <a href="http://html5up.net">BERROUANE</a></li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    </section>

</template>
<script>
    import image from "../assets/store.png";
    export default {
        name:"Footer",
        data: function () {
            return {
                image: image
            }
        }
    }
</script>