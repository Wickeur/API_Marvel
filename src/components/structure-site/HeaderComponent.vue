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
          <router-link class="nav-link" to="/">Accueil</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/heros">Héros</router-link>
        </li>
      </ul>
      <!-- <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form> -->
    </div>
  </nav>
</template>

<style>
  nav {
    position: fixed;
    top: 0;
  }
</style>
