<script>
export default {
  name: 'HeaderComponent'
}
</script>

<template>
  <div class="bloc">
    <ul>
      <li><router-link to="/">Accueil</router-link></li>
      <li><router-link to="/tp">TP</router-link></li>
      <li><router-link :to="{name: 'content_page', params:{id: 1, page:5}}">Contenu</router-link></li>
      <li><router-link :to="{name: 'content_page', params:{id: 2, page:6}}">Contenu 2</router-link></li>
    </ul>
  </div>
</template>

<style>
  .bloc{
    display: block;
  }
</style>