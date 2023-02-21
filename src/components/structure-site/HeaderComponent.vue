<script>
export default {
  name: 'HeaderComponent'
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark navigation">
    <div style="color: white;" class="collapse navbar-collapse" id="navbarTogglerDemo03">
      <img style="height: 50px;" src="../../../public/Marvel_logo.jpg" alt="image">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item active">
          <a class="nav-link" href="#">Page d'accueil</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Héros</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#">Disabled</a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
  </nav>
  <!-- <div class="bloc">
    <ul>
      <li><router-link to="/">Accueil</router-link></li>
      <li><router-link to="/tp">TP</router-link></li>
      <li><router-link :to="{name: 'content_page', params:{id: 1, page:5}}">Contenu</router-link></li>
      <li><router-link :to="{name: 'content_page', params:{id: 2, page:6}}">Contenu 2</router-link></li>
    </ul>
  </div> -->
</template>

<style>
  /* .bloc{
    display: block;
  } */
  nav {
    position: fixed;
    top: 0;
  }
</style>
