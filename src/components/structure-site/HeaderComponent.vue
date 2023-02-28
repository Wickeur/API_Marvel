<script>
export default {
  name: 'HeaderComponent'
}
</script>

<template>
  <!-- <nav class="navbar navbar-expand-lg navbar-dark navigation">
    <div style="color: white;" class="collapse navbar-collapse" id="navbarTogglerDemo03">
      <img style="height: 50px;" src="../../../public/Marvel_logo.jpg" alt="logo">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item active">
          <router-link class="nav-link" to="/">Accueil</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/heros">Héros</router-link>
        </li>
      </ul>
    </div>
  </nav> -->
  
  <div class="navigation">
    <img style="height: 50px;" src="../../../public/Marvel_logo.jpg" alt="logo">
    <ul>
      <li>
        <router-link to="/">Accueil</router-link>
      </li>
      <li>
        <router-link to="/heros">Héros</router-link>
      </li>
    </ul>
  </div>

</template>

<style>
  .navigation {
        position: fixed; 
        top: 0;
        left: 0;
        height: 100%;
        width: 200px; 
        background-color: black; 
        color: #fff; 
        padding: 20px;
      }

      /* style pour les liens de la navigation */
      .navigation li > * {
        display: block; /* définit les liens comme des blocs pour qu'ils prennent toute la largeur de la navigation */
        color: #fff;
        text-decoration: none;
        padding: 10px 0; /* ajoute un peu d'espace autour des liens */
      }
</style>
