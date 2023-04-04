<script>
export default {
  name: 'HeaderComponent'
}
</script>

<template>
  <div class="navigation">
    <img style="height: 50px;" src="/Marvel_logo.jpg" alt="logo">
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/Personnages">Characters</router-link>
      </li>
      <li>
        <router-link to="/comics">Comics</router-link>
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
