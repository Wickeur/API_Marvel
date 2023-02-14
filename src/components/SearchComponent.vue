<template>

  <h1>Search Component</h1>
  <div>
    <h2 style="color:red">
      <slot name="title"></slot>
    </h2>
  </div>

  <input type="text" v-model="search">

  <button><slot>Clique moi</slot></button>

  <div>
    <slot name="footer"></slot>
  </div>






</template>

<script>
export default {
  name: "SearchComponent",
  data(){
    return {
      search: ""
    }
  },
  watch:{
    search(newSearch, oldSearch){
      console.log("Nouvelle : " + newSearch + " - Ancienne : " + oldSearch);
    }
  }
}
</script>

<style scoped>

</style>